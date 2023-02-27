import {
	onSnapshot,
	query,
	orderBy,
	limit,
	startAfter,
} from 'firebase/firestore';
import { useState, useEffect, useRef } from 'react';

const useGetMessages = ({ activeChatCollection, id }) => {
	const [messagesState, setMessagesState] = useState({});
	const firstMessages = useRef(null);
	const [loadingMessages, setLoadingMessages] = useState(false);
	const [loadingPrevMessages, setLoadingPrevMessages] = useState(false);
	const snapshotCleaner = () => {
		if (firstMessages.current) {
			firstMessages.current();
			firstMessages.current = null;
		}
	};
	const getFirebaseData = () => {
		snapshotCleaner();
		const chatCollectionQuery = query(
			activeChatCollection,
			orderBy('created_at', 'desc'),
			limit(10),
		);
		setLoadingMessages(true);
		firstMessages.current = onSnapshot(chatCollectionQuery, (querySnapshot) => {
			const result = [];
			const lastDocument = querySnapshot.docs[querySnapshot.docs.length - 1];
			const islastPage = querySnapshot.docs.length < 10;
			querySnapshot.forEach((mes) => {
				result.unshift(mes.data());
			});
			setMessagesState((p) => ({ ...p, [id]: { messagesData: result, lastDocument, islastPage } }));
			setLoadingMessages(false);
		});
	};

	const getNextData = () => {
		const chatCollectionQuery = query(
			activeChatCollection,
			orderBy('created_at', 'desc'),
			startAfter(messagesState?.[id]?.lastDocument),
			limit(10),
		);
		setLoadingPrevMessages(true);
		onSnapshot(chatCollectionQuery, (querySnapshot) => {
			const lastDocument = querySnapshot.docs[querySnapshot.docs.length - 1];
			const islastPage = querySnapshot.docs.length < 10;
			const userMessageData = messagesState?.[id]?.messagesData || [];
			querySnapshot.forEach((mes) => {
				userMessageData.unshift(mes.data());
			});

			setMessagesState((p) => ({ ...p, [id]: { messagesData: userMessageData, lastDocument, islastPage } }));
			setLoadingPrevMessages(false);
		});
	};

	useEffect(() => {
		getFirebaseData();
		return () => {
			snapshotCleaner();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

	return {
		getNextData,
		getFirebaseData,
		lastPage     : messagesState?.[id]?.islastPage,
		messagesData : messagesState?.[id]?.messagesData,
		loadingMessages,
		loadingPrevMessages,
		messagesState,
	};
};

export default useGetMessages;
