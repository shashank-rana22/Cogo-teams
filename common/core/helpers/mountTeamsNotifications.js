import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import {
	onSnapshot,
	query, where, orderBy, limit, collection,
} from 'firebase/firestore';

import sendTeamsNotification from './sendTeamsNotification';

const PAGE_LIMIT = 1;

export function mountTeamsNotifications({
	unreadCountSnapshotListener = {},
	loggedInAgentId = '',
	firestore = {},
}) {
	const teamsSnapshotRef = unreadCountSnapshotListener;

	try {
		const teamsQuery = query(
			collection(firestore, `users/${loggedInAgentId}/groups`),
			where('self_has_unread_messages', '==', true),
			where('show_floating_notification', '==', true),
			orderBy('new_message_sent_at', 'asc'),
			limit(PAGE_LIMIT),
		);

		teamsSnapshotRef.current.teamsNotifications = onSnapshot(
			teamsQuery,
			(floatNotificationChatSnapshot) => {
				if (floatNotificationChatSnapshot?.empty) {
					return;
				}

				const notificationData = floatNotificationChatSnapshot?.docs?.[GLOBAL_CONSTANTS.zeroth_index];

				sendTeamsNotification(
					{
						notifyData : { id: notificationData?.id, ...(notificationData?.data() || {}) },
						docRef     : notificationData?.ref,
					},
				);
			},
		);
	} catch (error) {
		console.error('error', error);
	}
}
