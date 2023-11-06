import {
	onSnapshot,
} from 'firebase/firestore';
import { useState, useEffect, useRef, useMemo } from 'react';

import getCountHelper from '../helpers/getCountHelpers';

const useGetUnreadMailsCount = ({ firestore, viewType, agentId, isBotSession, userSharedMails = [] }) => {
	const [unReadMailsCount, setUnReadMailsCount] = useState(false);

	const unreadCountSnapshotListener = useRef(null);

	const { throttledGetCount, snapshotQuery } = useMemo(
		() => getCountHelper(
			{
				viewType,
				firestore,
				userSharedMails,
				agentId,
				isBotSession,
				setUnReadMailsCount,
			},
		),
		[agentId, firestore, isBotSession, userSharedMails, viewType],
	);

	useEffect(() => {
		unreadCountSnapshotListener.current = onSnapshot(snapshotQuery, throttledGetCount);
		const unSubscribe = unreadCountSnapshotListener.current;

		return () => {
			unSubscribe?.();
		};
	}, [snapshotQuery, throttledGetCount]);

	return {
		unReadMailsCount,
		throttledGetCount,
	};
};
export default useGetUnreadMailsCount;
