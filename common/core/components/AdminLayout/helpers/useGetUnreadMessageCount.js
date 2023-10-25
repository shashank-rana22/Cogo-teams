import { collection, onSnapshot, query, where, orderBy } from 'firebase/firestore';
import { useState, useEffect, useRef } from 'react';

const MIN_COUNT = 0;

const useGetUnreadMessagesCount = ({ firestore = {}, userId = '' }) => {
	const unreadCountSnapshotListener = useRef(null);

	const [unReadChatsCount, setUnReadChatsCount] = useState(MIN_COUNT);

	useEffect(() => {
		try {
			const userDetailsDocRef = collection(
				firestore,
				`/users/${userId}/platform_notifications`,
			);

			const countUnreadChatQuery = query(
				userDetailsDocRef,
				where('is_seen', '==', false),
				orderBy('created_at', 'desc'),
			);

			unreadCountSnapshotListener.current = onSnapshot(
				countUnreadChatQuery,
				(countUnreadChatSnapshot) => {
					setUnReadChatsCount(countUnreadChatSnapshot?.size || 0);
				},
			);
		} catch (e) {
			console.error('e:', e);
		}

		const clearfun = unreadCountSnapshotListener?.current;

		return () => {
			clearfun?.();
		};
	}, [firestore, userId]);

	return {
		unReadChatsCount,
	};
};

export default useGetUnreadMessagesCount;
