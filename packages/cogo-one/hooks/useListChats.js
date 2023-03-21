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

	const [firstLoading, setFirstLoading] = useState(true);
	const [activeCardId, setActiveCardId] = useState('');
	const [loading, setLoading] = useState(false);
	const [appliedFilters, setAppliedFilters] = useState({});

	const [listData, setListData] = useState({
		messagesListData     : {},
		unReadChatsCount     : 0,
		lastMessageTimeStamp : Date.now(),
		isLastPage           : false,
	});

	const snapshotCleaner = () => {
		if (snapshotListener.current) {
			snapshotListener.current();
			snapshotListener.current = null;
		}
	};
	useEffect(() => {
		debounceQuery(searchValue?.toUpperCase());
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

	const mountSnapShot = useCallback(() => {
		const queryForSearch = searchQuery
			? [where('user_name', '>=', searchQuery),
				where('user_name', '<=', `${searchQuery}\\uf8ff`), orderBy('user_name', 'asc')] : [];

		setLoading(true);
		setListData({});
		snapshotCleaner();
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
				setListData({
					messagesListData: { ...resultList },
					unReadChatsCount,
					isLastPage,
					lastMessageTimeStamp,
				});
				setLoading(false);
			},
		);

		return () => {
			snapshotCleaner();
		};
	}, [omniChannelCollection, omniChannelQuery, searchQuery]);

	const getPrevChats = useCallback(async () => {
		const prevChatsQuery = query(
			omniChannelCollection,
			...omniChannelQuery,
			where(
				'new_message_sent_at',
				'<',
				Number(listData?.lastMessageTimeStamp),
			),
			limit(PAGE_LIMIT),
		);
		setLoading(true);

		const prevChatsPromise = await getDocs(prevChatsQuery);
		const prevChats = prevChatsPromise?.docs;

		const { resultList = {} } = dataFormatter(prevChats);

		const lastMessageTimeStamp = prevChats[(prevChats.length || 0) - 1]?.data()?.created_at;
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
		mountSnapShot();
	}, [mountSnapShot]);

	const setActiveMessage = async (val) => {
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

	const { messagesListData = {}, unReadChatsCount } = listData || {};

	const sortedChatsList = Object.keys(messagesListData || {})
		.sort((a, b) => Number(
			messagesListData[b]?.new_message_sent_at,
		) - Number(
			messagesListData[a]?.new_message_sent_at,
		))
		.map((eachkey) => messagesListData[eachkey]) || [];

	const activeMessageCard = (sortedChatsList || []).find(({ id }) => id === activeCardId)
        || {};

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
	};
};

export default useListChats;
