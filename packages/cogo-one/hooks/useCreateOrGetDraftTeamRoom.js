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

const LIMIT = 1;

const SELF_COUNT = 1;

async function getExistingGlobalRoom({ userIds = [], length = 0, firestore = {}, loggedInAgendId }) {
	const internalRoomsCollection = collection(firestore, FIRESTORE_PATH.internal_rooms);

	const collectionQuery = query(
		internalRoomsCollection,
		where('group_members_count', '==', length),
		where('group_member_ids', 'array-contains-any', userIds),
		orderBy('new_message_sent_at', 'desc'),
		limit(LIMIT),
	);

	const roomDocs = await getDocs(collectionQuery);

	const globalRoomDataDoc = roomDocs?.docs?.[GLOBAL_CONSTANTS.zeroth_index];

	const roomData = globalRoomDataDoc?.data() || {};

	return {
		group_id : globalRoomDataDoc?.id,
		id       : roomData?.group_member_rooms?.[loggedInAgendId] || '',
		...roomData,
	};
}

async function getExistingDraftRoom({ userIds = [], length = 0, firestore = {}, loggedInAgendId = '' }) {
	const selfInternalRoomsCollection = collection(firestore, `users/${loggedInAgendId}/groups`);

	const collectionQuery = query(
		selfInternalRoomsCollection,
		where('is_draft', '==', true),
		where('group_members_count', '==', length),
		where('group_member_ids', 'array-contains-any', userIds),
		orderBy('created_at', 'desc'),
		limit(LIMIT),
	);

	const roomDocs = await getDocs(collectionQuery);

	const draftRoomData = roomDocs?.docs?.[GLOBAL_CONSTANTS.zeroth_index];

	return { id: draftRoomData?.id, ...(draftRoomData?.data() || {}) };
}

async function createDraftRoom({ userIds = [], userIdsData = [], firestore = {}, loggedInAgendId = '', length = 0 }) {
	const selfInternalRoomsCollection = collection(firestore, `users/${loggedInAgendId}/groups`);

	const draftRoomPayload = {
		group_member_ids         : userIds,
		created_at               : Date.now(),
		updated_at               : Date.now(),
		is_draft                 : true,
		is_pinned                : false,
		group_members_data       : userIdsData,
		group_id                 : null,
		new_message_sent_at      : Date.now(),
		self_has_unread_messages : false,
		group_members_count      : length,
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
		console.log('userIds', userIds, userIdsData);
		const userIdsLength = userIds.length + SELF_COUNT;
		setLoading(true);

		const modifiedUserIdsData = [...userIdsData, { id: loggedInAgendId, name: loggedInAgentName }];
		const modifiedUserIds = [loggedInAgendId, ...userIds];
		console.log('modifiedUserIds', modifiedUserIds);

		try {
			const globalRoomData = await getExistingGlobalRoom(
				{ userIds: modifiedUserIds, length: userIdsLength, firestore, loggedInAgendId },
			);

			if (globalRoomData?.id) {
				setActiveRoom({ val: globalRoomData });
				return;
			}

			const draftRoomData = await getExistingDraftRoom(
				{ userIds: modifiedUserIds, length: userIdsLength, firestore, loggedInAgendId },
			);

			if (draftRoomData?.id) {
				console.log('draftRoomData', draftRoomData);
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
			console.log('res', res);
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
