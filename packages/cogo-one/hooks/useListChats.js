import { Toast } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import {
	collectionGroup,
	updateDoc,
	doc,
	where, orderBy,
} from 'firebase/firestore';
import { useState, useEffect, useMemo, useRef, useCallback } from 'react';

import { FIRESTORE_PATH } from '../configurations/firebase-config';
import filterAndSortFlashMessages from '../helpers/filterAndSortFlashMessages';
import getFireStoreQuery from '../helpers/getFireStoreQuery';
import {
	snapshotCleaner,
	mountFlashChats, mountPinnedSnapShot, mountSnapShot, getPrevChats,
} from '../helpers/snapshotHelpers';
import sortChats from '../helpers/sortChats';

const MAX_DISTANCE_FROM_BOTTOM = 150;

function useListChats({
	firestore,
	userId,
	isBotSession = false,
	searchValue = '',
	viewType = '',
	activeSubTab,
	setActiveTab,
	setCarouselState,
}) {
	const snapshotListener = useRef(null);
	const pinSnapshotListener = useRef(null);
	const flashMessagesSnapShotListener = useRef(null);

	const [loadingState, setLoadingState] = useState({
		pinnedChatsLoading   : false,
		chatsLoading         : false,
		flashMessagesLoading : false,
	});
	const [appliedFilters, setAppliedFilters] = useState({});
	const [flashMessagesData, setFlashMessagesData] = useState({});
	const [listData, setListData] = useState({
		messagesListData     : {},
		lastMessageTimeStamp : Date.now(),
		isLastPage           : false,
		pinnedMessagesData   : {},
	});

	const { query:searchQuery, debounceQuery } = useDebounceQuery();

	const { observer = '', chat_tags = '' } = appliedFilters || {};

	const canShowPinnedChats = !(observer || chat_tags);

	const omniChannelCollection = useMemo(
		() => collectionGroup(firestore, 'rooms'),
		[firestore],
	);

	const omniChannelQuery = useMemo(
		() => getFireStoreQuery({
			userId,
			appliedFilters,
			isBotSession,
			viewType,
			activeSubTab,
		}),
		[appliedFilters, isBotSession, userId, viewType, activeSubTab],
	);

	const queryForSearch = useMemo(() => (
		searchQuery
			? [where('user_name', '>=', searchQuery),
				where('user_name', '<=', `${searchQuery}\\uf8ff`), orderBy('user_name', 'asc')] : []

	), [searchQuery]);

	const setActiveMessage = useCallback(async (val) => {
		const { channel_type, id } = val || {};
		if (channel_type && id) {
			try {
				const messageDoc = doc(
					firestore,
					`${FIRESTORE_PATH[channel_type]}/${id}`,
				);
				await updateDoc(messageDoc, { new_message_count: 0, has_admin_unread_messages: false });
				setActiveTab((p) => ({ ...p, data: val }));
			} catch (e) {
				Toast.error('Chat Not Found');
			}
		}
	}, [firestore, setActiveTab]);

	const handleScroll = useCallback((e) => {
		const reachBottom = e.target.scrollHeight - (e.target.clientHeight
			+ e.target.scrollTop) <= MAX_DISTANCE_FROM_BOTTOM;

		if (reachBottom && !listData?.isLastPage && !loadingState?.chatsLoading) {
			getPrevChats({ omniChannelCollection, omniChannelQuery, listData, setLoadingState, setListData });
		}
	}, [listData, omniChannelCollection, omniChannelQuery, loadingState?.chatsLoading]);

	const { sortedPinnedChatList, sortedUnpinnedList } = sortChats(listData, userId);

	useEffect(() => {
		debounceQuery(searchValue?.trim()?.toUpperCase());
	}, [debounceQuery, searchValue]);

	useEffect(() => {
		mountPinnedSnapShot({
			setLoadingState,
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
			setLoadingState,
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
		mountFlashChats({
			setLoadingState,
			setFlashMessagesData,
			omniChannelCollection,
			flashMessagesSnapShotListener,
			viewType,
			setCarouselState,
		});
		return () => {
			snapshotCleaner({ ref: flashMessagesSnapShotListener });
		};
	}, [omniChannelCollection, viewType, setCarouselState]);

	return {
		chatsData: {
			messagesList      : sortedUnpinnedList || [],
			unReadChatsCount  : listData?.unReadChatsCount,
			sortedPinnedChatList,
			flashMessagesList : filterAndSortFlashMessages(flashMessagesData) || [],
		},
		setActiveMessage,
		setAppliedFilters,
		appliedFilters,
		handleScroll,
		loadingState,
	};
}

export default useListChats;
