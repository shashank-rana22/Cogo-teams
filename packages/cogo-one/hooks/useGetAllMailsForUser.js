import { Toast } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import {
	collection, query, where, limit, getDocs, orderBy, doc, updateDoc,
} from 'firebase/firestore';
import { useEffect, useState, useCallback } from 'react';

import { FIRESTORE_PATH } from '../configurations/firebase-config';
import { SEARCH_QUERY_LIMIT } from '../constants/mailConstants';

const PAGE_LIMIT = 10;
const MAX_DISTANCE_FROM_BOTTOM = 10;
const FIRST = 1;

function useGetAllMailsForUser({ firestore = {}, userId = '', searchValue = '', setActiveMail = () => {} }) {
	const [mailData, setMailData] = useState({
		mailsListData        : [],
		lastMessageTimeStamp : Date.now(),
		isLastPage           : false,
		loading              : false,
	});
	const [appliedFilters, setAppliedFilters] = useState({});

	const updatedPageLimit = searchValue ? SEARCH_QUERY_LIMIT : PAGE_LIMIT;

	const { query: searchQuery, debounceQuery } = useDebounceQuery();

	const { loading, mailsListData, isLastPage } = mailData;

	const setActiveMessage = useCallback((val) => {
		const { channel_type, id } = val || {};
		if (channel_type && id) {
			try {
				const messageDoc = doc(
					firestore,
					`${FIRESTORE_PATH[channel_type]}/${id}`,
				);
				updateDoc(messageDoc, { new_message_count: 0, has_admin_unread_messages: false });
				setActiveMail({ val, tab: 'firebase_emails', expandSideBar: false });
			} catch (e) {
				Toast.error('Chat Not Found');
			}
		}
	}, [firestore, setActiveMail]);

	useEffect(() => {
		debounceQuery(searchValue?.trim()?.toUpperCase());
	}, [debounceQuery, searchValue]);

	const getFilteredMails = useCallback(async ({ lastMessageTimeStamp = null, initialCall = false }) => {
		if (!userId) {
			return;
		}

		setMailData(
			(prev) => ({ ...prev, loading: true }),
		);

		try {
			const serialId = (appliedFilters?.shipment_serial_id
				? [where('shipment_serial_id', '==', Number(appliedFilters?.shipment_serial_id))] : []);

			const nameSearch = searchQuery ? [
				where('q', '>=', searchQuery),
				where('q', '<=', `${searchQuery}\\uf8ff`),
				orderBy('q', 'asc'),
			] : [];

			const filteredMailsQuery = query(
				collection(firestore, FIRESTORE_PATH.email),
				where('user_id', '==', userId),
				...(serialId),
				...(nameSearch),
				...(lastMessageTimeStamp ? [where('new_message_sent_at', '<=', lastMessageTimeStamp)] : []),
				orderBy('new_message_sent_at', 'desc'),
				limit(updatedPageLimit),
			);

			const querySnapshot = await getDocs(filteredMailsQuery);

			const filteredMails = querySnapshot.docs.map((docs) => ({
				id: docs.id,
				...docs.data(),
			}));

			const newTimeStamp = filteredMails[
				(filteredMails.length || GLOBAL_CONSTANTS.zeroth_index) - FIRST
			]?.new_message_sent_at;

			const isLast = filteredMails?.length < PAGE_LIMIT;

			setMailData((prev) => ({
				...prev,
				mailsListData: initialCall ? [...filteredMails]
					: [...(prev?.mailsListData || []), ...filteredMails],
				isLastPage           : isLast,
				lastMessageTimeStamp : newTimeStamp,
				loading              : false,
			}));
		} catch (error) {
			console.error('Error fetching filtered mails:', error);
			setMailData(
				(prev) => ({ ...prev, loading: false }),
			);
		}
	}, [userId, appliedFilters?.shipment_serial_id, searchQuery, firestore, updatedPageLimit]);

	const handleScroll = useCallback((e) => {
		const reachBottom = e.target.scrollHeight - (e.target.clientHeight + e.target.scrollTop)
          <= MAX_DISTANCE_FROM_BOTTOM;
		if (reachBottom && !isLastPage && !loading) {
			getFilteredMails({ lastMessageTimeStamp: mailData?.lastMessageTimeStamp });
		}
	}, [getFilteredMails, isLastPage, loading, mailData?.lastMessageTimeStamp]);

	useEffect(() => {
		setMailData(
			{
				mailsListData        : [],
				lastMessageTimeStamp : null,
				isLastPage           : false,
				loading              : false,
			},
		);
		getFilteredMails({ lastMessageTimeStamp: null, initialCall: true });
	}, [getFilteredMails]);

	return {
		mailsListData,
		handleScroll,
		mailListLoading: loading,
		getFilteredMails,
		setMailData,
		setAppliedFilters,
		appliedFilters,
		setActiveMessage,
	};
}

export default useGetAllMailsForUser;
