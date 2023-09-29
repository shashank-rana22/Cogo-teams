import {
	collectionGroup,
	where,
} from 'firebase/firestore';
import { useState, useEffect, useRef } from 'react';

import { VIEW_TYPE_GLOBAL_MAPPING } from '../constants/viewTypeMapping';
import {
	mountUnreadCountSnapShot,
} from '../helpers/snapshotHelpers';

const useGetUnreadMailsCount = ({ firestore, viewType, agentId, isBotSession, userSharedMails = [] }) => {
	const [unReadMailsCount, setUnReadMailsCount] = useState(false);

	const unreadCountSnapshotListener = useRef(null);

	useEffect(() => {
		const getBaseQuery = VIEW_TYPE_GLOBAL_MAPPING[viewType]?.all_chats_base_query;
		const getSessionQuery = VIEW_TYPE_GLOBAL_MAPPING[viewType]?.session_type_query;

		mountUnreadCountSnapShot({
			unreadCountSnapshotListener,
			omniChannelCollection : collectionGroup(firestore, 'rooms'),
			baseQuery             : getBaseQuery?.({ agentId, userSharedMails }) || [],
			sessionQuery          : getSessionQuery?.({
				sessionType: isBotSession ? 'bot' : 'admin',
			}) || [],
			queryFilters        : [where('channel_type', 'in', ['email'])],
			setUnReadChatsCount : setUnReadMailsCount,
		});
	}, [firestore, viewType, agentId, isBotSession, userSharedMails]);

	return {
		unReadMailsCount,
	};
};
export default useGetUnreadMailsCount;
