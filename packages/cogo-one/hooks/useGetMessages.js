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
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';

import { FIRESTORE_PATH } from '../configurations/firebase-config';
import { VIEW_TYPE_GLOBAL_MAPPING } from '../constants/viewTypeMapping';

import useMessagesTimeline from './useMessagesTimeline';

const PAGE_LIMIT = 10;
const LAST_INDEX_FROM_END = 1;
const ZERO_MESSAGES = 0;
const QUERY_LIMIT = 1;

const useGetMessages = (
	{
		id,
		viewType,
		firestore = {},
		channel_type = '',
		setActiveTab = () => {},
		addTimeline = false,
	},
) => {
	const snapshotRef = useRef(null);

	const [messagesState, setMessagesState] = useState({});
	const [firstLoadingMessages, setFirstLoadingMessages] = useState(true);
	const [loadingPrevMessages, setLoadingPrevMessages] = useState(false);

	const { addMessageTimeline = () => {} } = useMessagesTimeline({ setMessagesState, id });

	const mountSnapShot = useCallback(() => {
		try {
			const activeChatCollection = collection(
				firestore,
				`${FIRESTORE_PATH[channel_type]}/${id}/messages`,
			);

			if (isEmpty(activeChatCollection)) {
				return;
			}

			const chatCollectionQuery = query(
				activeChatCollection,
				...(VIEW_TYPE_GLOBAL_MAPPING[viewType]?.accesible_agent_types_query || []),
				orderBy('created_at', 'desc'),
				limit(PAGE_LIMIT),
			);

			snapshotRef.current = onSnapshot(
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

					setMessagesState((prev) => ({
						messagesData: { ...(prev?.messagesData || {}), ...(prevMessageData || {}) },
						lastDocumentTimeStamp,
						islastPage,
					}));

					if (addTimeline) {
						addMessageTimeline({
							startDate : lastDocumentTimeStamp,
							endDate   : Date.now(),
						});
					}
					setFirstLoadingMessages(false);
				},
			);
		} catch (e) {
			console.error('e', e);
		}
	}, [firestore, channel_type, id, viewType, addTimeline, addMessageTimeline]);

	const getNextData = useCallback(async ({ callBack = () => {} } = {}) => {
		try {
			const activeChatCollection = collection(
				firestore,
				`${FIRESTORE_PATH[channel_type]}/${id}/messages`,
			);

			if (isEmpty(activeChatCollection)) {
				return;
			}

			const prevTimeStamp = Number(messagesState?.lastDocumentTimeStamp || 0);
			setLoadingPrevMessages(true);

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

			const messagesLength = Object.keys(messagesState?.messagesData || {}).length + (prevMessages?.length || 0);

			setMessagesState((prev) => ({
				messagesData: { ...(prev?.messagesData || {}), ...(prevMessageData || {}) },
				lastDocumentTimeStamp,
				islastPage,
			}));

			if (addTimeline) {
				addMessageTimeline({
					startDate : lastDocumentTimeStamp,
					endDate   : prevTimeStamp,
				});
			} else {
				callBack({ newListLength: messagesLength });
			}
		} catch (error) {
			console.error('error', error);
		} finally {
			setLoadingPrevMessages(false);
		}
	}, [addMessageTimeline,
		addTimeline,
		channel_type,
		firestore, id,
		messagesState?.lastDocumentTimeStamp, messagesState?.messagesData, viewType]);

	const deleteMessage = async ({ timestamp = '', messageDocId = '' }) => {
		setMessagesState((prev) => {
			const { [id]: currentDocument, ...rest } = prev;

			const { [timestamp]: del, ...restDocuments } = prev?.messagesData || {};
			return {
				...rest,
				messagesData: {
					...restDocuments,
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

	const sortedMessageData = useMemo(() => Object.keys(messagesState?.messagesData || {})
		.sort((a, b) => Number(a) - Number(b))
		.map((eachkey) => messagesState?.messagesData?.[eachkey]) || [], [messagesState]);

	useEffect(() => {
		setMessagesState({});

		setFirstLoadingMessages(true);
		mountSnapShot();
		const unSubscribe = snapshotRef?.current;

		return () => {
			unSubscribe?.();
		};
	}, [mountSnapShot]);

	return {
		getNextData,
		lastPage     : messagesState?.islastPage,
		messagesData : sortedMessageData,
		firstLoadingMessages,
		loadingPrevMessages,
		messagesState,
		mountSnapShot,
		deleteMessage,
	};
};

export default useGetMessages;
