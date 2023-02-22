import {
	collectionGroup,
	onSnapshot,
	updateDoc,
	doc,
} from 'firebase/firestore';
import { useState, useEffect } from 'react';

import { FIRESTORE_PATH } from '../configurations/firebase-config';
import getFireStoreQuery from '../helpers/getFireStoreQuery';

const useListChats = ({
	firestore, userId, isomniChannelAdmin,
}) => {
	const [activeCardId, setActiveCardId] = useState('');
	const [loading, setLoading] = useState(false);
	const [appliedFilters, setAppliedFilters] = useState({});

	const [listData, setListData] = useState({
		messagesList     : [],
		newMessagesCount : 0,
		unReadChatsCount : 0,

	});
	const activeMessageCard = (listData?.messagesList || []).find(({ id }) => id === activeCardId) || {};
	console.log('activeMessageCard:', activeMessageCard);

	const dataFormatter = (list) => {
		let chats = 0;
		let count = 0;
		const resultList = [];
		list?.forEach((item) => {
			const { created_at, updated_at, sent_updated_at, ...rest } = item.data() || {};
			const userData = {
				id              : item?.id,
				created_at      : item.data().created_at || Date.now(),
				updated_at      : item.data().updated_at || Date.now(),
				sent_updated_at : item.data().sent_updated_at || Date.now(),
				...rest,
			};

			chats += (item.data().new_message_count || 0) > 0 ? 1 : 0;
			count += item.data().new_message_count || 0;
			resultList.push(userData);
		});

		return {
			chats, count, resultList,
		};
	};

	useEffect(() => {
		setLoading(true);
		const omniChannelCollection = collectionGroup(firestore, 'rooms');
		const omniChannelQuery = getFireStoreQuery({
			omniChannelCollection,
			isomniChannelAdmin,
			userId,
			appliedFilters,
		});
		onSnapshot(omniChannelQuery, (querySnapshot) => {
			const { chats, count, resultList } = dataFormatter(querySnapshot);
			setListData({ messagesList: resultList, newMessagesCount: count, unReadChatsCount: chats });
		});
		setLoading(false);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [appliedFilters]);

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
		const roomCollection = doc(firestore, `${FIRESTORE_PATH[channel_type]}/${id}`);
		await updateDoc(roomCollection, {
			updated_at: Date.now(),
			...data,
		});
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

	};
};

export default useListChats;
