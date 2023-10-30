import { Toast } from '@cogoport/components';
import { useSelector } from '@cogoport/store';
import { collectionGroup, where } from 'firebase/firestore';
import { useEffect, useRef } from 'react';

import { mountFloatingNotificationSnapShot } from './mountFloatingNotificationSnapShot';
import { mountTeamsNotifications } from './mountTeamsNotifications';

const useGetUnreadMails = ({ firestore = {}, agentId = '' }) => {
	const loggedInAgentId = useSelector(({ profile }) => profile?.user?.id);

	const unreadCountSnapshotListener = useRef({});

	useEffect(() => {
		if (!window?.Notification) {
			Toast.error('Browser does not support notifications.');
		} else {
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

			mountTeamsNotifications({
				unreadCountSnapshotListener,
				loggedInAgentId,
				firestore,
			});
		}

		const unSubMails = unreadCountSnapshotListener.current?.mailNotifications;
		const unSubTeams = unreadCountSnapshotListener.current?.teamsNotifications;

		return () => {
			unSubMails?.();
			unSubTeams?.();
		};
	}, [firestore, agentId, loggedInAgentId]);
};
export default useGetUnreadMails;
