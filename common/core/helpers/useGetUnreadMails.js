import { collectionGroup, where } from 'firebase/firestore';
import { useEffect, useRef } from 'react';

import { mountFloatingNotificationSnapShot } from './mountFloatingNotificationSnapShot';

const useGetUnreadMails = ({ firestore = {}, agentId = '' }) => {
	const unreadCountSnapshotListener = useRef(null);

	useEffect(() => {
		const cleanupfunc = unreadCountSnapshotListener.current;

		mountFloatingNotificationSnapShot({
			unreadCountSnapshotListener,
			omniChannelCollection : collectionGroup(firestore, 'rooms'),
			baseQuery             : [where('support_agent_id', '==', agentId)],
			sessionQuery          : [where('session_type', '==', 'admin')],
			queryFilters          : [
				where('channel_type', 'in', ['email']),
				where('show_in_inbox', '==', true),
			],
			firestore,
		});
		return () => { cleanupfunc?.(); };
	}, [firestore, agentId]);

	return null;
};
export default useGetUnreadMails;
