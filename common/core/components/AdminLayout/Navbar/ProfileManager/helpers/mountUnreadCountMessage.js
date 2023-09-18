import { onSnapshot, query, where, orderBy } from 'firebase/firestore';

const FALLBACK_VALUE = 0;

const snapshotCleaner = ({ ref = {} }) => {
	const tempRef = ref;
	if (tempRef.current) {
		tempRef.current();
		tempRef.current = null;
	}
};

export function mountUnreadCountSnapShot({
	unreadCountSnapshotListener = {},
	omniChannelCollection = {},
	setUnReadChatsCount = () => {},
}) {
	const snapshotRef = unreadCountSnapshotListener;

	snapshotCleaner({ ref: unreadCountSnapshotListener });

	const countUnreadChatQuery = query(
		omniChannelCollection,
		where('is_seen', '==', false),
		orderBy('created_at', 'desc'),
	);

	snapshotRef.current = onSnapshot(
		countUnreadChatQuery,
		(countUnreadChatSnapshot) => {
			setUnReadChatsCount(countUnreadChatSnapshot?.size || FALLBACK_VALUE);
		},
	);
}
