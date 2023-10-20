import { Toast } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';
import {
	collectionGroup,
	updateDoc,
	doc,
	where, orderBy,
} from 'firebase/firestore';
import { getFunctions, httpsCallable } from 'firebase/functions';
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
const emptyFunction = () => {};

function useListChats({
	firestore = {},
	userId = '',
	isBotSession = false,
	searchValue = '',
	viewType = '',
	activeSubTab = '',
	setActiveTab = emptyFunction,
	setCarouselState = emptyFunction,
	workPrefernceLoading = false,
	listOnlyMails = false,
	activeFolder = '',
	sidFilters = '',
	mailsToBeShown = [],
}) {
	const snapshotListener = useRef(null);
	const pinSnapshotListener = useRef(null);
	const flashMessagesSnapShotListener = useRef(null);
	const searchMessage = useMemo(() => httpsCallable(getFunctions(), 'searchMessage'), []);

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

	const { query: searchQuery, debounceQuery } = useDebounceQuery();

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
			listOnlyMails,
			activeFolder,
			sidFilters,
			mailsToBeShown,
		}),
		[userId, appliedFilters, isBotSession, viewType, activeSubTab, listOnlyMails,
			activeFolder, sidFilters, mailsToBeShown],
	);

	const searchMsg = useCallback(() => {
		searchMessage({ search: searchQuery, filters: appliedFilters, query: omniChannelQuery })
			.then((result) => {
				const { data } = result;
				setListData((prev) => ({
					...prev,
					messagesListData : data,
					isLastPage       : true,
				}));
			}).catch((error) => {
				console.error(error);
			});
	}, [appliedFilters, omniChannelQuery, searchMessage, searchQuery]);

	const queryForSearch = useMemo(() => {
		if (!searchQuery || listOnlyMails) {
			return [];
		}

		return [
			where('user_name', '>=', searchQuery),
			where('user_name', '<=', `${searchQuery}\\uf8ff`),
			orderBy('user_name', 'asc'),
		];
	}, [listOnlyMails, searchQuery]);

	const setActiveMessage = useCallback((val) => {
		const { channel_type, id } = val || {};
		if (channel_type && id) {
			try {
				const messageDoc = doc(
					firestore,
					`${FIRESTORE_PATH[channel_type]}/${id}`,
				);
				updateDoc(messageDoc, { new_message_count: 0, has_admin_unread_messages: false });
				setActiveTab((prev) => ({ ...prev, hasNoFireBaseRoom: false, data: val }));
			} catch (e) {
				Toast.error('Chat Not Found');
			}
		}
	}, [firestore, setActiveTab]);

	const updateLoadingState = useCallback((key) => {
		setLoadingState((prev) => {
			if (prev?.[key]) {
				return { ...prev, [key]: false };
			}
			return prev;
		});
	}, []);

	const handleScroll = useCallback((e) => {
		const reachBottom = e.target.scrollHeight - (e.target.clientHeight
			+ e.target.scrollTop) <= MAX_DISTANCE_FROM_BOTTOM;

		if (reachBottom && !listData?.isLastPage && !loadingState?.chatsLoading) {
			getPrevChats({
				omniChannelCollection,
				omniChannelQuery,
				listData,
				setLoadingState,
				setListData,
				updateLoadingState,
			});
		}
	}, [listData, omniChannelCollection, omniChannelQuery, loadingState?.chatsLoading, updateLoadingState]);

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
			updateLoadingState,
			workPrefernceLoading,
			listOnlyMails,
		});

		return () => {
			snapshotCleaner({ ref: pinSnapshotListener });
		};
	}, [canShowPinnedChats, omniChannelCollection, omniChannelQuery, queryForSearch, userId, viewType, activeSubTab,
		updateLoadingState, workPrefernceLoading, listOnlyMails]);

	useEffect(() => {
		if (!isEmpty(searchQuery) && listOnlyMails) {
			searchMsg();
		} else {
			mountSnapShot({
				setLoadingState,
				setListData,
				snapshotListener,
				omniChannelCollection,
				queryForSearch,
				omniChannelQuery,
				updateLoadingState,
				workPrefernceLoading,
			});
		}

		return () => {
			snapshotCleaner({ ref: snapshotListener });
		};
	}, [searchMsg, omniChannelCollection, omniChannelQuery, searchQuery,
		updateLoadingState, workPrefernceLoading, listOnlyMails, queryForSearch]);

	useEffect(() => {
		mountFlashChats({
			setLoadingState,
			setFlashMessagesData,
			omniChannelCollection,
			flashMessagesSnapShotListener,
			viewType,
			setCarouselState,
			updateLoadingState,
			workPrefernceLoading,
			listOnlyMails,
		});
		return () => {
			snapshotCleaner({ ref: flashMessagesSnapShotListener });
		};
	}, [omniChannelCollection, viewType, setCarouselState, updateLoadingState, workPrefernceLoading, listOnlyMails]);

	return {
		chatsData: {
			messagesList      : sortedUnpinnedList || [],
			unReadChatsCount  : listData?.unReadChatsCount,
			sortedPinnedChatList,
			flashMessagesList : filterAndSortFlashMessages({ flashMessagesData, viewType }) || [],
		},
		setActiveMessage,
		setAppliedFilters,
		appliedFilters,
		handleScroll,
		loadingState,
		searchMsg,
		listData,
	};
}

export default useListChats;
