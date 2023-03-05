import {
	onSnapshot,
	query,
	orderBy,
	limit,
	where,
	getDocs,
} from 'firebase/firestore';
import { useState, useEffect, useRef } from 'react';

const useGetMessages = ({ activeChatCollection, id }) => {
	const [messagesState, setMessagesState] = useState({});

	const firstMessages = useRef(null);
	const [firstLoadingMessages, setFirstLoadingMessages] = useState(false);

	const [loadingPrevMessages, setLoadingPrevMessages] = useState(false);
	const snapshotCleaner = () => {
		if (firstMessages.current) {
			firstMessages.current();
			firstMessages.current = null;
		}
	};

	const mountSnapShot = () => {
		setFirstLoadingMessages(true);
		snapshotCleaner();
		const chatCollectionQuery = query(
			activeChatCollection,
			orderBy('created_at', 'desc'),
			limit(10),
		);

		let prevMessageData = { ...messagesState?.[id]?.messagesData } || {};

		firstMessages.current = onSnapshot(
			chatCollectionQuery,
			(querySnapshot) => {
				const lastDocumentTimeStamp = querySnapshot.docs[querySnapshot.docs.length - 1]?.data()?.created_at;
				const islastPage = querySnapshot.docs.length < 10;
				querySnapshot.forEach((mes) => {
					const timeStamp = mes.data()?.created_at;
					prevMessageData = { [timeStamp]: mes.data(), ...prevMessageData };
				});

				setMessagesState((p) => ({
					...p,
					[id]: {
						messagesData: { ...prevMessageData },
						lastDocumentTimeStamp,
						islastPage,
					},
				}));
				setFirstLoadingMessages(false);
			},
		);
	};

	const getNextData = async () => {
		const chatCollectionQuery = query(
			activeChatCollection,
			where(
				'created_at',
				'<',
				Number(messagesState?.[id]?.lastDocumentTimeStamp),
			),
			orderBy('created_at', 'desc'),
			limit(10),
		);
		let prevMessageData = messagesState?.[id]?.messagesData || {};
		setLoadingPrevMessages(true);
		const prevMessagesPromise = await getDocs(chatCollectionQuery);
		const prevMessages = prevMessagesPromise?.docs;
		const lastDocumentTimeStamp = prevMessages[(prevMessages?.length || 0) - 1]?.data()?.created_at;
		const islastPage = prevMessages?.length < 10;

		prevMessages.forEach((mes) => {
			const timeStamp = mes.data()?.created_at;
			prevMessageData = { [timeStamp]: mes.data(), ...prevMessageData };
		});
		setMessagesState((p) => ({
			...p,
			[id]: {
				...(messagesState?.[id] || {}),
				messagesData: prevMessageData,
				lastDocumentTimeStamp,
				islastPage,
			},
		}));
		setLoadingPrevMessages(false);
	};

	useEffect(() => {
		mountSnapShot();
		return () => {
			snapshotCleaner();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

	const activeMessageData = messagesState?.[id]?.messagesData || {};

	const sortedMessageData = Object.keys(activeMessageData || {})
		.sort((a, b) => Number(a) - Number(b))
		.map((eachkey) => activeMessageData[eachkey]) || [];

	return {
		getNextData,
		lastPage     : messagesState?.[id]?.islastPage,
		messagesData : sortedMessageData,
		firstLoadingMessages,
		loadingPrevMessages,
		messagesState,
	};
};

export default useGetMessages;
