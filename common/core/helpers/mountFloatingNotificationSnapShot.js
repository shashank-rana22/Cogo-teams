import {
	onSnapshot,
	query, where, orderBy,
} from 'firebase/firestore';

import sendNotification from './sendNotification';

export function snapshotCleaner({ ref }) {
	const tempRef = ref;
	if (tempRef.current) {
		tempRef.current();
		tempRef.current = null;
	}
}

function dataFormatter(list) {
	const resultList = list?.reduce((accumulator, item) => {
		const { created_at, updated_at, new_message_count, ...rest } = item.data() || {};
		const userData = {
			id         : item?.id,
			created_at : created_at || Date.now(),
			new_message_count,
			...rest,
		};

		return { ...accumulator, [item?.id]: userData };
	}, {});

	return {
		resultList,
	};
}

export function mountFloatingNotificationSnapShot({
	unreadCountSnapshotListener = {},
	omniChannelCollection = {},
	firestore = {},
	agentId = '',
}) {
	const mailSnapshotRef = unreadCountSnapshotListener;

	snapshotCleaner({ ref: unreadCountSnapshotListener });
	try {
		const floatNotificationChatQuery = query(
			omniChannelCollection,
			where('has_admin_unread_messages', '==', true),
			where('show_floating_notification', '==', true),
			[where('support_agent_id', '==', agentId)],
			[where('session_type', '==', 'admin')],
			[
				where('channel_type', 'in', ['email']),
				where('show_in_inbox', '==', true),
			],
			orderBy('new_message_sent_at', 'desc'),
		);

		mailSnapshotRef.current = onSnapshot(
			floatNotificationChatQuery,
			(floatNotificationChatSnapshot) => {
				const { resultList } = dataFormatter(floatNotificationChatSnapshot?.docs);

				sendNotification({
					resultList,
					firestore,
				});
			},
		);
	} catch (error) {
		console.log('error', error);
	}
}
