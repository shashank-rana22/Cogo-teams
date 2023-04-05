import { useDebounceQuery } from '@cogoport/forms';
import { useRouter } from '@cogoport/next';
import {
	collectionGroup,
	onSnapshot,
	updateDoc,
	doc,
	query,
	limit, where, getDocs, orderBy,
} from 'firebase/firestore';
import { useState, useEffect, useMemo, useRef, useCallback } from 'react';

import { FIRESTORE_PATH } from '../configurations/firebase-config';
import { PAGE_LIMIT } from '../constants';
import getFireStoreQuery from '../helpers/getFireStoreQuery';
import sortChats from '../helpers/sortChats';

const useListChats = ({
	firestore,
	userId,
	isomniChannelAdmin,
	showBotMessages = false,
	searchValue = '',
}) => {
	const { query:searchQuery, debounceQuery } = useDebounceQuery();

	const {
		query: { assigned_chat = '' },
	} = useRouter();

	const snapshotListener = useRef(null);
	const pinSnapshotListener = useRef(null);
	const unreadCountSnapshotListner = useRef(null);
	const activeRoomSnapshotListner = useRef(null);

	const [firstLoading, setFirstLoading] = useState(true);

	const [activeCard, setActiveCard] = useState({
		activeCardId   : '',
		activeCardData : {},
	});

	const [loading, setLoading] = useState(false);
	const [appliedFilters, setAppliedFilters] = useState({});

	const [listData, setListData] = useState({
		messagesListData     : {},
		unReadChatsCount     : 0,
		lastMessageTimeStamp : Date.now(),
		isLastPage           : false,
		pinnedMessagesData   : {},
	});

	const { status = '', observer = '', chat_tags = '' } = appliedFilters || {};

	const canShowPinnedChats = !(observer || chat_tags);

	const snapshotCleaner = ({ ref }) => {
		const tempRef = ref;
		if (tempRef.current) {
			tempRef.current();
			tempRef.current = null;
		}
	};
	useEffect(() => {
		debounceQuery(searchValue?.trim()?.toUpperCase());
	}, [debounceQuery, searchValue]);

	useEffect(() => {
		if (assigned_chat) {
			setActiveCard({ activeCardId: assigned_chat, activeCardData: {} });
		}
		setFirstLoading(false);
	}, [assigned_chat]);

	const dataFormatter = (list) => {
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
	};

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
		}),
		[appliedFilters, isomniChannelAdmin, showBotMessages, userId],
	);

	const queryForSearch = useMemo(() => (
		searchQuery
			? [where('user_name', '>=', searchQuery),
				where('user_name', '<=', `${searchQuery}\\uf8ff`), orderBy('user_name', 'asc')] : []

	), [searchQuery]);

	const queryForSeenByUsers = useMemo(() => {
		if (status === 'seen_by_user') {
			const now = new Date();
			now.setMinutes(now.getMinutes() - 15);
			const epochTimestamp = now.getTime();

			return [
				where('last_message_document.conversation_type', '==', 'received'),
				where('last_message_document.created_at', '<=', epochTimestamp),
				orderBy('last_message_document.created_at', 'desc'),
			];
		}
		return [];
	}, [status]);

	const mountPinnedSnapShot = useCallback(() => {
		setLoading(true);
		snapshotCleaner({ ref: pinSnapshotListener });
		setListData((p) => ({ ...p, pinnedMessagesData: {} }));
		if (canShowPinnedChats) {
			const queryForPinnedChat = where('pinnedAgents', 'array-contains', userId);
			const newChatsQuery = query(
				omniChannelCollection,
				queryForPinnedChat,
				...queryForSeenByUsers,
				...queryForSearch,
				...omniChannelQuery,
			);
			pinSnapshotListener.current = onSnapshot(
				newChatsQuery,
				(pinSnapShot) => {
					const { resultList } = dataFormatter(pinSnapShot);
					setListData((p) => ({ ...p, pinnedMessagesData: { ...resultList } }));
					setLoading(false);
				},
			);
		}
		return () => {
			snapshotCleaner({ ref: pinSnapshotListener });
		};
	}, [omniChannelCollection, omniChannelQuery, userId, queryForSearch, canShowPinnedChats, queryForSeenByUsers]);

	const mountUnreadCountSnapShot = useCallback(() => {
		const queryForUnreadChats = status !== 'unread'
			? [where('new_message_count', '>', 0), orderBy('new_message_count', 'desc')] : [];

		snapshotCleaner({ ref: unreadCountSnapshotListner });

		const countUnreadChatQuery = query(
			omniChannelCollection,
			...queryForUnreadChats,
			...omniChannelQuery,
		);

		unreadCountSnapshotListner.current = onSnapshot(
			countUnreadChatQuery,
			(countUnreadChatSnapshot) => {
				setListData((p) => ({
					...p,
					unReadChatsCount: countUnreadChatSnapshot.size || 0,
				}));
			},
		);

		return () => {
			snapshotCleaner({ ref: unreadCountSnapshotListner });
		};
	}, [omniChannelCollection, omniChannelQuery, status]);

	const mountSnapShot = useCallback(() => {
		setLoading(true);
		setListData((p) => ({ ...p, messagesListData: {} }));
		snapshotCleaner({ ref: snapshotListener });
		const newChatsQuery = query(
			omniChannelCollection,
			...queryForSeenByUsers,
			...queryForSearch,
			...omniChannelQuery,
			limit(PAGE_LIMIT),
		);
		snapshotListener.current = onSnapshot(
			newChatsQuery,
			(querySnapshot) => {
				const isLastPage = querySnapshot.docs.length < PAGE_LIMIT;
				const lastMessageTimeStamp = querySnapshot
					.docs[querySnapshot.docs.length - 1]?.data()?.new_message_sent_at;
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

		return () => {
			snapshotCleaner({ ref: snapshotListener });
		};
	}, [omniChannelCollection, omniChannelQuery, queryForSearch, queryForSeenByUsers]);

	const getPrevChats = useCallback(async () => {
		const prevChatsQuery = query(
			omniChannelCollection,
			...queryForSeenByUsers,
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

		const lastMessageTimeStamp = prevChats[(prevChats.length || 0) - 1]?.data()?.new_message_sent_at;
		const isLastPage = prevChats?.length < PAGE_LIMIT;

		setListData((p) => ({
			...p,
			messagesListData: { ...(p?.messagesListData || {}), ...resultList },
			isLastPage,
			lastMessageTimeStamp,
		}));
		setLoading(false);
	}, [listData?.lastMessageTimeStamp, omniChannelCollection, omniChannelQuery, queryForSeenByUsers]);

	const { activeCardId = '', activeCardData } = activeCard || {};
	const { channel_type:activeChannelType = '' } = activeCardData || {};

	const mountActiveRoomSnapShot = useCallback(() => {
		snapshotCleaner({ ref: activeRoomSnapshotListner });
		if (activeCardId) {
			const activeMessageDoc = doc(
				firestore,
				`${FIRESTORE_PATH[activeChannelType]}/${activeCardId}`,
			);
			activeRoomSnapshotListner.current = onSnapshot(activeMessageDoc, (activeMessageData) => {
				setActiveCard((p) => ({
					...p,
					activeCardId,
					activeCardData:
					{ id: activeMessageDoc?.id, ...(activeMessageData.data() || {}) },
				}));
			});
		}
	}, [firestore, activeCardId, activeChannelType]);

	useEffect(() => {
		mountPinnedSnapShot();
	}, [mountPinnedSnapShot]);

	useEffect(() => {
		mountSnapShot();
	}, [mountSnapShot]);

	useEffect(() => {
		mountUnreadCountSnapShot();
	}, [mountUnreadCountSnapShot]);

	useEffect(() => {
		mountActiveRoomSnapShot();
	}, [mountActiveRoomSnapShot]);

	const setActiveMessage = async (val) => {
		const { channel_type, id } = val || {};
		setActiveCard({ activeCardId: id, activeCardData: val });
		if (channel_type && id) {
			const messageDoc = doc(
				firestore,
				`${FIRESTORE_PATH[channel_type]}/${id}`,
			);
			await updateDoc(messageDoc, { new_message_count: 0 });
		}
	};

	const handleScroll = (e) => {
		const reachBottom = e.target.scrollHeight - (e.target.clientHeight + e.target.scrollTop) <= 150;
		if (reachBottom && !listData?.isLastPage && !loading) {
			getPrevChats();
		}
	};

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

	return {
		chatsData: {
			messagesList     : sortedUnpinnedList || [],
			unReadChatsCount : listData?.unReadChatsCount,
			sortedPinnedChatList,
		},
		setActiveMessage,
		activeMessageCard: activeCardData,
		setAppliedFilters,
		appliedFilters,
		loading,
		activeCardId,
		setActiveCard,
		updateLeaduser,
		firstLoading,
		handleScroll,
	};
};

export default useListChats;
