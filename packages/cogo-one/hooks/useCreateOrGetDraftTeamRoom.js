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
import { useState } from 'react';

import { FIRESTORE_PATH } from '../configurations/firebase-config';
import { hashFunction } from '../helpers/hashFunction';
import { joinNamesWithCount } from '../helpers/sendTeamMessageHelpers';

const LIMIT = 1;

const SELF_COUNT = 1;

const GROUP_COUNT_MIN = 2;

async function getExistingGlobalRoom({ userIds = [], length = 0, firestore = {}, loggedInAgendId }) {
	const internalRoomsCollection = collection(firestore, FIRESTORE_PATH.internal_rooms);

	const groupMembersHashString = hashFunction({ groupMemberIds: userIds });

	const collectionQuery = query(
		internalRoomsCollection,
		where('group_members_count', '==', length),
		where('group_members_hash_string', '==', groupMembersHashString),
		orderBy('new_message_sent_at', 'desc'),
		limit(LIMIT),
	);

	const roomDocs = await getDocs(collectionQuery);

	const globalRoomDataDoc = roomDocs?.docs?.[GLOBAL_CONSTANTS.zeroth_index];

	const roomData = globalRoomDataDoc?.data() || {};

	const selfRoomId = roomData?.group_members_rooms?.find(
		(member) => member?.user_id === loggedInAgendId,
	)?.internal_group_id || '';

	return {
		group_id : globalRoomDataDoc?.id,
		id       : selfRoomId,
		...roomData,
	};
}

async function getExistingDraftRoom({ userIds = [], length = 0, firestore = {}, loggedInAgendId = '' }) {
	const selfInternalRoomsCollection = collection(firestore, `users/${loggedInAgendId}/groups`);

	const groupMembersHashString = hashFunction({ groupMemberIds: userIds });

	const collectionQuery = query(
		selfInternalRoomsCollection,
		where('is_draft', '==', true),
		where('group_members_count', '==', length),
		where('group_members_hash_string', '==', groupMembersHashString),
		orderBy('created_at', 'desc'),
		limit(LIMIT),
	);

	const roomDocs = await getDocs(collectionQuery);

	const draftRoomData = roomDocs?.docs?.[GLOBAL_CONSTANTS.zeroth_index];

	return { id: draftRoomData?.id, ...(draftRoomData?.data() || {}) };
}

async function createDraftRoom({ userIds = [], userIdsData = [], firestore = {}, loggedInAgendId = '', length = 0 }) {
	const selfInternalRoomsCollection = collection(firestore, `users/${loggedInAgendId}/groups`);

	let searchName = '';
	const isGroup = length > GROUP_COUNT_MIN;

	if (!isGroup) {
		searchName = userIdsData?.find((member) => member?.id !== loggedInAgendId)?.name || 'user';
	} else {
		const modifiedGroupMembers = userIdsData?.filter((member) => member?.id !== loggedInAgendId);
		searchName = joinNamesWithCount({ modifiedGroupMembers });
	}
	const groupMembersHashString = hashFunction({ groupMemberIds: userIds });

	const draftRoomPayload = {
		group_members_ids         : userIds,
		created_at                : Date.now(),
		updated_at                : Date.now(),
		is_draft                  : true,
		is_pinned                 : false,
		group_members_data        : userIdsData,
		group_id                  : null,
		new_message_sent_at       : Date.now(),
		self_has_unread_messages  : false,
		group_members_count       : length,
		is_group                  : isGroup,
		search_name               : searchName?.toUpperCase(),
		group_members_hash_string : groupMembersHashString,
	};

	const res = await addDoc(selfInternalRoomsCollection, draftRoomPayload);

	return { id: res?.id, ...draftRoomPayload };
}

function useCreateOrGetDraftTeamRoom({ firestore = {}, setActiveTab = () => {} }) {
	const { loggedInAgendId, loggedInAgentName } = useSelector(({ profile }) => ({
		loggedInAgendId   : profile.user.id,
		loggedInAgentName : profile.user.name,
	}));

	const [loading, setLoading] = useState(false);

	const setActiveRoom = ({ val = {} }) => {
		setActiveTab((prev) => ({
			...prev,
			data: {
				...(prev?.data || {}),
				...val,
			},
		}));
	};

	const createOrGetDraftTeamRoom = async ({ userIds = [], userIdsData = [] }) => {
		const userIdsLength = userIds.length + SELF_COUNT;
		setLoading(true);

		const modifiedUserIdsData = [...userIdsData, { id: loggedInAgendId, name: loggedInAgentName }];
		const modifiedUserIds = [loggedInAgendId, ...userIds];

		try {
			const globalRoomData = await getExistingGlobalRoom(
				{ userIds: modifiedUserIds, length: userIdsLength, firestore, loggedInAgendId },
			);

			if (globalRoomData?.group_id) {
				setActiveRoom({ val: globalRoomData });
				return;
			}

			const draftRoomData = await getExistingDraftRoom(
				{ userIds: modifiedUserIds, length: userIdsLength, firestore, loggedInAgendId },
			);

			if (draftRoomData?.id) {
				setActiveRoom({ val: draftRoomData });
				return;
			}

			const res = await createDraftRoom({
				userIds     : modifiedUserIds,
				userIdsData : modifiedUserIdsData,
				firestore,
				loggedInAgendId,
				length      : userIdsLength,
			});

			setActiveRoom({ val: res });
		} catch (e) {
			console.error('e', e);
		} finally {
			setLoading(false);
		}
	};

	return {
		createOrGetDraftTeamRoom,
		loading,
	};
}

export default useCreateOrGetDraftTeamRoom;
