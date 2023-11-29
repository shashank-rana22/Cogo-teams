import { Toast } from '@cogoport/components';
import { useSelector } from '@cogoport/store';
import { useEffect, useRef } from 'react';

import mountEmailNotifications from '../helpers/mountEmailNotifications';
import { mountTeamsNotifications } from '../helpers/mountTeamsNotifications';

const useGetUnreadMails = ({ firestore = {} }) => {
	const loggedInAgentId = useSelector(({ profile }) => profile?.user?.id);

	const unreadCountSnapshotListener = useRef({});

	useEffect(() => {
		if (window?.Notification) {
			Notification?.requestPermission()
				.then(
					(permissionStatus) => {
						if (permissionStatus === 'denied') {
							console.error('Notifications are blocked by the user.');
						} else if (permissionStatus === 'granted') {
							mountEmailNotifications({
								unreadCountSnapshotListener,
								firestore,
								loggedInAgentId,
							});

							mountTeamsNotifications({
								unreadCountSnapshotListener,
								loggedInAgentId,
								firestore,
							});
						} else {
							Toast.error('Notification permission not granted.');
						}
					},
				)
				.catch(() => {
					Toast.error('Browser does not support notifications.');
				});
		}

		const unSubMails = unreadCountSnapshotListener.current?.mailNotifications;
		const unSubTeams = unreadCountSnapshotListener.current?.teamsNotifications;

		return () => {
			unSubMails?.();
			unSubTeams?.();
		};
	}, [firestore, loggedInAgentId]);
};
export default useGetUnreadMails;
