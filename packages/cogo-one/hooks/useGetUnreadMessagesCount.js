import {
	collectionGroup,
} from 'firebase/firestore';
import { useState, useEffect, useRef } from 'react';

import {
	mountUnreadCountSnapShot,
} from '../helpers/snapshotHelpers';
import { VIEW_TYPE_GLOBAL_MAPPING } from '../helpers/viewTypeMapping';

const useGetUnreadMessagesCount = ({ firestore, viewType, agentId, isBotSession }) => {
	const [unReadChatsCount, setUnReadChatsCount] = useState(false);

	const unreadCountSnapshotListener = useRef(null);

	useEffect(() => {
		mountUnreadCountSnapShot({
			unreadCountSnapshotListener,
			omniChannelCollection : collectionGroup(firestore, 'rooms'),
			baseQuery             : VIEW_TYPE_GLOBAL_MAPPING[viewType]?.all_chats_base_query?.({ agentId }) || [],
			sessionQuery          : VIEW_TYPE_GLOBAL_MAPPING[viewType]?.session_type_query?.({
				sessionType: isBotSession ? 'bot' : 'admin',
			}) || [],
			setUnReadChatsCount,
		});
	}, [firestore, viewType, agentId, isBotSession]);

	return {
		unReadChatsCount,
	};
};
export default useGetUnreadMessagesCount;
