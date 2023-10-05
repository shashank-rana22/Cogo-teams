import { useDebounceQuery } from '@cogoport/forms';
import { useSelector } from '@cogoport/store';
import {
	collection,
	orderBy, query, limit, onSnapshot, where, getDocs,
} from 'firebase/firestore';
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';

import { dataFormatter, pinnedChatsFormatter } from '../helpers/formatTeamsList';
import getTeamsFilterQuery from '../helpers/getTeamsFirestoreQuery';

const LIMIT = 30;
const LAST_ITEM = 1;
const MAX_DISTANCE_FROM_BOTTOM = 150;
const FALLBACK_VALUE = 0;

function sortChats({ messagesListData = {} }) {
	return Object.keys(messagesListData || {}).sort((a, b) => Number(
		messagesListData[b]?.new_message_sent_at,
	) - Number(
		messagesListData[a]?.new_message_sent_at,
	)).map((eachKey) => messagesListData[eachKey]);
}

function fetchTeamsRoomsUnpinned({
	snapshotRef = {},
	activeAgent = '', setLoading = false, roomsCollection = {}, filterQuery = [],
	setListData = () => {}, queryForSearch = '',
}) {
	if (activeAgent) {
		try {
			setListData({
				messagesListData     : {},
				lastMessageTimeStamp : Date.now(),
				isLastPage           : false,
			});
			setLoading((prev) => ({ ...prev, unpinnedLoading: true }));

			const collectionQuery = query(
				roomsCollection,
				...queryForSearch,
				...filterQuery,
				where('is_pinned', '==', false),
				orderBy('new_message_sent_at', 'desc'),
				limit(LIMIT),
			);

			const snapshotRefArg = snapshotRef;

			snapshotRefArg.current.unpinned = onSnapshot(collectionQuery, (roomCollection) => {
				const snapshotSize = roomCollection.size;

				const isLastPage = snapshotSize < LIMIT;

				const lastMessageTimeStamp = roomCollection.docs?.[
					snapshotSize - LAST_ITEM]?.data()?.new_message_sent_at;

				const formattedChats = dataFormatter(roomCollection);

				setListData({
					messagesListData: { ...formattedChats },
					isLastPage,
					lastMessageTimeStamp,
				});

				setLoading((prev) => ({ ...prev, unpinnedLoading: false }));
			});
		} catch (e) {
			console.error('e', e);
		}
	}
}

function fetchTeamsRoomsPinned({
	snapshotRef = {},
	activeAgent = '',
	setLoading = false,
	roomsCollection = {},
	filterQuery = [],
	setPinnedChats = () => {},
	queryForSearch = '',
}) {
	if (!activeAgent) {
		return;
	}

	try {
		setPinnedChats([]);
		setLoading((prev) => ({ ...prev, pinnedLoading: true }));

		const collectionQuery = query(
			roomsCollection,
			...queryForSearch,
			...filterQuery,
			where('is_pinned', '==', true),
			orderBy('message_pinned_at', 'desc'),
		);

		const snapshotRefArg = snapshotRef;

		snapshotRefArg.current.pinned = onSnapshot(collectionQuery, (roomCollection) => {
			const formattedChats = pinnedChatsFormatter(roomCollection);

			setPinnedChats(formattedChats);

			setLoading((prev) => ({ ...prev, pinnedLoading: false }));
		});
	} catch (e) {
		console.error('e', e);
	}
}

