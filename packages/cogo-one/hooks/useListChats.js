import {
	collectionGroup,
	query,
	onSnapshot,
	orderBy,
	// where,
} from 'firebase/firestore';
import { useState, useEffect } from 'react';

import global from '../constants/IDS_CONSTANTS';

const useListChats = ({
	firestore,
	user_role_ids,
}) => {
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
			const userData = {
				id                : item.id,
				name              : item.data().user_name,
				user_type         : item.data().user_type,
				created_at        : item.data().created_at || Date.now(),
				updated_at        : item.data().updated_at || Date.now(),
				user_id           : item.data().user_id || '',
				new_message_count : item.data().new_message_count || 0,
				last_message      : item.data().last_message || '',
				channel_type      : item.data().channel_type || '',
				organization_id   : item.data().organization_id || '',
				sent_updated_at   : item.data().sent_updated_at || Date.now(),
				agent_name        : item.data().agent_name,
				agent_id          : item.data().agent_id,
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
		const omniChannelCollection = collectionGroup(firestore, 'rooms');
		let omniChannelQuery;
		if (
			user_role_ids.includes(global.TECH_SUPERADMIN_ID)
			|| user_role_ids.includes(global.ADMIN_ID)
			|| user_role_ids.includes(global.SUPERADMIN_ID)
			|| user_role_ids.includes(global.TRADE_EXPERT_TEAM_LEAD_LONG_TAIL_ID)
		) {
			omniChannelQuery = query(omniChannelCollection, orderBy('updated_at', 'desc'));
		} else {
			omniChannelQuery = query(
				omniChannelCollection,
				orderBy('updated_at', 'desc'),
			);
		}

		onSnapshot(omniChannelQuery, (querySnapshot) => {
			const { chats, count, resultList } = dataFormatter(querySnapshot);
			setListData({ messagesList: resultList, newMessagesCount: count, unReadChatsCount: chats });
		});
	}, []);

	return {
		listData,
	};
};

export default useListChats;
