import {
	onSnapshot,
	query,
	orderBy,
	limit,
	where,
	getDocs,
} from 'firebase/firestore';
import { useState, useEffect, useRef } from 'react';

import useListCogooneTimeline from './useListCogooneTimeline';

const useGetMessages = ({ activeChatCollection, id }) => {
	const [messagesState, setMessagesState] = useState({});

	const firstMessages = useRef(null);
	const [firstLoadingMessages, setFirstLoadingMessages] = useState(false);

	const [loadingPrevMessages, setLoadingPrevMessages] = useState(false);

	const {
		data,
		getCogooneTimeline,
		loading,
	} = useListCogooneTimeline({ id });
	console.log('data:', data, loading);

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

		const prevMessageData = { ...messagesState?.[id]?.messagesData } || {};

		firstMessages.current = onSnapshot(
			chatCollectionQuery,
			(querySnapshot) => {
				const lastDocumentTimeStamp = querySnapshot.docs[querySnapshot.docs.length - 1]?.data()?.created_at;
				const islastPage = querySnapshot.docs.length < 10;
				let currentMessages = {};
				querySnapshot.forEach((mes) => {
					const timeStamp = mes.data()?.created_at;
					currentMessages = { ...currentMessages, [timeStamp]: mes.data() };
				});

				setMessagesState((p) => ({
					...p,
					[id]: {
						messagesData: { ...prevMessageData, ...currentMessages },
						lastDocumentTimeStamp,
						islastPage,
					},
				}));
				const currentTimeLine = Object.keys(currentMessages).sort();
				getCogooneTimeline({
					startDate : currentTimeLine[0],
					endDate   : currentTimeLine.at(-1),
				});
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
			prevMessageData = { ...prevMessageData, [timeStamp]: mes.data() };
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
