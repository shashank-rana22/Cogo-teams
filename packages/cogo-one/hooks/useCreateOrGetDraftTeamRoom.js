import { Toast } from '@cogoport/components';
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
import { useCallback } from 'react';

import { FIRESTORE_PATH } from '../configurations/firebase-config';
import formatNames from '../helpers/getGroupName';

import useHashFunction from './useHashFunction';

const LIMIT = 1;

const GROUP_COUNT_MIN = 1;

async function getExistingGlobalRoom({ firestore = {}, loggedInAgendId, groupMembersHashString = '' }) {
	const internalRoomsCollection = collection(firestore, FIRESTORE_PATH.internal_rooms);

	const collectionQuery = query(
		internalRoomsCollection,
		where('group_members_hash_string', '==', groupMembersHashString),
		orderBy('new_message_sent_at', 'desc'),
		limit(LIMIT),
	);

	const roomDocs = await getDocs(collectionQuery);

	const globalRoomDataDoc = roomDocs?.docs?.[GLOBAL_CONSTANTS.zeroth_index];

	const roomData = globalRoomDataDoc?.data() || {};

	const selfRoomId = roomData?.group_members_rooms?.[loggedInAgendId] || '';

	return {
		group_id : globalRoomDataDoc?.id,
		id       : selfRoomId,
		...roomData,
	};
}

async function getExistingDraftRoom({
	firestore = {},
	loggedInAgendId = '',
	groupMembersHashString = '',
}) {
	const selfInternalRoomsCollection = collection(firestore, `users/${loggedInAgendId}/groups`);

	const collectionQuery = query(
		selfInternalRoomsCollection,
		where('is_draft', '==', true),
		where('group_members_hash_string', '==', groupMembersHashString),
		orderBy('created_at', 'desc'),
		limit(LIMIT),
	);

	const roomDocs = await getDocs(collectionQuery);

	const draftRoomData = roomDocs?.docs?.[GLOBAL_CONSTANTS.zeroth_index];

	return { id: draftRoomData?.id, ...(draftRoomData?.data() || {}) };
}

export async function createDraftRoom({
	userIds = [],
	userIdsData = [],
	firestore = {},
	loggedInAgendId = '',
	length = 0,
	groupName = '',
	groupMembersHashString = '',
	category = 'chat',
}) {
	const selfInternalRoomsCollection = collection(firestore, `users/${loggedInAgendId}/groups`);

	let searchName = groupName;
	const isGroup = length > GROUP_COUNT_MIN;

	if (!isGroup) {
		searchName = userIdsData?.find((member) => member?.id !== loggedInAgendId)?.name || 'user';
	} else {
		searchName = formatNames({ userIdsData });
	}

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
		is_group                  : isGroup,
		search_name               : category === 'meeting' ? groupName?.toUpperCase() : searchName?.toUpperCase(),
		group_members_hash_string : groupMembersHashString,
		category,
	};

	const res = await addDoc(selfInternalRoomsCollection, draftRoomPayload);

	return { id: res?.id, ...draftRoomPayload };
}

function useCreateOrGetDraftTeamRoom({
	firestore = {},
	setActiveTab = () => {},
	setTriggerCreation = () => {},
	setLoadingDraft = () => {},
}) {
	const {
		loggedInAgendId,
		loggedInAgentName,
		loggedInAgentEmail,
		loggedInAgentNumber,
	} = useSelector(({ profile }) => ({
		loggedInAgendId     : profile?.user?.id,
		loggedInAgentName   : profile.user.name,
		loggedInAgentEmail  : profile?.user?.email,
		loggedInAgentNumber : profile?.user?.mobile_number,
		agentData           : {
			id            : profile?.user?.id,
			email         : profile?.user?.email,
			mobile_number : profile?.user?.mobile_number,
			name          : profile?.user?.name,
		},
	}));

	const { hashFunction } = useHashFunction();

	const createOrGetDraftTeamRoom = useCallback(async ({ userIds = [], userIdsData = [] }) => {
		setLoadingDraft(true);

		const setActiveRoom = ({ val = {} }) => {
			setActiveTab((prev) => ({
				...prev,
				data: {
					...(prev?.data || {}),
					...val,
				},
			}));
		};

		const modifiedUserIdsData = [...userIdsData, {
			id         : loggedInAgendId,
			name       : loggedInAgentName,
			is_admin   : true,
			agent_data : {
				id            : loggedInAgendId,
				email         : loggedInAgentEmail,
				mobile_number : loggedInAgentNumber,
				name          : loggedInAgentName,
			},
		}];
		const modifiedUserIds = [loggedInAgendId, ...userIds];
		const groupMembersHashString = await hashFunction({ groupMemberIds: modifiedUserIds });

		try {
			const globalRoomData = await getExistingGlobalRoom(
				{ userIds: modifiedUserIds, firestore, loggedInAgendId, groupMembersHashString },
			);

			if (globalRoomData?.group_id) {
				setActiveRoom({ val: globalRoomData });
				return;
			}

			const draftRoomData = await getExistingDraftRoom(
				{ userIds: modifiedUserIds, firestore, loggedInAgendId, groupMembersHashString },
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
				groupMembersHashString,
				length      : userIds?.length,
			});

			setActiveRoom({ val: res });
		} catch (e) {
			console.error('e', e);
			Toast.error('Something Went Wrong');
		} finally {
			setLoadingDraft(false);
			setTriggerCreation(false);
		}
	}, [
		firestore,
		hashFunction,
		loggedInAgendId,
		loggedInAgentEmail,
		loggedInAgentName,
		loggedInAgentNumber,
		setActiveTab,
		setTriggerCreation,
		setLoadingDraft,
	]);

	return {
		createOrGetDraftTeamRoom,
	};
}

export default useCreateOrGetDraftTeamRoom;
