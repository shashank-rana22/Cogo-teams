import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import {
	onSnapshot,
	query, where, orderBy,
	collectionGroup,
	limit,
} from 'firebase/firestore';

import sendMailNotification from './sendMailNotification';

const PAGE_LIMIT = 1;

function mountEmailNotifications({
	unreadCountSnapshotListener = {},
	firestore = {},
	loggedInAgentId = '',
}) {
	const mailSnapshotRef = unreadCountSnapshotListener;

	try {
		const floatNotificationChatQuery = query(
			collectionGroup(firestore, 'rooms'),
			where('has_admin_unread_messages', '==', true),
			where('show_floating_notification', '==', true),
			where('support_agent_id', '==', loggedInAgentId),
			where('session_type', '==', 'admin'),
			where('channel_type', '==', 'email'),
			where('show_in_inbox', '==', true),
			orderBy('new_message_sent_at', 'asc'),
			limit(PAGE_LIMIT),
		);

		mailSnapshotRef.current.mailNotifications = onSnapshot(
			floatNotificationChatQuery,
			(floatNotificationChatSnapshot) => {
				if (floatNotificationChatSnapshot?.empty) {
					return;
				}

				const notificationData = floatNotificationChatSnapshot?.docs?.[GLOBAL_CONSTANTS.zeroth_index];

				sendMailNotification(
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

export default mountEmailNotifications;
