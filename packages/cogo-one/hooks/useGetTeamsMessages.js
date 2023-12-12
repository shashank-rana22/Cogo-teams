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

import useListTeamsTimeline from './useListTeamsTimeline';

const BUFFER_FOR_INITIAL_START_TIME = 600000;

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
	getCogooneTimeline = () => {},
	starMessage = false,
}) {
	const starFilterQuery = starMessage ? where('is_star_marked', '==', true) : undefined;

	if (isEmpty(chatCollection)) {
		return;
	}

	try {
		const chatCollectionQuery = query(
			chatCollection,
			starFilterQuery,
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

				getCogooneTimeline({
					endDate   : Date.now(),
					startDate : Number(lastDocumentTimeStamp - BUFFER_FOR_INITIAL_START_TIME),
					groupId   : roomId,
				});

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
	getCogooneTimeline = () => {},
	starMessage = false,
}) {
	const prevTimeStamp = Number(prevLastDocumentTimeStamp);

	const starFilterQuery = starMessage ? where('is_star_marked', '==', true) : undefined;

	if (isEmpty(chatCollection)) {
		return;
	}

	try {
		const chatCollectionQuery = query(
			chatCollection,
			starFilterQuery,
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
		getCogooneTimeline({
			endDate   : prevTimeStamp,
			startDate : lastDocumentTimeStamp,
			groupId   : roomId,
		});

		setLoadingPrevMessages(false);
	} catch (e) {
		console.error(e);
	}
}

const useGetTeamsMessages = ({
	roomId = '',
	firestore = {},
	scrollToLastMessage = () => {},
	lastGroupUpdatedAt = 0,
	starMessage = false,
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

	const { getCogooneTimeline = () => {} } = useListTeamsTimeline({
		setMessagesState,
		lastGroupUpdatedAt,
		roomId,
		scrollToLastMessage,
	});

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
			getCogooneTimeline,
			starMessage,
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
			getCogooneTimeline,
			starMessage,
		});

		const unSubscribe = newMessagesRef.current;

		return () => {
			unSubscribe?.();
		};
	}, [chatCollection, getCogooneTimeline, roomId, scrollToLastMessage, starMessage]);

	return {
		messages: sortedMessageData,
		firstLoadingMessages,
		loadingPrevMessages,
		handleScroll,
		isLastPage,
		refetch,
		loggedInUserId,
		messagesState,
		setMessagesState,
	};
};

export default useGetTeamsMessages;