async function prevTeamRooms({
	activeAgent = '',
	setLoading = false,
	roomsCollection = {},
	filterQuery = [],
	setListData = () => {},
	listData = {},
}) {
	if (!activeAgent) {
		return;
	}

	try {
		setLoading((prev) => ({ ...prev, unpinnedLoading: true }));

		const collectionQuery = query(
			roomsCollection,
			...filterQuery,
			where('is_pinned', '==', false),
			where(
				'new_message_sent_at',
				'<=',
				Number(listData?.lastMessageTimeStamp),
			),
			orderBy('new_message_sent_at', 'desc'),
			limit(LIMIT),
		);

		const prevChats = await getDocs(collectionQuery);

		const prevChatsSize = prevChats.size;

		const resultList = dataFormatter(prevChats);

		const lastMessageTimeStamp = prevChats?.docs?.[
			(prevChatsSize || FALLBACK_VALUE) - LAST_ITEM]?.data()?.new_message_sent_at;

		const isLastPage = prevChatsSize < LIMIT;

		setListData((prev) => ({
			messagesListData: { ...(prev?.messagesListData || {}), ...resultList },
			isLastPage,
			lastMessageTimeStamp,
		}));
	} catch (e) {
		console.error('e', e);
	} finally {
		setLoading((prev) => ({ ...prev, unpinnedLoading: false }));
	}
}

function useFetchTeamsRoom({ firestore = {}, searchValue = '' }) {
	const loggedInUserId = useSelector(({ profile }) => profile?.user?.id);

	const snapshotRef = useRef({});

	const [listData, setListData] = useState({
		messagesListData     : {},
		lastMessageTimeStamp : Date.now(),
		isLastPage           : false,
	});
	const [pinnedChats, setPinnedChats] = useState([]);
	const [activeAgent, setActiveAgent] = useState(loggedInUserId);
	const [loading, setLoading] = useState(
		{ unpinnedLoading: false, pinnedLoading: false },
	);

	const filterQuery = useMemo(() => getTeamsFilterQuery(), []);
	const { query: searchQuery, debounceQuery } = useDebounceQuery();

	const queryForSearch = useMemo(() => {
		if (!searchQuery) {
			return [];
		}

		return [
			where('search_name', '>=', searchQuery),
			where('search_name', '<=', `${searchQuery}\\uf8ff`),
			orderBy('search_name', 'asc'),
		];
	}, [searchQuery]);

	const roomsCollection = useMemo(() => {
		if (!activeAgent) {
			return {};
		}
		const userCollectionPath = `users/${activeAgent}/groups`;
		return collection(firestore, userCollectionPath);
	}, [activeAgent, firestore]);

	const handleScroll = useCallback((e) => {
		const reachBottom = e.target.scrollHeight - (e.target.clientHeight
			+ e.target.scrollTop) <= MAX_DISTANCE_FROM_BOTTOM;

		if (reachBottom && !listData?.isLastPage && !loading?.unpinnedLoading) {
			prevTeamRooms({ activeAgent, setLoading, roomsCollection, filterQuery, setListData, listData });
		}
	}, [activeAgent, filterQuery, listData, loading?.unpinnedLoading, roomsCollection]);

	const { messagesListData = {} } = listData;

	useEffect(() => {
		setActiveAgent(loggedInUserId);
	}, [loggedInUserId]);

	useEffect(() => {
		debounceQuery(searchValue?.trim()?.toUpperCase());
	}, [debounceQuery, searchValue]);

	useEffect(() => {
		setPinnedChats([]);
		setListData({
			messagesListData     : {},
			lastMessageTimeStamp : Date.now(),
			isLastPage           : false,
		});

		fetchTeamsRoomsUnpinned({
			snapshotRef,
			activeAgent,
			setLoading,
			roomsCollection,
			filterQuery,
			setListData,
			queryForSearch,
		});
		fetchTeamsRoomsPinned({
			snapshotRef,
			activeAgent,
			setLoading,
			roomsCollection,
			filterQuery,
			queryForSearch,
			setPinnedChats,
		});

		const unsubscribeUnpinned = snapshotRef.current?.unpinned;
		const unsubscribePinned = snapshotRef.current?.pinned;

		return () => {
			unsubscribeUnpinned?.();
			unsubscribePinned?.();
		};
	}, [activeAgent, filterQuery, queryForSearch, roomsCollection]);

	return {
		loading       : loading?.unpinnedLoading || loading?.pinnedLoading,
		setActiveAgent,
		activeAgent,
		handleScroll,
		pinnedChats,
		unpinnedChats : sortChats({ messagesListData: messagesListData || {} }),
	};
}

export default useFetchTeamsRoom;
