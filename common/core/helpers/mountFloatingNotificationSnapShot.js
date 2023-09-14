import {
	onSnapshot,
	query, where, orderBy,
} from 'firebase/firestore';

import getNotification from './getNotification';

export function snapshotCleaner({ ref }) {
	const tempRef = ref;
	if (tempRef.current) {
		tempRef.current();
		tempRef.current = null;
	}
}

function dataFormatter(list) {
	let resultList = {};
	list?.forEach((item) => {
		const { created_at, updated_at, new_message_count, ...rest } = item.data() || {};
		const userData = {
			id         : item?.id,
			created_at : item.data().created_at || Date.now(),
			new_message_count,
			...rest,
		};

		resultList = { ...resultList, [item?.id]: userData };
	});

	return {
		resultList,
	};
}

export function mountFloatingNotificationSnapShot({
	unreadCountSnapshotListener = {},
	omniChannelCollection = {},
	baseQuery = [],
	sessionQuery = [],
	queryFilters = [],
	firestore,
}) {
	const mailSnapshotRef = unreadCountSnapshotListener;

	snapshotCleaner({ ref: unreadCountSnapshotListener });
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

		mailSnapshotRef.current = onSnapshot(
			floatNotificationChatQuery,
			(floatNotificationChatSnapshot) => {
				const { resultList } = dataFormatter(floatNotificationChatSnapshot?.docs);

				getNotification({
					resultList,
					firestore,
				});
			},
		);
	} catch (error) {
		console.log('error', error);
	}
}
