import { useRouter } from '@cogoport/next';
import {
	collectionGroup,
	onSnapshot,
	updateDoc,
	doc,
} from 'firebase/firestore';
import { useState, useEffect, useMemo, useRef } from 'react';

import { FIRESTORE_PATH } from '../configurations/firebase-config';
import getFireStoreQuery from '../helpers/getFireStoreQuery';

const useListChats = ({ firestore, userId, isomniChannelAdmin, showBotMessages = false }) => {
	const {
		query: { assigned_chat = '' },
	} = useRouter();
	const snapshotListener = useRef(null);

	const [firstLoading, setFirstLoading] = useState(true);
	const [activeCardId, setActiveCardId] = useState('');

	const [loading, setLoading] = useState(false);
	const [appliedFilters, setAppliedFilters] = useState({});

	useEffect(() => {
		if (assigned_chat) {
			setActiveCardId(assigned_chat);
		}
		setFirstLoading(false);
	}, [assigned_chat]);

	const [listData, setListData] = useState({
		messagesList     : [],
		newMessagesCount : 0,
		unReadChatsCount : 0,
	});

	const activeMessageCard = (listData?.messagesList || []).find(({ id }) => id === activeCardId)
        || {};

	const dataFormatter = (list) => {
		let chats = 0;
		let count = 0;
		const resultList = [];
		list?.forEach((item) => {
			const { created_at, updated_at, sent_updated_at, ...rest } = item.data() || {};
			const userData = {
				id         : item?.id,
				created_at : item.data().created_at || Date.now(),
				...rest,
			};

			chats += (item.data().new_message_count || 0) > 0 ? 1 : 0;
			count += item.data().new_message_count || 0;
			resultList.push(userData);
		});

		return {
			chats,
			count,
			resultList,
		};
	};
	const omniChannelQuery = useMemo(() => {
		const omniChannelCollection = collectionGroup(firestore, 'rooms');
		return getFireStoreQuery({
			omniChannelCollection,
			isomniChannelAdmin,
			userId,
			appliedFilters,
			showBotMessages,
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(appliedFilters), showBotMessages]);

	const snapshotCleaner = () => {
		if (snapshotListener.current) {
			snapshotListener.current();
			snapshotListener.current = null;
		}
	};
	useEffect(() => {
		setLoading(true);
		snapshotCleaner();
		snapshotListener.current = onSnapshot(omniChannelQuery, (querySnapshot) => {
			const { chats, count, resultList } = dataFormatter(querySnapshot);
			setListData({
				messagesList     : resultList,
				newMessagesCount : count,
				unReadChatsCount : chats,
			});
		});

		setLoading(false);
		return () => {
			snapshotCleaner();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [appliedFilters, showBotMessages]);

	const setActiveMessage = async (val) => {
		const { channel_type, id } = val || {};
		setActiveCardId(id);
		if (channel_type && id) {
			const messageDoc = doc(
				firestore,
				`${FIRESTORE_PATH[channel_type]}/${id}`,
			);
			await updateDoc(messageDoc, { new_message_count: 0 });
		}
	};

	const updateLeaduser = async (data = {}) => {
		const { channel_type, id } = activeMessageCard || {};
		const roomCollection = doc(
			firestore,
			`${FIRESTORE_PATH[channel_type]}/${id}`,
		);

		try {
			await updateDoc(roomCollection, {
				updated_at: Date.now(),
				...data,
			});
		} catch (error) {
			// console.log(error);
		}
	};

	return {
		listData,
		setActiveMessage,
		activeMessageCard,
		setAppliedFilters,
		appliedFilters,
		loading,
		activeCardId,
		setActiveCardId,
		updateLeaduser,
		firstLoading,
	};
};

export default useListChats;
