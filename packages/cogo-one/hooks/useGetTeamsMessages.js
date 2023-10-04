import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import {
	onSnapshot,
	query,
	orderBy,
	limit,
	where,
	getDocs,
	collection,
} from 'firebase/firestore';
import { useState, useRef, useMemo, useEffect } from 'react';

import { FIRESTORE_PATH } from '../configurations/firebase-config';
import { messagesFormatter } from '../helpers/formatTeamsList';

const PAGE_LIMIT = 10;
const LAST_INDEX_FROM_END = 1;
const DISTANCE_FROM_TOP = 10;

function newMessageSnapShot({
	chatCollection = {},
	newMessagesRef = {},
	setMessagesState = () => {},
	roomId = '',
	setFirstLoadingMessages = () => {},
	scrollToLastMessage = () => {},
}) {
	if (isEmpty(chatCollection)) {
		return;
	}

	try {
		const chatCollectionQuery = query(
			chatCollection,
			orderBy('created_at', 'desc'),
			limit(PAGE_LIMIT),
		);

		const refArg = newMessagesRef;
		setFirstLoadingMessages(true);
		refArg.current = onSnapshot(
			chatCollectionQuery,
			(querySnapshot) => {
				const querySize = querySnapshot.size;

				const lastDocumentTimeStamp = querySnapshot.docs?.[
					querySize - LAST_INDEX_FROM_END]?.data()?.created_at;
				const isLastPage = querySize < PAGE_LIMIT;

				const newMessagesHash = messagesFormatter(querySnapshot);

				setMessagesState((prev) => ({
					...prev,
					[roomId]: {
						messagesData: { ...(prev?.[roomId]?.messagesData || {}), ...newMessagesHash },
						lastDocumentTimeStamp,
						isLastPage,
					},
				}));

				setFirstLoadingMessages((prev) => {
					if (prev) {
						scrollToLastMessage();
					}
					return false;
				});
			},
		);
	} catch (e) {
		console.error('e', e);
	}
}

async function getNextData({
	roomId = '',
	chatCollection = {},
	setLoadingPrevMessages = () => {},
	setMessagesState = () => {},
	prevLastDocumentTimeStamp = Date.now(),
}) {
	const prevTimeStamp = Number(prevLastDocumentTimeStamp);

	if (isEmpty(chatCollection)) {
		return;
	}

	try {
		const chatCollectionQuery = query(
			chatCollection,
			where(
				'created_at',
				'<',
				prevTimeStamp,
			),
			orderBy('created_at', 'desc'),
			limit(PAGE_LIMIT),
		);

		setLoadingPrevMessages(true);
		const prevMessagesQuery = await getDocs(chatCollectionQuery);

		const querySize = prevMessagesQuery.size;

		const lastDocumentTimeStamp = prevMessagesQuery.docs?.[querySize - LAST_INDEX_FROM_END]?.data()?.created_at;
		const isLastPage = querySize < PAGE_LIMIT;

		const newMessagesHash = messagesFormatter(prevMessagesQuery);

		setMessagesState((prev) => ({
			...prev,
			[roomId]: {
				messagesData: { ...(prev?.[roomId]?.messagesData || {}), ...newMessagesHash },
				lastDocumentTimeStamp,
				isLastPage,
			},
		}));

		setLoadingPrevMessages(false);
	} catch (e) {
		console.error(e);
	}
}

const useGetTeamsMessages = ({
	roomId = '',
	firestore = {},
	scrollToLastMessage = () => {},
}) => {
	const loggedInUserId = useSelector(({ profile }) => profile.user.id);

	const [messagesState, setMessagesState] = useState({
		messagesData          : {},
		lastDocumentTimeStamp : Date.now(),
		isLastPage            : false,
	});

	const newMessagesRef = useRef(null);

	const [firstLoadingMessages, setFirstLoadingMessages] = useState(true);

	const [loadingPrevMessages, setLoadingPrevMessages] = useState(false);

	const chatCollection = useMemo(() => {
		if (!roomId) {
			return {};
		}

		return collection(firestore, `${FIRESTORE_PATH.internal_rooms}/${roomId}/messages`);
	}, [firestore, roomId]);

	const {
		isLastPage = false,
		messagesData: activeMessageData = {},
		lastDocumentTimeStamp: prevLastDocumentTimeStamp = Date.now(),
	} = messagesState?.[roomId] || {};

	const refetch = () => {
		getNextData({
			roomId,
			chatCollection,
			setLoadingPrevMessages,
			setMessagesState,
			prevLastDocumentTimeStamp,
		});
	};

	const handleScroll = (e) => {
		const bottom = e.target.scrollTop <= DISTANCE_FROM_TOP;
		if (bottom && !isLastPage && !loadingPrevMessages) {
			refetch();
		}
	};

	const sortedMessageData = Object.keys(activeMessageData || {})
		.sort((a, b) => Number(a) - Number(b))
		.map((eachkey) => activeMessageData[eachkey]) || [];

	useEffect(() => {
		newMessageSnapShot({
			chatCollection,
			newMessagesRef,
			setMessagesState,
			roomId,
			setFirstLoadingMessages,
			scrollToLastMessage,
		});

		const unSubscribe = newMessagesRef.current;

		return () => {
			unSubscribe?.();
		};
	}, [chatCollection, roomId, scrollToLastMessage]);

	return {
		messages: sortedMessageData,
		firstLoadingMessages,
		loadingPrevMessages,
		handleScroll,
		isLastPage,
		refetch,
		loggedInUserId,
	};
};

export default useGetTeamsMessages;
