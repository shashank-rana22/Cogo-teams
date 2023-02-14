import {
	collection,
	query,
	onSnapshot,
	orderBy,
	where,
} from 'firebase/firestore';
import { useState, useEffect } from 'react';

import {
	firestoreWhatsappPath,
	firestoreChatbotPath,
} from '../configurations/firebase-config';

const useListChats = ({
	firestore,
	userId,
	user_role_ids,
}) => {
	const [botUserList, setBotUserList] = useState([]);
	const [newBotMessageCount, setNewBotMessageCount] = useState(0);
	const [whatsappuserList, setWhatsappUserList] = useState([]);
	const [newWhatsappMessageCount, setNewWhatsappMessageCount] = useState(0);
	const [unReadBotChats, setUnReadBotChats] = useState(0);
	const [unReadWhatsappChats, setUnReadWhatsappChats] = useState(0);
	const [dataState, setDataState] = useState({
		messagesList     : [],
		newMessagesCount : 0,
		unReadChats      : 0,

	});

	useEffect(() => {
		const channelForChatBot = collection(firestore, firestoreChatbotPath);

		let roomsQuery;
		if (
			user_role_ids.includes(global.TECH_SUPERADMIN_ID)
			|| user_role_ids.includes(global.ADMIN_ID)
			|| user_role_ids.includes(global.SUPERADMIN_ID)
			|| user_role_ids.includes(global.TRADE_EXPERT_TEAM_LEAD_LONG_TAIL_ID)
		) {
			roomsQuery = query(channelForChatBot, orderBy('updated_at', 'desc'));
		} else {
			roomsQuery = query(
				channelForChatBot,
				orderBy('updated_at', 'desc'),
			);
		}

		onSnapshot(roomsQuery, (querySnapshot) => {
			const result = [];
			let count = 0;
			let chats = 0;
			querySnapshot.forEach((docp) => {
				const user_data = {
					id                : docp.id,
					name              : docp.data().user_name,
					user_type         : docp.data().user_type,
					room_id           : docp.data().user_id,
					created_at        : docp.data().created_at || Date.now(),
					updated_at        : docp.data().updated_at || Date.now(),
					user_id           : docp.data().user_id || '',
					new_message_count : docp.data().new_message_count || 0,
					last_message      : docp.data().last_message || '',
					channel_type      : docp.data().channel_type || '',
					organization_id   : docp.data().organization_id || '',
					sent_updated_at   : docp.data().sent_updated_at || Date.now(),
					agent_name        : docp.data().agent_name,
					agent_id          : docp.data().agent_id,
				};
				chats += (docp.data().new_message_count || 0) > 0 ? 1 : 0;
				count += docp.data().new_message_count || 0;
				result.push(user_data);
			});
			setUnReadBotChats(chats);
			setNewBotMessageCount(count);
			setBotUserList(result);
		});
	}, []);

	useEffect(() => {
		const channelForWhatsapp = collection(firestore, firestoreWhatsappPath);

		const roomsQuery = query(channelForWhatsapp, orderBy('updated_at', 'desc'));

		onSnapshot(roomsQuery, (querySnapshot) => {
			const result = [];
			let count = 0;
			let chats = 0;
			querySnapshot.forEach((docp) => {
				const user_data = {
					id                : docp.id,
					name              : docp.data().user_name || 'No Name',
					room_id           : docp.data().user_id,
					created_at        : docp.data().created_at || Date.now(),
					updated_at        : docp.data().updated_at || Date.now(),
					user_id           : docp.data().user_id || '',
					new_message_count : docp.data().new_message_count || 0,
					last_message      : docp.data().last_message || '',
					channel_type      : docp.data().channel_type || '',
					sent_updated_at   : docp.data().sent_updated_at || Date.now(),
				};
				chats += (docp.data().new_message_count || 0) > 0 ? 1 : 0;
				count += docp.data().new_message_count || 0;
				result.push(user_data);
			});
			setUnReadWhatsappChats(chats);
			setNewWhatsappMessageCount(count);
			setWhatsappUserList(result);
		});
	}, []);

	return {
		userList        : { chatbot: botUserList, whatsapp: whatsappuserList },
		newMessageCount : {
			chatbot  : newBotMessageCount,
			whatsapp : newWhatsappMessageCount,
		},
		unReadChats: { chatbot: unReadBotChats, whatsapp: unReadWhatsappChats },
	};
};

export default useListChats;
