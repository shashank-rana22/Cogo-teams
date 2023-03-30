import { useDebounceQuery } from '@cogoport/forms';
import { useRouter } from '@cogoport/next';
import {
	collectionGroup,
	onSnapshot,
	updateDoc,
	getDoc,
	doc,
	query,
	limit, where, getDocs, orderBy,
} from 'firebase/firestore';
import { useState, useEffect, useMemo, useRef, useCallback } from 'react';

import { FIRESTORE_PATH } from '../configurations/firebase-config';
import { PAGE_LIMIT } from '../constants';
import getFireStoreQuery from '../helpers/getFireStoreQuery';

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
	// const activeCardSnapshotListener = useRef(null);

	const [firstLoading, setFirstLoading] = useState(true);
	const [activeCardId, setActiveCardId] = useState('');
	const [activeCardData, setActiveCardData] = useState('');
	const [loading, setLoading] = useState(false);
	const [appliedFilters, setAppliedFilters] = useState({});

	const [listData, setListData] = useState({
		messagesListData     : {},
		unReadChatsCount     : 0,
		lastMessageTimeStamp : Date.now(),
		isLastPage           : false,
		pinnedMessagesData   : {},
	});

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
			setActiveCardId(assigned_chat);
		}
		setFirstLoading(false);
	}, [assigned_chat]);

	const dataFormatter = (list) => {
		let unReadChatsCount = 0;
		let resultList = {};
		list?.forEach((item) => {
			const { created_at, updated_at, new_message_count, ...rest } = item.data() || {};
			const userData = {
				id         : item?.id,
				created_at : item.data().created_at || Date.now(),
				new_message_count,
				...rest,
			};
			unReadChatsCount += (new_message_count || 0) > 0 ? 1 : 0;
			resultList = { ...resultList, [item?.id]: userData };
		});

		return {
			unReadChatsCount,
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

	const mountPinnedSnapShot = useCallback(async () => {
		setLoading(true);
		snapshotCleaner({ ref: pinSnapshotListener });
		setListData((p) => ({ ...p, pinnedMessagesData: {} }));
		const queryForPinnedChat = where('pinnedAgent', 'array-contains', userId);

		const newChatsQuery = query(
			omniChannelCollection,
			queryForPinnedChat,
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
		return () => {
			snapshotCleaner({ ref: pinSnapshotListener });
		};
	}, [omniChannelCollection, omniChannelQuery, userId]);

	const mountUnreadSnapShot = useCallback(() => {
		const queryForUnreadChats = where('new_message_count', '>', 0);

		snapshotCleaner({ ref: unreadCountSnapshotListner });
		const countUnreadChatQuery = query(
			omniChannelCollection,
			queryForUnreadChats,
			orderBy('new_message_count', 'desc'),
			...omniChannelQuery,
		);
		// console.log('countUnreadChatQuery:', countUnreadChatQuery);

		unreadCountSnapshotListner.current = onSnapshot(
			countUnreadChatQuery,
			(countUnreadChatSnapshot) => {
				const unReadChatsCount = countUnreadChatSnapshot.size;
				setListData((p) => ({
					...p,
					unReadChatsCount,
				}));
			},
		);
		return () => {
			snapshotCleaner({ ref: unreadCountSnapshotListner });
		};
	}, [omniChannelCollection, omniChannelQuery]);
	const mountSnapShot = useCallback(() => {
		const queryForSearch = searchQuery
			? [where('user_name', '>=', searchQuery),
				where('user_name', '<=', `${searchQuery}\\uf8ff`), orderBy('user_name', 'asc')] : [];
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
				const { unReadChatsCount, resultList } = dataFormatter(querySnapshot);
				setListData((p) => ({
					...p,
					messagesListData: { ...resultList },
					unReadChatsCount,
					isLastPage,
					lastMessageTimeStamp,
				}));
				setLoading(false);
			},
		);

		return () => {
			snapshotCleaner({ ref: snapshotListener });
		};
	}, [omniChannelCollection, omniChannelQuery, searchQuery]);

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

	useEffect(() => {
		mountPinnedSnapShot();
	}, [mountPinnedSnapShot]);

	useEffect(() => {
		mountSnapShot();
	}, [mountSnapShot]);

	useEffect(() => {
		mountUnreadSnapShot();
	}, [mountUnreadSnapShot]);
	// mountUnreadSnapShot();

	const setActiveMessage = async (val) => {
		setActiveCardData(val);
		const { channel_type, id } = val || {};
		setActiveCardId(id);
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

	const { messagesListData = {}, unReadChatsCount, pinnedMessagesData } = listData || {};

	const mergedChatData = { ...messagesListData, ...pinnedMessagesData } || {};

	const sortedChatsList = Object.keys(mergedChatData || {})
		.sort((a, b) => {
			if (mergedChatData[a].pin && mergedChatData[a].pin[userId] > 0) {
				if (mergedChatData[b].pin && mergedChatData[b].pin[userId] > 0) {
					return Number(
						mergedChatData[b].pin[userId],
					) - Number(
						mergedChatData[a].pin[userId],
					);
				}
				return -1;
			}
			if (mergedChatData[b].pin && mergedChatData[b].pin[userId] > 0) {
				return 1;
			}

			return Number(
				mergedChatData[b]?.new_message_sent_at,
			) - Number(
				mergedChatData[a]?.new_message_sent_at,
			);
		})
		.map((eachkey) => mergedChatData[eachkey]) || [];

	const activeMessageCard = (sortedChatsList || []).find(({ id }) => id === activeCardId)
        || activeCardData || {};

	const updateLeaduser = async (data = {}) => {
		const { channel_type, id } = activeMessageCard || {};
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

	const updatePin = async (pinnedID, channel_type, type) => {
		const roomCollection = doc(
			firestore,
			`${FIRESTORE_PATH[channel_type]}/${pinnedID}`,
		);

		const document = await getDoc(roomCollection);
		const { pin = {}, pinnedAgent = [] } = document.data() || {};

		try {
			await updateDoc(roomCollection, {
				updated_at  : Date.now(),
				pin         : { ...pin, [userId]: type === 'pin' ? Date.now() : 0 },
				pinnedAgent : type === 'pin'
					? [...pinnedAgent, userId]
					: pinnedAgent.filter((pinned) => pinned !== userId),
			});
		} catch (error) {
			// console.log(error);
		}
	};
	return {
		listData: { messagesList: sortedChatsList || [], unReadChatsCount },
		setActiveMessage,
		activeMessageCard,
		setAppliedFilters,
		appliedFilters,
		loading,
		activeCardId,
		setActiveCardId,
		updateLeaduser,
		firstLoading,
		handleScroll,
		updatePin,
	};
};

export default useListChats;
