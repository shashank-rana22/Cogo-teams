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
		getCogooneTimeline,
		loading,
	} = useListCogooneTimeline({ id, setMessagesState, type: 'messages' });

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

				getCogooneTimeline({
					startDate : lastDocumentTimeStamp,
					endDate   : Date.now(),
					currentMessages,
					lastDocumentTimeStamp,
					islastPage,
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

		setLoadingPrevMessages(true);
		const prevMessagesPromise = await getDocs(chatCollectionQuery);
		const prevMessages = prevMessagesPromise?.docs;
		const lastDocumentTimeStamp = prevMessages[(prevMessages?.length || 0) - 1]?.data()?.created_at;
		const islastPage = prevMessages?.length < 10;
		let currentMessages = {};
		prevMessages.forEach((mes) => {
			const timeStamp = mes.data()?.created_at;
			currentMessages = { ...currentMessages, [timeStamp]: mes.data() };
		});
		const prevTimeStamp = Number(messagesState?.[id]?.lastDocumentTimeStamp);

		getCogooneTimeline({
			startDate : lastDocumentTimeStamp,
			endDate   : prevTimeStamp,
			currentMessages,
			lastDocumentTimeStamp,
			islastPage,
		});
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
		lastPage            : messagesState?.[id]?.islastPage,
		messagesData        : sortedMessageData,
		firstLoadingMessages,
		loadingPrevMessages : loadingPrevMessages || loading,
		messagesState,
	};
};

export default useGetMessages;
