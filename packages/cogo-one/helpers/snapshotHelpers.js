import { isEmpty } from '@cogoport/utils';
import {
	onSnapshot,
	doc,
	query,
	limit, where, getDocs, orderBy,
} from 'firebase/firestore';

import { FIRESTORE_PATH } from '../configurations/firebase-config';
import { PAGE_LIMIT } from '../constants';
import { VIEW_TYPE_GLOBAL_MAPPING } from '../constants/viewTypeMapping';

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
	setLoadingState,
	setFlashMessagesData,
	omniChannelCollection,
	flashMessagesSnapShotListener,
	viewType,
	setCarouselState,
	updateLoadingState,
}) {
	const snapshotRef = flashMessagesSnapShotListener;
	snapshotCleaner({ ref: flashMessagesSnapShotListener });

	if (!VIEW_TYPE_GLOBAL_MAPPING[viewType]?.permissions?.claim_chats) {
		return;
	}

	setLoadingState((prev) => ({ ...prev, flashMessagesLoading: true }));
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

				updateLoadingState('flashMessagesLoading');

				setCarouselState((prev) => {
					if (prev === 'in_timeout') {
						return prev;
					}
					return isEmpty(resultList) ? 'hide' : 'show';
				});
			},

		);
	} catch (error) {
		updateLoadingState('flashMessagesLoading');
	}
}

export function mountPinnedSnapShot({
	setLoadingState, pinSnapshotListener, setListData, userId,
	omniChannelCollection, queryForSearch, canShowPinnedChats, omniChannelQuery, viewType,
	activeSubTab, updateLoadingState,
}) {
	const snapshotRef = pinSnapshotListener;
	snapshotCleaner({ ref: pinSnapshotListener });

	setListData((prev) => ({ ...prev, pinnedMessagesData: {}, messagesListData: {} }));

	if (activeSubTab !== 'all' || viewType === 'shipment_specialist' || !canShowPinnedChats) {
		return;
	}

	setLoadingState((prev) => ({ ...prev, pinnedChatsLoading: true }));

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

			setListData((prev) => ({
				...prev,
				pinnedMessagesData: { ...resultList },
			}));
			updateLoadingState('pinnedChatsLoading');
		},
	);
}

export function mountUnreadCountSnapShot({
	unreadCountSnapshotListener,
	omniChannelCollection, baseQuery,
	setUnReadChatsCount,
	sessionQuery,
}) {
	const snapshotRef = unreadCountSnapshotListener;

	snapshotCleaner({ ref: unreadCountSnapshotListener });

	const countUnreadChatQuery = query(
		omniChannelCollection,
		where('has_admin_unread_messages', '==', true),
		...baseQuery,
		...sessionQuery,
		orderBy('new_message_sent_at', 'desc'),
	);

	snapshotRef.current = onSnapshot(
		countUnreadChatQuery,
		(countUnreadChatSnapshot) => {
			setUnReadChatsCount(countUnreadChatSnapshot.size || FALLBACK_VALUE);
		},
	);
}

export function mountSnapShot({
	setLoadingState, setListData, snapshotListener, omniChannelCollection,
	queryForSearch, omniChannelQuery, updateLoadingState,
}) {
	const snapshotRef = snapshotListener;
	setListData((prev) => ({ ...prev, messagesListData: {}, pinnedMessagesData: {} }));
	snapshotCleaner({ ref: snapshotListener });
	setLoadingState((prev) => ({ ...prev, chatsLoading: true }));

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

			setListData((prev) => ({
				...prev,
				messagesListData: { ...resultList },
				isLastPage,
				lastMessageTimeStamp,
			}));

			updateLoadingState('chatsLoading');
		},
	);
}

export async function getPrevChats({
	omniChannelCollection,
	omniChannelQuery, listData,
	setLoadingState,
	setListData,
	updateLoadingState,
}) {
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

	setLoadingState((prev) => ({ ...prev, chatsLoading: true }));

	const prevChatsPromise = await getDocs(prevChatsQuery);
	const prevChats = prevChatsPromise?.docs;

	const { resultList = {} } = dataFormatter(prevChats);

	const lastMessageTimeStamp = prevChats[
		(prevChats.length || FALLBACK_VALUE) - LAST_ITEM]?.data()?.new_message_sent_at;
	const isLastPage = prevChats?.length < PAGE_LIMIT;

	setListData((prev) => ({
		...prev,
		messagesListData: { ...(prev?.messagesListData || {}), ...resultList },
		isLastPage,
		lastMessageTimeStamp,
	}));

	updateLoadingState('chatsLoading');
}

export function mountActiveRoomSnapShot({
	activeRoomSnapshotListener, setActiveRoomLoading,
	activeCardId, firestore, activeChannelType, setActiveTab,
}) {
	const snapshotRef = activeRoomSnapshotListener;

	snapshotCleaner({ ref: activeRoomSnapshotListener });

	if (!activeCardId) {
		return;
	}

	setActiveRoomLoading(true);
	const activeMessageDoc = doc(
		firestore,
		`${FIRESTORE_PATH[activeChannelType]}/${activeCardId}`,
	);

	snapshotRef.current = onSnapshot(activeMessageDoc, (activeMessageData) => {
		setActiveTab((prev) => ({
			...prev,
			data: { ...(prev.data || {}), id: activeMessageDoc?.id, ...(activeMessageData.data() || {}) },
		}));
		setActiveRoomLoading(false);
	});
}
