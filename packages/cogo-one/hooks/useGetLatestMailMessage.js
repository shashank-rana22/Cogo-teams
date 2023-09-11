import {
	collectionGroup,
	where,
} from 'firebase/firestore';
import { useState, useEffect, useRef } from 'react';

import { VIEW_TYPE_GLOBAL_MAPPING } from '../constants/viewTypeMapping';
import {
	mountLatestMialSnapShot,
} from '../helpers/snapshotHelpers';

const useGetUnreadMailsCount = ({ firestore, viewType, agentId, isBotSession }) => {
	const [newMessage, setNewMessage] = useState(false);

	const unreadNewMailMessage = useRef(null);

	useEffect(() => {
		const getBaseQuery = VIEW_TYPE_GLOBAL_MAPPING[viewType]?.all_chats_base_query;

		mountLatestMialSnapShot({
			unreadNewMailMessage,
			omniChannelCollection : collectionGroup(firestore, 'rooms'),
			baseQuery             : getBaseQuery?.({ agentId }) || [],
			sessionQuery          : [where('session_type', '==', 'admin')],
			queryFilters          : [where('channel_type', 'in', ['email'])],
			setNewMessage,
		});
	}, [firestore, viewType, agentId, isBotSession]);

	return newMessage;
};
export default useGetUnreadMailsCount;
