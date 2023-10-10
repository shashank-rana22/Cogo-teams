import { useDebounceQuery } from '@cogoport/forms';
import { useSelector } from '@cogoport/store';
import {
	collection,
	orderBy, where,
} from 'firebase/firestore';
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';

import { prevTeamRooms, fetchTeamsRoomsPinned, fetchTeamsRoomsUnpinned, sortChats } from '../helpers/fetchRoomHelpers';
import getTeamsFilterQuery from '../helpers/getTeamsFirestoreQuery';

const MAX_DISTANCE_FROM_BOTTOM = 150;

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
