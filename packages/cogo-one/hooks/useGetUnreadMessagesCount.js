import {
	collectionGroup,
	where,
} from 'firebase/firestore';
import { useState, useEffect, useRef } from 'react';

import { VIEW_TYPE_GLOBAL_MAPPING } from '../constants/viewTypeMapping';
import {
	mountUnreadCountSnapShot,
} from '../helpers/snapshotHelpers';

const useGetUnreadMessagesCount = ({ firestore, viewType, agentId, isBotSession }) => {
	const [unReadChatsCount, setUnReadChatsCount] = useState(false);

	const unreadCountSnapshotListener = useRef(null);

	useEffect(() => {
		const getBaseQuery = VIEW_TYPE_GLOBAL_MAPPING[viewType]?.all_chats_base_query;
		const getSessionQuery = VIEW_TYPE_GLOBAL_MAPPING[viewType]?.session_type_query;

		mountUnreadCountSnapShot({
			unreadCountSnapshotListener,
			omniChannelCollection : collectionGroup(firestore, 'rooms'),
			baseQuery             : getBaseQuery?.({ agentId }) || [],
			sessionQuery          : getSessionQuery?.({
				sessionType: isBotSession ? 'bot' : 'admin',
			}) || [],
			queryFilters: [where(
				'channel_type',
				'in',
				['platform_chat', 'telegram', 'whatsapp', 'zalo'],
			)],
			setUnReadChatsCount,
		});
	}, [firestore, viewType, agentId, isBotSession]);

	return {
		unReadChatsCount,
	};
};
export default useGetUnreadMessagesCount;
