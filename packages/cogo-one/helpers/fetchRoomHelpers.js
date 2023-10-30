import {
	orderBy, query, limit, onSnapshot, where, getDocs,
} from 'firebase/firestore';

import { dataFormatter, pinnedChatsFormatter } from './formatTeamsList';

const LIMIT = 30;
const LAST_ITEM = 1;
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

export { prevTeamRooms, fetchTeamsRoomsPinned, fetchTeamsRoomsUnpinned, sortChats };
