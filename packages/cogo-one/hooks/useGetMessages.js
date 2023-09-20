import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';
import {
	onSnapshot,
	query,
	orderBy,
	limit,
	where,
	getDocs,
	doc,
	deleteDoc,
	collection,
} from 'firebase/firestore';
import { useState, useEffect, useRef } from 'react';

import { FIRESTORE_PATH } from '../configurations/firebase-config';
import { VIEW_TYPE_GLOBAL_MAPPING } from '../constants/viewTypeMapping';

import useListCogooneTimeline from './useListCogooneTimeline';

const PAGE_LIMIT = 10;
const LAST_INDEX_FROM_END = 1;
const ZERO_MESSAGES = 0;
const QUERY_LIMIT = 1;

const useGetMessages = ({
	activeChatCollection, id, viewType, firestore = {},
	channel_type = '', setActiveTab = () => {},
}) => {
	const [messagesState, setMessagesState] = useState({});

	const firstMessages = useRef(null);
	const [firstLoadingMessages, setFirstLoadingMessages] = useState(false);

	const [loadingPrevMessages, setLoadingPrevMessages] = useState(false);

	const {
		getCogooneTimeline,
		timeLineLoading, firstTimeLineLoading, setFirstTimeLineLoading = () => {},
	} = useListCogooneTimeline({ id, setMessagesState, type: 'messages' });

	const snapshotCleaner = () => {
		if (firstMessages.current) {
			firstMessages.current();
			firstMessages.current = null;
		}
	};

	const mountSnapShot = () => {
		snapshotCleaner();

		if (isEmpty(activeChatCollection)) {
			return;
		}

		setFirstLoadingMessages(true);
		setFirstTimeLineLoading(true);
		const chatCollectionQuery = query(
			activeChatCollection,
			...(VIEW_TYPE_GLOBAL_MAPPING[viewType]?.accesible_agent_types_query || []),
			orderBy('created_at', 'desc'),
			limit(PAGE_LIMIT),
		);
		firstMessages.current = onSnapshot(
			chatCollectionQuery,
			(querySnapshot) => {
				const lastDocumentTimeStamp = querySnapshot.docs[querySnapshot.docs.length
						- LAST_INDEX_FROM_END]?.data()?.created_at;
				const islastPage = querySnapshot.docs.length < PAGE_LIMIT;
				let prevMessageData = {};
				querySnapshot.forEach((mes) => {
					const timeStamp = mes.data()?.created_at;

					prevMessageData = {
						...prevMessageData,
						[timeStamp]: {
							...(mes.data() || {}),
							id: mes.id,
						},
					};
				});

				getCogooneTimeline({
					startDate : lastDocumentTimeStamp,
					endDate   : Date.now(),
					prevMessageData,
					lastDocumentTimeStamp,
					islastPage,
				});
				setFirstLoadingMessages(false);
			},
		);
	};

	const getNextData = async () => {
		const prevTimeStamp = Number(messagesState?.[id]?.lastDocumentTimeStamp);

		if (isEmpty(activeChatCollection)) {
			return;
		}

		const chatCollectionQuery = query(
			activeChatCollection,
			...(VIEW_TYPE_GLOBAL_MAPPING[viewType]?.accesible_agent_types_query || []),
			where(
				'created_at',
				'<',
				prevTimeStamp,
			),
			orderBy('created_at', 'desc'),
			limit(PAGE_LIMIT),
		);

		setLoadingPrevMessages(true);
		const prevMessagesPromise = await getDocs(chatCollectionQuery);
		const prevMessages = prevMessagesPromise?.docs || [];
		const lastDocumentTimeStamp = prevMessages[(prevMessages.length
			|| GLOBAL_CONSTANTS.zeroth_index) - LAST_INDEX_FROM_END]?.data()?.created_at;
		const islastPage = prevMessages?.length < PAGE_LIMIT;
		let prevMessageData = {};

		prevMessages.forEach((mes) => {
			const timeStamp = mes.data()?.created_at;

			prevMessageData = {
				...prevMessageData,
				[timeStamp]: {
					...(mes.data() || {}),
					id: mes.id,
				},
			};
		});

		getCogooneTimeline({
			startDate : lastDocumentTimeStamp,
			endDate   : prevTimeStamp,
			prevMessageData,
			lastDocumentTimeStamp,
			islastPage,
		});
		setLoadingPrevMessages(false);
	};

	const deleteMessage = async ({ timestamp = '', messageDocId = '' }) => {
		setMessagesState((prev) => {
			const { [id]: currentDocument, ...rest } = prev;

			const { [timestamp]: del, ...restDocuments } = currentDocument?.messagesData || {};
			return {
				...rest,
				[id]: {
					...currentDocument,
					messagesData: {
						...restDocuments,
					},
				},
			};
		});

		try {
			const messageDoc = doc(
				firestore,
				`${FIRESTORE_PATH[channel_type]}/${id}/messages/${messageDocId}`,
			);

			deleteDoc(messageDoc);

			const messagesCollection = collection(
				firestore,
				`${FIRESTORE_PATH[channel_type]}/${id}/messages`,
			);

			const messagesCollectionQuery = query(
				messagesCollection,
				limit(QUERY_LIMIT),
			);

			const messagesDocs = await getDocs(messagesCollectionQuery);

			const hasMessages = messagesDocs?.size > ZERO_MESSAGES;

			if (hasMessages) {
				return;
			}

			const roomDoc = doc(
				firestore,
				`${FIRESTORE_PATH[channel_type]}/${id}`,
			);

			setActiveTab({
				tab               : 'firebase_emails',
				subTab            : 'all',
				hasNoFireBaseRoom : false,
				expandSideBar     : false,
				data              : {},
			});
			deleteDoc(roomDoc);
		} catch (e) {
			console.error('e', e);
		}
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
		lastPage             : messagesState?.[id]?.islastPage,
		messagesData         : sortedMessageData,
		firstLoadingMessages : firstLoadingMessages || firstTimeLineLoading,
		loadingPrevMessages  : loadingPrevMessages || timeLineLoading,
		messagesState,
		mountSnapShot,
		deleteMessage,
	};
};

export default useGetMessages;
