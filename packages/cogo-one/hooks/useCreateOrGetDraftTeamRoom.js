import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useSelector } from '@cogoport/store';
import {
	collection,
	query,
	limit,
	getDocs,
	where,
	orderBy, addDoc,
} from 'firebase/firestore';

import { FIRESTORE_PATH } from '../configurations/firebase-config';

const LIMIT = 1;

async function getExistingGlobalRoom({ userIds = [], length = 0, firestore = {}, loggedInAgendId = '' }) {
	const internalRoomsCollection = collection(firestore, FIRESTORE_PATH.internal_rooms);

	const collectionQuery = query(
		internalRoomsCollection,
		where('group_members_count', '==', length),
		where('group_member_ids', 'array-contains-any', [...userIds, loggedInAgendId]),
		orderBy('new_message_sent_at', 'desc'),
		limit(LIMIT),
	);

	const roomDocs = await getDocs(collectionQuery);

	return roomDocs?.docs?.[GLOBAL_CONSTANTS.zeroth_index]?.id;
}

async function getExistingDraftRoom({ userIds = [], length = 0, firestore = {}, loggedInAgendId = '' }) {
	const selfInternalRoomsCollection = collection(firestore, `users/${loggedInAgendId}/self_internal_rooms`);

	const collectionQuery = query(
		selfInternalRoomsCollection,
		where('is_draft', '==', true),
		where('group_members_count', '==', length),
		where('group_member_ids', 'array-contains-any', [...userIds, loggedInAgendId]),
		orderBy('created_at', 'desc'),
		limit(LIMIT),
	);
	const roomDocs = await getDocs(collectionQuery);

	return roomDocs?.docs?.[GLOBAL_CONSTANTS.zeroth_index]?.id;
}

async function createDraftRoom({ userIds = [], userIdsData = [], firestore = {}, loggedInAgendId = '' }) {
	const selfInternalRoomsCollection = collection(firestore, `users/${loggedInAgendId}/self_internal_rooms`);

	const draftRoomPayload = {
		group_member_ids         : [...userIds, loggedInAgendId],
		created_at               : Date.now(),
		updated_at               : Date.now(),
		is_draft                 : true,
		is_pinned                : false,
		group_members_Data       : userIdsData,
		room_id                  : null,
		new_message_sent_at      : Date.now(),
		self_has_unread_messages : false,
	};

	const res = await addDoc(selfInternalRoomsCollection, draftRoomPayload);

	return res?.id;
}

function useCreateOrGetDraftTeamRoom({ firestore = {} }) {
	const loggedInAgendId = useSelector(({ profile }) => (profile.user.id));

	const createOrGetDraftTeamRoom = async ({ userIds = [], userIdsData = [] }) => {
		const userIdsLength = userIds.length;

		const globalRoomId = await getExistingGlobalRoom(
			{ userIds, length: userIdsLength, firestore, loggedInAgendId },
		);

		if (globalRoomId) {
			return globalRoomId;
		}

		const draftRoomId = await getExistingDraftRoom(
			{ userIds, length: userIdsLength, firestore, loggedInAgendId },
		);

		if (draftRoomId) {
			return draftRoomId;
		}

		return createDraftRoom({ userIds, userIdsData, firestore, loggedInAgendId });
	};

	return {
		createOrGetDraftTeamRoom,
	};
}

export default useCreateOrGetDraftTeamRoom;
