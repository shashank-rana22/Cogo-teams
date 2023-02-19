import {
	onSnapshot,
	query,
	orderBy,
	limit,
	startAfter,
} from 'firebase/firestore';
import { useState, useEffect } from 'react';

const useGetMessages = ({ activeChatCollection, id }) => {
	const [messagesData, setMessagesData] = useState([]);
	const [lastDoc, setLastDoc] = useState(null);
	const [loadingMessages, setLoadingMessages] = useState(false);
	const [lastPage, setLastPage] = useState(false);

	const getFirebaseData = () => {
		const chatCollectionQuery = query(
			activeChatCollection,
			orderBy('created_at', 'desc'),
			limit(10),
		);
		setLoadingMessages(true);

		onSnapshot(chatCollectionQuery, (querySnapshot) => {
			const result = [];
			setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
			setLastPage(querySnapshot.docs.length < 10);
			querySnapshot.forEach((mes) => {
				result.unshift(mes.data());
			});
			setMessagesData(result);
			setLoadingMessages(false);
		});
	};

	const getNextData = () => {
		const chatCollectionQuery = query(
			activeChatCollection,
			orderBy('created_at', 'desc'),
			startAfter(lastDoc),
			limit(10),
		);

		onSnapshot(chatCollectionQuery, (querySnapshot) => {
			setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
			setLastPage(querySnapshot.docs.length < 10);
			querySnapshot.forEach((mes) => {
				messagesData.unshift(mes.data());
			});
			setMessagesData([...messagesData]);
		});
	};

	useEffect(() => {
		getFirebaseData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

	return {
		getNextData,
		getFirebaseData,
		lastPage,
		messagesData,
		loadingMessages,
	};
};

export default useGetMessages;
