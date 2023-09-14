import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { collection, query, where, limit, getDocs, orderBy } from 'firebase/firestore';
import { useEffect, useState, useCallback } from 'react';

import { FIRESTORE_PATH } from '../configurations/firebase-config';

const PAGE_LIMIT = 10;
const MAX_DISTANCE_FROM_BOTTOM = 10;
const FIRST = 1;

function useGetAllMailsForUser({ firestore = {}, userId }) {
	const [mailData, setMailData] = useState({
		mailsListData        : [],
		lastMessageTimeStamp : Date.now(),
		isLastPage           : false,
		loading              : false,
	});
	const [appliedFilters, setAppliedFilters] = useState({});

	const { loading, mailsListData, isLastPage } = mailData;

	const getFilteredMails = useCallback(async ({ lastMessageTimeStamp, initialCall = false }) => {
		if (!userId) {
			return;
		}
		setMailData(
			(prev) => ({ ...prev, loading: true }),
		);

		try {
			const filteredMailsQuery = query(
				collection(firestore, FIRESTORE_PATH.email),
				where('user_id', '==', userId),
				...(appliedFilters?.shipment_serial_id
					? [where('shipment_serial_id', '==', Number(appliedFilters?.shipment_serial_id))] : []),
				where('new_message_sent_at', '<=', lastMessageTimeStamp),
				orderBy('new_message_sent_at', 'desc'),
				limit(PAGE_LIMIT),
			);

			const querySnapshot = await getDocs(filteredMailsQuery);

			const filteredMails = querySnapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
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
	}, [firestore, userId, appliedFilters]);

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
				lastMessageTimeStamp : Date.now(),
				isLastPage           : false,
				loading              : false,
			},
		);
		getFilteredMails({ lastMessageTimeStamp: Date.now(), initialCall: true });
	}, [getFilteredMails]);

	return {
		mailsListData,
		handleScroll,
		mailListLoading: loading,
		getFilteredMails,
		setMailData,
		setAppliedFilters,
		appliedFilters,
	};
}

export default useGetAllMailsForUser;
