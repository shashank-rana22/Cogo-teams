import { Toast } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import { useRouter } from '@cogoport/next';
import {
	collectionGroup,
	updateDoc,
	doc,
	query,
	where, getDocs, orderBy,
} from 'firebase/firestore';
import { useState, useEffect, useMemo, useRef, useCallback } from 'react';

import { FIRESTORE_PATH } from '../configurations/firebase-config';
import filterAndSortFlashMessages from '../helpers/filterAndSortFlashMessages';
import getFireStoreQuery from '../helpers/getFireStoreQuery';
import {
	snapshotCleaner,
	mountFlashChats, mountPinnedSnapShot, mountUnreadCountSnapShot, mountSnapShot, getPrevChats,
	mountActiveRoomSnapShot,
} from '../helpers/snapshotHelpers';
import sortChats from '../helpers/sortChats';

const MAX_DISTANCE_FROM_BOTTOM = 150;
const DEFAULT_ASSINED_CHAT_COUNT = 0;

function useListChats({
	firestore,
	userId,
	isomniChannelAdmin,
	showBotMessages = false,
	searchValue = '',
	viewType = '',
	setShowFeedback = () => {},
	activeSubTab,
}) {
	const { query:searchQuery, debounceQuery } = useDebounceQuery();

	const {
		query: { assigned_chat = '', channel_type:queryChannelType = '', type = '' },
	} = useRouter();

	const snapshotListener = useRef(null);
	const pinSnapshotListener = useRef(null);
	const unreadCountSnapshotListener = useRef(null);
	const activeRoomSnapshotListener = useRef(null);
	const flashMessagesSnapShotListener = useRef(null);
	const [firstMount, setFirstMount] = useState(false);

	const [activeCard, setActiveCard] = useState({
		activeCardId   : '',
		activeCardData : {},
	});

	const [loading, setLoading] = useState(false);
	const [flashMessagesLoading, setFlashMessagesLoading] = useState(false);
	const [activeRoomLoading, setActiveRoomLoading] = useState(false);
	const [appliedFilters, setAppliedFilters] = useState({});
	const [flashMessagesData, setFlashMessagesData] = useState({});

	const [listData, setListData] = useState({
		messagesListData     : {},
		unReadChatsCount     : 0,
		lastMessageTimeStamp : Date.now(),
		isLastPage           : false,
		pinnedMessagesData   : {},
	});

	const { status = '', observer = '', chat_tags = '' } = appliedFilters || {};

	const canShowPinnedChats = !(observer || chat_tags);

	useEffect(() => {
		debounceQuery(searchValue?.trim()?.toUpperCase());
	}, [debounceQuery, searchValue]);

	useEffect(() => {
		if (assigned_chat && queryChannelType && firstMount) {
			setActiveCard({ activeCardId: assigned_chat, activeCardData: { channel_type: queryChannelType } });
		}
	}, [assigned_chat, firstMount, queryChannelType]);

	useEffect(() => {
		if (type === 'openFeedbackModal') {
			setShowFeedback(true);
		}
	}, [setShowFeedback, type]);

	const omniChannelCollection = useMemo(
		() => collectionGroup(firestore, 'rooms'),
		[firestore],
	);

	const omniChannelQuery = useMemo(
		() => getFireStoreQuery({
			isomniChannelAdmin,
			userId,
			appliedFilters,
			showBotMessages,
			viewType,
			activeSubTab,
		}),
		[appliedFilters, isomniChannelAdmin, showBotMessages, userId, viewType, activeSubTab],
	);

	const queryForSearch = useMemo(() => (
		searchQuery
			? [where('user_name', '>=', searchQuery),
				where('user_name', '<=', `${searchQuery}\\uf8ff`), orderBy('user_name', 'asc')] : []

	), [searchQuery]);

	const { activeCardId = '', activeCardData } = activeCard || {};
	const { channel_type:activeChannelType = '' } = activeCardData || {};

	useEffect(() => {
		mountPinnedSnapShot({
			setLoading,
			pinSnapshotListener,
			setListData,
			userId,
			omniChannelCollection,
			queryForSearch,
			canShowPinnedChats,
			omniChannelQuery,
			viewType,
			activeSubTab,
		});

		return () => {
			snapshotCleaner({ ref: pinSnapshotListener });
		};
	}, [canShowPinnedChats, omniChannelCollection, omniChannelQuery, queryForSearch, userId, viewType, activeSubTab]);

	useEffect(() => {
		mountSnapShot({
			setLoading,
			setListData,
			snapshotListener,
			omniChannelCollection,
			queryForSearch,
			omniChannelQuery,
		});
		return () => {
			snapshotCleaner({ ref: snapshotListener });
		};
	}, [omniChannelCollection, omniChannelQuery, queryForSearch]);

	useEffect(() => {
		mountUnreadCountSnapShot({
			status,
			unreadCountSnapshotListener,
			omniChannelCollection,
			omniChannelQuery,
			setListData,
		});
		return () => {
			snapshotCleaner({ ref: unreadCountSnapshotListener });
		};
	}, [omniChannelCollection, omniChannelQuery, status]);

	useEffect(() => {
		mountActiveRoomSnapShot({
			activeRoomSnapshotListener,
			setActiveRoomLoading,
			activeCardId,
			firestore,
			activeChannelType,
			setActiveCard,
		});
		return () => {
			snapshotCleaner({ ref: activeRoomSnapshotListener });
		};
	}, [activeCardId, activeChannelType, firestore]);

	useEffect(() => {
		mountFlashChats({
			setFlashMessagesLoading,
			setFlashMessagesData,
			omniChannelCollection,
			flashMessagesSnapShotListener,
			viewType,
		});
		return () => {
			snapshotCleaner({ ref: flashMessagesSnapShotListener });
		};
	}, [omniChannelCollection, viewType]);

	const setActiveMessage = async (val) => {
		const { channel_type, id } = val || {};
		if (channel_type && id) {
			try {
				const messageDoc = doc(
					firestore,
					`${FIRESTORE_PATH[channel_type]}/${id}`,
				);
				await updateDoc(messageDoc, { new_message_count: 0, has_admin_unread_messages: false });
				setActiveCard({ activeCardId: id, activeCardData: val });
			} catch (e) {
				Toast.error('Chat Not Found');
			}
		}
	};

	const handleScroll = useCallback((e) => {
		const reachBottom = e.target.scrollHeight - (e.target.clientHeight
			+ e.target.scrollTop) <= MAX_DISTANCE_FROM_BOTTOM;
		if (reachBottom && !listData?.isLastPage && !loading) {
			getPrevChats({ omniChannelCollection, omniChannelQuery, listData, setLoading, setListData });
		}
	}, [listData, loading, omniChannelCollection, omniChannelQuery]);

	const { sortedPinnedChatList, sortedUnpinnedList } = sortChats(listData, userId);

	const updateLeaduser = async (data = {}) => {
		const { channel_type, id } = activeCardData || {};
		const roomCollection = doc(
			firestore,
			`${FIRESTORE_PATH[channel_type]}/${id}`,
		);

		try {
			await updateDoc(roomCollection, {
				updated_at: Date.now(),
				...data,
			});
		} catch (error) {
			// console.log(error);
		}
	};

	const getAssignedChats = useCallback(async () => {
		const assignedChatsQuery = query(
			omniChannelCollection,
			where('session_type', '==', 'admin'),
			where('support_agent_id', '==', userId),
		);
		const getAssignedChatsQuery = await getDocs(assignedChatsQuery);
		return getAssignedChatsQuery.size || DEFAULT_ASSINED_CHAT_COUNT;
	}, [omniChannelCollection, userId]);

	return {
		chatsData: {
			messagesList      : sortedUnpinnedList || [],
			unReadChatsCount  : listData?.unReadChatsCount,
			sortedPinnedChatList,
			flashMessagesList : filterAndSortFlashMessages(flashMessagesData) || [],
		},
		setActiveMessage,
		activeMessageCard: activeCardData,
		setAppliedFilters,
		appliedFilters,
		loading,
		activeCardId,
		setActiveCard,
		updateLeaduser,
		setFirstMount,
		handleScroll,
		activeRoomLoading,
		getAssignedChats,
		flashMessagesLoading,
	};
}

export default useListChats;
