import { collection } from 'firebase/firestore';
import { useState, useEffect, useRef } from 'react';

import { mountUnreadCountSnapShot } from './mountUnreadCountMessage';

const MIN_COUNT = 0;

const useGetUnreadMessagesCount = ({ firestore = {}, userId = '' }) => {
	const unreadCountSnapshotListener = useRef(null);

	const [unReadChatsCount, setUnReadChatsCount] = useState(MIN_COUNT);

	useEffect(() => {
		const userDetailsDocRef = collection(
			firestore,
			`/users/${userId}/platform_notifications`,
		);
		mountUnreadCountSnapShot({
			unreadCountSnapshotListener,
			omniChannelCollection: userDetailsDocRef,
			setUnReadChatsCount,
		});
	}, [firestore, userId]);

	return {
		unReadChatsCount,
	};
};

export default useGetUnreadMessagesCount;
