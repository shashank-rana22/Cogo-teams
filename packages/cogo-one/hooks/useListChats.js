import { Toast } from '@cogoport/components';
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
	viewType = '',
	setShowFeedback = () => {},
}) => {
	const { query:searchQuery, debounceQuery } = useDebounceQuery();

	const {
		query: { assigned_chat = '', channel_type:queryChannelType = '', type = '' },
	} = useRouter();

	const snapshotListener = useRef(null);
	const pinSnapshotListener = useRef(null);
	const unreadCountSnapshotListner = useRef(null);
	const activeRoomSnapshotListner = useRef(null);

	const [firstMount, setFirstMount] = useState(false);

	const [activeCard, setActiveCard] = useState({
		activeCardId   : '',
		activeCardData : {},
	});

	const [loading, setLoading] = useState(false);
	const [activeRoomLoading, setActiveRoomLoading] = useState(false);
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
		if (assigned_chat && queryChannelType && firstMount) {
			setActiveCard({ activeCardId: assigned_chat, activeCardData: { channel_type: queryChannelType } });
		}
	}, [assigned_chat, firstMount, queryChannelType]);

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
		}),
		[appliedFilters, isomniChannelAdmin, showBotMessages, userId, viewType],
	);

	const queryForSearch = useMemo(() => (
		searchQuery
			? [where('user_name', '>=', searchQuery),
				where('user_name', '<=', `${searchQuery}\\uf8ff`), orderBy('user_name', 'asc')] : []

	), [searchQuery]);

	const mountPinnedSnapShot = useCallback(() => {
		setLoading(true);
		snapshotCleaner({ ref: pinSnapshotListener });
		setListData((p) => ({ ...p, pinnedMessagesData: {} }));
		if (canShowPinnedChats) {
			const queryForPinnedChat = where('pinnedAgents', 'array-contains', userId);
			const newChatsQuery = query(
				omniChannelCollection,
				queryForPinnedChat,
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
	}, [omniChannelCollection, omniChannelQuery, userId, queryForSearch, canShowPinnedChats]);

	const mountUnreadCountSnapShot = useCallback(() => {
		const queryForUnreadChats = status !== 'unread'
			? [where('has_admin_unread_messages', '==', true)] : [];

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
	}, [omniChannelCollection, omniChannelQuery, queryForSearch]);

	const getPrevChats = useCallback(async () => {
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

		const lastMessageTimeStamp = prevChats[(prevChats.length || 0) - 1]?.data()?.new_message_sent_at;
		const isLastPage = prevChats?.length < PAGE_LIMIT;

		setListData((p) => ({
			...p,
			messagesListData: { ...(p?.messagesListData || {}), ...resultList },
			isLastPage,
			lastMessageTimeStamp,
		}));
		setLoading(false);
	}, [listData?.lastMessageTimeStamp, omniChannelCollection, omniChannelQuery]);

	const { activeCardId = '', activeCardData } = activeCard || {};
	const { channel_type:activeChannelType = '' } = activeCardData || {};

	const mountActiveRoomSnapShot = useCallback(() => {
		setActiveRoomLoading(true);
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
			setActiveRoomLoading(false);
		}
	}, [firestore, activeCardId, activeChannelType]);

	useEffect(() => {
		if (viewType !== 'shipment_view') {
			mountPinnedSnapShot();
		}
	}, [mountPinnedSnapShot, viewType]);

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

	const getAssignedChats = useCallback(async () => {
		const assignedChatsQuery = query(
			omniChannelCollection,
			where('session_type', '==', 'admin'),
			where('support_agent_id', '==', userId),
		);
		const getAssignedChatsQuery = await getDocs(assignedChatsQuery);
		return getAssignedChatsQuery.size || 0;
	}, [omniChannelCollection, userId]);
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
		setFirstMount,
		handleScroll,
		activeRoomLoading,
		getAssignedChats,
	};
};

export default useListChats;
