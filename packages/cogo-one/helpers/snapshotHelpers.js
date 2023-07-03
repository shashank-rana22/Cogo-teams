import {
	onSnapshot,
	doc,
	query,
	limit, where, getDocs, orderBy,
} from 'firebase/firestore';

import { FIRESTORE_PATH } from '../configurations/firebase-config';
import { PAGE_LIMIT } from '../constants';
import { HIDE_FLASH_MESSAGES_FOR } from '../constants/viewTypeConstants';

const LAST_ITEM = 1;
const FALLBACK_VALUE = 0;

export function snapshotCleaner({ ref }) {
	const tempRef = ref;
	if (tempRef.current) {
		tempRef.current();
		tempRef.current = null;
	}
}

function dataFormatter(list) {
	let resultList = {};
	list?.forEach((item) => {
		const { created_at, updated_at, new_message_count, ...rest } = item.data() || {};
		const userData = {
			id         : item?.id,
			created_at : item.data().created_at || Date.now(),
			new_message_count,
			...rest,
		};

		resultList = { ...resultList, [item?.id]: userData };
	});

	return {
		resultList,
	};
}

export function mountFlashChats({
	setFlashMessagesLoading,
	setFlashMessagesData,
	omniChannelCollection,
	flashMessagesSnapShotListener,
	viewType,
}) {
	const snapshotRef = flashMessagesSnapShotListener;
	snapshotCleaner({ ref: flashMessagesSnapShotListener });

	if (HIDE_FLASH_MESSAGES_FOR.includes(viewType)) {
		return;
	}

	setFlashMessagesLoading(true);
	setFlashMessagesData({});

	try {
		const newChatsQuery = query(
			omniChannelCollection,
			where('session_type', '==', 'bot'),
			where('can_claim_chat', '==', true),
			orderBy('updated_at', 'desc'),
		);
		snapshotRef.current = onSnapshot(
			newChatsQuery,
			(querySnapshot) => {
				const { resultList } = dataFormatter(querySnapshot);
				setFlashMessagesData(resultList);
				setFlashMessagesLoading(false);
			},

		);
	} catch (error) {
		console.log('error', error);
	} finally {
		setFlashMessagesLoading(false);
	}
}

export function mountPinnedSnapShot({
	setLoading, pinSnapshotListener, setListData, userId,
	omniChannelCollection, queryForSearch, canShowPinnedChats, omniChannelQuery, viewType,
	activeSubTab,
}) {
	const snapshotRef = pinSnapshotListener;
	snapshotCleaner({ ref: pinSnapshotListener });

	setListData((p) => ({ ...p, pinnedMessagesData: {} }));

	if (activeSubTab !== 'all' || viewType === 'shipment_view') {
		return;
	}

	if (canShowPinnedChats) {
		setLoading(true);
		const queryForPinnedChat = where('pinnedAgents', 'array-contains', userId);
		const newChatsQuery = query(
			omniChannelCollection,
			queryForPinnedChat,
			...queryForSearch,
			...omniChannelQuery,
		);
		snapshotRef.current = onSnapshot(
			newChatsQuery,
			(pinSnapShot) => {
				const { resultList } = dataFormatter(pinSnapShot);
				setListData((p) => ({ ...p, pinnedMessagesData: { ...resultList } }));
				setLoading(false);
			},
		);
	}
}

export function mountUnreadCountSnapShot({
	status, unreadCountSnapshotListener,
	omniChannelCollection, omniChannelQuery, setListData,
}) {
	const snapshotRef = unreadCountSnapshotListener;

	const queryForUnreadChats = status !== 'unread'
		? [where('has_admin_unread_messages', '==', true)] : [];

	snapshotCleaner({ ref: unreadCountSnapshotListener });

	const countUnreadChatQuery = query(
		omniChannelCollection,
		...queryForUnreadChats,
		...omniChannelQuery,
	);

	snapshotRef.current = onSnapshot(
		countUnreadChatQuery,
		(countUnreadChatSnapshot) => {
			setListData((p) => ({
				...p,
				unReadChatsCount: countUnreadChatSnapshot.size || FALLBACK_VALUE,
			}));
		},
	);
}

export function mountSnapShot({
	setLoading, setListData, snapshotListener, omniChannelCollection,
	queryForSearch, omniChannelQuery,
}) {
	const snapshotRef = snapshotListener;
	setLoading(true);
	setListData((p) => ({ ...p, messagesListData: {} }));
	snapshotCleaner({ ref: snapshotListener });
	const newChatsQuery = query(
		omniChannelCollection,
		...queryForSearch,
		...omniChannelQuery,
		limit(PAGE_LIMIT),
	);
	snapshotRef.current = onSnapshot(
		newChatsQuery,
		(querySnapshot) => {
			const isLastPage = querySnapshot.docs.length < PAGE_LIMIT;
			const lastMessageTimeStamp = querySnapshot
				.docs[querySnapshot.docs.length - LAST_ITEM]?.data()?.new_message_sent_at;
			const { resultList } = dataFormatter(querySnapshot);
			setListData((p) => ({
				...p,
				messagesListData: { ...resultList },
				isLastPage,
				lastMessageTimeStamp,
			}));
			setLoading(false);
		},
	);
}

export async function getPrevChats({ omniChannelCollection, omniChannelQuery, listData, setLoading, setListData }) {
	const prevChatsQuery = query(
		omniChannelCollection,
		...omniChannelQuery,
		where(
			'new_message_sent_at',
			'<=',
			Number(listData?.lastMessageTimeStamp),
		),
		limit(PAGE_LIMIT),
	);
	setLoading(true);

	const prevChatsPromise = await getDocs(prevChatsQuery);
	const prevChats = prevChatsPromise?.docs;

	const { resultList = {} } = dataFormatter(prevChats);

	const lastMessageTimeStamp = prevChats[
		(prevChats.length || FALLBACK_VALUE) - LAST_ITEM]?.data()?.new_message_sent_at;
	const isLastPage = prevChats?.length < PAGE_LIMIT;

	setListData((p) => ({
		...p,
		messagesListData: { ...(p?.messagesListData || {}), ...resultList },
		isLastPage,
		lastMessageTimeStamp,
	}));
	setLoading(false);
}

export function mountActiveRoomSnapShot({
	activeRoomSnapshotListener, setActiveRoomLoading,
	activeCardId, firestore, activeChannelType, setActiveCard,
}) {
	const snapshotRef = activeRoomSnapshotListener;

	setActiveRoomLoading(true);
	snapshotCleaner({ ref: activeRoomSnapshotListener });

	if (activeCardId) {
		const activeMessageDoc = doc(
			firestore,
			`${FIRESTORE_PATH[activeChannelType]}/${activeCardId}`,
		);
		snapshotRef.current = onSnapshot(activeMessageDoc, (activeMessageData) => {
			setActiveCard((p) => ({
				...p,
				activeCardId,
				activeCardData:
                { id: activeMessageDoc?.id, ...(activeMessageData.data() || {}) },
			}));
		});
		setActiveRoomLoading(false);
	}
}
