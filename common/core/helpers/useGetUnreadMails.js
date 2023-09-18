import { collectionGroup } from 'firebase/firestore';
import { useEffect, useRef } from 'react';

import { mountFloatingNotificationSnapShot } from './mountFloatingNotificationSnapShot';

const useGetUnreadMails = ({ firestore = {}, agentId = '' }) => {
	const unreadCountSnapshotListener = useRef(null);

	useEffect(() => {
		const cleanupfunc = unreadCountSnapshotListener.current;

		mountFloatingNotificationSnapShot({
			unreadCountSnapshotListener,
			omniChannelCollection: collectionGroup(firestore, 'rooms'),
			firestore,
			agentId,
		});
		return () => { cleanupfunc?.(); };
	}, [firestore, agentId]);

	return null;
};
export default useGetUnreadMails;
