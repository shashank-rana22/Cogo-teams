import {
	collectionGroup,
	onSnapshot,
	updateDoc, doc,
} from 'firebase/firestore';
import { useState, useEffect } from 'react';

import { FIRESTORE_PATH } from '../configurations/firebase-config';
import getFireStoreQuery from '../helpers/getFireStoreQuery';

const useListChats = ({
	firestore, userRoleIds, userId,
}) => {
	const [activeMessageCard, setActiveMessageCard] = useState({});
	const [loading, setLoading] = useState(false);
	const [appliedFilters, setAppliedFilters] = useState({});

	const [listData, setListData] = useState({
		messagesList     : [],
		newMessagesCount : 0,
		unReadChatsCount : 0,

	});

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
		const omniChannelQuery = getFireStoreQuery({ omniChannelCollection, userRoleIds, userId, appliedFilters });

		onSnapshot(omniChannelQuery, (querySnapshot) => {
			const { chats, count, resultList } = dataFormatter(querySnapshot);
			setListData({ messagesList: resultList, newMessagesCount: count, unReadChatsCount: chats });
		});
		setLoading(false);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [appliedFilters]);

	const setActiveMessage = async (val) => {
		const { channel_type, id } = val || {};
		setActiveMessageCard(val);
		if (channel_type && id) {
			const messageDoc = doc(
				firestore,
				`${FIRESTORE_PATH[channel_type]}/${id}`,
			);
			await updateDoc(messageDoc, { new_message_count: 0 });
		}
	};
	return {
		listData,
		setActiveMessage,
		activeMessageCard,
		setAppliedFilters,
		appliedFilters,
		loading,
	};
};

export default useListChats;
