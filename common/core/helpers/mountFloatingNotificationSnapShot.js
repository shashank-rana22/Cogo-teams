import {
	onSnapshot,
	query, where, orderBy,
} from 'firebase/firestore';

import sendNotification from './sendNotification';

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
	baseQuery = [],
	sessionQuery = [],
	queryFilters = [],
}) {
	const mailSnapshotRef = unreadCountSnapshotListener;

	try {
		const floatNotificationChatQuery = query(
			omniChannelCollection,
			where('has_admin_unread_messages', '==', true),
			where('show_floating_notification', '==', true),
			...(baseQuery || []),
			...(sessionQuery || []),
			...(queryFilters || []),
			orderBy('new_message_sent_at', 'desc'),
		);

		mailSnapshotRef.current.mailNotifications = onSnapshot(
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
		console.error('error', error);
	}
}
