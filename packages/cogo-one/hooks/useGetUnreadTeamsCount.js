import { useSelector } from '@cogoport/store';
import {
	collection,
	where,
	query,
	orderBy,
	limit,
	onSnapshot,
} from 'firebase/firestore';
import { useState, useEffect, useRef } from 'react';

const LIMIT = 100;
const FALLBACK_VALUE = 0;

const useGetUnreadTeamsCount = ({ firestore = {} }) => {
	const loggedInUserId = useSelector(({ profile }) => profile?.user?.id);

	const [unreadTeamsCount, setUnreadTeamsCount] = useState(FALLBACK_VALUE);

	const unreadCountSnapshotListener = useRef(null);

	useEffect(() => {
		try {
			const userCollectionPath = `users/${loggedInUserId}/groups`;
			const userCollection = collection(firestore, userCollectionPath);

			const collectionQuery = query(
				userCollection,
				where('self_has_unread_messages', '==', true),
				orderBy('self_has_unread_messages', 'desc'),
				limit(LIMIT),
			);

			unreadCountSnapshotListener.current = onSnapshot(
				collectionQuery,
				(countUnreadChatSnapshot) => {
					setUnreadTeamsCount(countUnreadChatSnapshot.size || FALLBACK_VALUE);
				},
			);
		} catch (e) {
			console.error(e);
		}
	}, [firestore, loggedInUserId]);

	return {
		unreadTeamsCount,
	};
};
export default useGetUnreadTeamsCount;
