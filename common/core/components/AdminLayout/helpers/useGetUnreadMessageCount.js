import { throttle } from '@cogoport/utils';
import { collection, onSnapshot, query, where, orderBy, limit, getCountFromServer } from 'firebase/firestore';
import { useState, useEffect, useRef } from 'react';

const MIN_COUNT = 0;
const PAGE_LIMIT = 1;
const UNREAD_COUNT_PAGE_LIMIT = 100;

const useGetUnreadMessagesCount = ({ firestore = {}, userId = '' }) => {
	const unreadCountSnapshotListener = useRef(null);

	const [unReadChatsCount, setUnReadChatsCount] = useState(MIN_COUNT);

	useEffect(() => {
		try {
			const userDetailsDocRef = collection(
				firestore,
				`/users/${userId}/platform_notifications`,
			);

			const commonQuery = [
				userDetailsDocRef,
				where('is_seen', '==', false),
				orderBy('created_at', 'desc'),
			];

			const snapshotQuery = query(...commonQuery, limit(PAGE_LIMIT));
			const aggregateQuery = query(...commonQuery, limit(UNREAD_COUNT_PAGE_LIMIT));

			const throttledGetCount = throttle(async () => {
				const unreadChats = await getCountFromServer(aggregateQuery);
				const unreadCount = unreadChats?.data()?.count || 0;

				setUnReadChatsCount(unreadCount);
			}, 600);

			unreadCountSnapshotListener.current = onSnapshot(snapshotQuery, throttledGetCount);
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
