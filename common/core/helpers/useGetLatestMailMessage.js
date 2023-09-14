import {
	collectionGroup,
	where,
} from 'firebase/firestore';
import { useEffect, useRef } from 'react';

import { mountFloatingNotificationSnapShot } from './mountFloatingNotificationSnapShot';

const useGetUnreadMails = ({ firestore, agentId }) => {
	// const [newMessages, setNewMessages] = useState({});
	// console.log('newMessages23332:', newMessages, Object.keys(newMessages).length);

	const unreadCountSnapshotListener = useRef(null);

	useEffect(() => {
		mountFloatingNotificationSnapShot({
			unreadCountSnapshotListener,
			omniChannelCollection : collectionGroup(firestore, 'rooms'),
			baseQuery             : [where('support_agent_id', '==', agentId)],
			sessionQuery          : [where('session_type', '==', 'admin')],
			queryFilters          : [
				where('channel_type', 'in', ['email']),
				where('show_in_inbox', '==', true),
			],
			// setNewMessages,
			firestore,
		});
	}, [firestore, agentId]);
};
export default useGetUnreadMails;
