// import {
// 	collectionGroup,
// 	onSnapshot,
// 	updateDoc, doc,
// } from 'firebase/firestore';
// import { useState, useEffect } from 'react';

// import { FIRESTORE_PATH } from '../configurations/firebase-config';
// import getFireStoreQuery from '../helpers/getFireStoreQuery';

// const useListChats = ({
// 	firestore, userRoleIds, userId,
// }) => {
// 	const [activeMessageCard, setActiveMessageCard] = useState({});
// 	const [loading, setLoading] = useState(false);
// 	const [appliedFilters, setAppliedFilters] = useState({});

// 	const [listData, setListData] = useState({
// 		messagesList     : [],
// 		newMessagesCount : 0,
// 		unReadChatsCount : 0,

// 	});

// 	const dataFormatter = (list) => {
// 		let chats = 0;
// 		let count = 0;
// 		const resultList = [];
// 		list?.forEach((item) => {
// 			const { created_at, updated_at, sent_updated_at, ...rest } = item.data() || {};
// 			const userData = {
// 				id              : item?.id,
// 				created_at      : item.data().created_at || Date.now(),
// 				updated_at      : item.data().updated_at || Date.now(),
// 				sent_updated_at : item.data().sent_updated_at || Date.now(),
// 				...rest,
// 			};

// 			chats += (item.data().new_message_count || 0) > 0 ? 1 : 0;
// 			count += item.data().new_message_count || 0;
// 			resultList.push(userData);
// 		});

// 		return {
// 			chats, count, resultList,
// 		};
// 	};

// 	useEffect(() => {
// 		setLoading(true);
// 		const omniChannelCollection = collectionGroup(firestore, 'rooms');
// 		const omniChannelQuery = getFireStoreQuery({ omniChannelCollection, userRoleIds, userId, appliedFilters });
// 		onSnapshot(omniChannelQuery, (querySnapshot) => {
// 			const { chats, count, resultList } = dataFormatter(querySnapshot);
// 			setListData({ messagesList: resultList, newMessagesCount: count, unReadChatsCount: chats });
// 		});
// 		setLoading(false);
// 	// eslint-disable-next-line react-hooks/exhaustive-deps
// 	}, [appliedFilters]);

// 	const setActiveMessage = async (val) => {
// 		const { channel_type, id } = val || {};
// 		setActiveMessageCard(val);
// 		if (channel_type && id) {
// 			const messageDoc = doc(
// 				firestore,
// 				`${FIRESTORE_PATH[channel_type]}/${id}`,
// 			);
// 			await updateDoc(messageDoc, { new_message_count: 0 });
// 		}
// 	};

// 	return {
// 		listData,
// 		setActiveMessage,
// 		activeMessageCard,
// 		setAppliedFilters,
// 		appliedFilters,
// 		loading,
// 	};
// };

// export default useListChats;

import {
	collectionGroup,
	query,
	onSnapshot,
	orderBy,
	where,
	updateDoc,
	doc,
} from 'firebase/firestore';
import { useState, useEffect } from 'react';

import { FIRESTORE_PATH } from '../configurations/firebase-config';
import global from '../constants/IDS_CONSTANTS';

const useListChats = ({ firestore, userRoleIds:user_role_ids, userId }) => {
	const [activeMessageCard, setActiveMessageCard] = useState({});
	const [loading, setLoading] = useState(false);

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
			chats,
			count,
			resultList,
		};
	};

	useEffect(() => {
		setLoading(true);
		const omniChannelCollection = collectionGroup(firestore, 'rooms');
		let omniChannelQuery;
		if (
			user_role_ids.includes(global.TECH_SUPERADMIN_ID)
			|| user_role_ids.includes(global.ADMIN_ID)
			|| user_role_ids.includes(global.SUPERADMIN_ID)
			|| user_role_ids.includes(global.TRADE_EXPERT_TEAM_LEAD_LONG_TAIL_ID)
		) {
			omniChannelQuery = query(
				omniChannelCollection,
				// orderBy('session_type', 'desc'),
				orderBy('updated_at', 'desc'),
				// where('session_type', '==', 'admin'),
			);
		} else {
			omniChannelQuery = query(
				omniChannelCollection,
				// orderBy('session_type', 'desc'),
				orderBy('updated_at', 'desc'),
				where('agent_id', '==', userId),
				// where('session_type', '==', 'admin'),
			);
		}

		onSnapshot(omniChannelQuery, (querySnapshot) => {
			const { chats, count, resultList } = dataFormatter(querySnapshot);
			setListData({
				messagesList     : resultList,
				newMessagesCount : count,
				unReadChatsCount : chats,
			});
		});
		setLoading(false);
	}, []);

	const setActiveMessage = async (val) => {
		const { channel_type, id } = val || {};
		setActiveMessageCard(val);
		if (channel_type) {
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
		loading,
	};
};

export default useListChats;
