import { isEmpty } from '@cogoport/utils';
import {
	doc,
	addDoc,
	collection,
	updateDoc,
} from 'firebase/firestore';

import { FIRESTORE_PATH } from '../configurations/firebase-config';

const ONLY_TWO_MEMBERS = 2;

const BEGIN = 0;

function joinNamesWithCount({ modifiedGroupMembers = [] }) {
	if (isEmpty(modifiedGroupMembers)) {
		return '';
	}

	const namesArray = modifiedGroupMembers?.map((eachMember) => eachMember?.name) || [];

	if (modifiedGroupMembers.length === ONLY_TWO_MEMBERS) {
		return namesArray.join(' and ');
	}
	const extraCount = modifiedGroupMembers.length - ONLY_TWO_MEMBERS;

	const firstTwoNames = namesArray.slice(BEGIN, ONLY_TWO_MEMBERS).join(', ');

	return `${firstTwoNames} +${extraCount}`;
}

const createGlobalRoom = async ({ data, firestore = {} }) => {
	const {
		group_members_ids = [],
		group_members_data = [],
		group_members_count = 0,
	} = data || {};

	try {
		const globalRoomsCollection = collection(firestore, FIRESTORE_PATH.internal_rooms);

		const globalRoomPayload = {
			group_members_ids,
			group_members_data,
			group_members_count,
			created_at : Date.now(),
			updated_at : Date.now(),
		};

		const res = await addDoc(globalRoomsCollection, globalRoomPayload);

		return res?.id;
	} catch (e) {
		return '';
	}
};

const createLocalRooms = async ({ groupId = '', searchName, firestore, userId = '', isGroup = false }) => {
	try {
		const localRoomPayload = {
			is_pinned                  : false,
			group_id                   : groupId,
			self_unread_messages_count : 0,
			self_has_unread_messages   : false,
			created_at                 : Date.now(),
			updated_at                 : Date.now(),
			search_name                : searchName,
			is_group                   : isGroup,
			is_draft                   : false,
		};

		const localRoomsCollection = collection(firestore, `/users/${userId}/groups`);

		const res = await addDoc(localRoomsCollection, localRoomPayload);

		return { user_id: userId, internal_group_id: res?.id };
	} catch (e) {
		return { user_id: userId, internal_group_id: '' };
	}
};

const updateSelfUserRoom = async ({ draftRoomId = '', loggedInAgentId = '', groupId = '', firestore = {} }) => {
	try {
		const localRoomUpdatePayload = {
			group_id   : groupId,
			updated_at : Date.now(),
			is_draft   : false,
		};

		const localRoomsCollection = doc(firestore, `/users/${loggedInAgentId}/groups/${draftRoomId}`);

		await updateDoc(localRoomsCollection, localRoomUpdatePayload);
	} catch (e) {
		console.log('e', e);
	}
};

const getOrPublishDraft = async ({
	activeTab = {},
	loggedInAgentId = '',
	firestore = {},
}) => {
	const { data = {} } = activeTab || {};

	const {
		is_draft = false,
		group_id = '',
		group_members_ids = [],
		group_members_data = [],
		group_name = '',
		is_group = false,
		id = '',
	} = data || {};

	try {
		if (!is_draft && group_id) {
			return group_id;
		}

		const groupId = await createGlobalRoom({ data, firestore });
		const modifiedGroupMembersIds = group_members_ids?.filter((eachUserId) => eachUserId !== loggedInAgentId) || [];

		const modifiedGroupMembers = group_members_data?.filter((eachUser) => eachUser?.id !== loggedInAgentId) || [];

		const groupName = is_group ? joinNamesWithCount({ modifiedGroupMembers }) : '';

		const createGroupMemberRoomsPromises = modifiedGroupMembersIds.map((eachId) => {
			let searchName = group_name;

			if (!is_group) {
				searchName = group_members_data?.find((member) => member?.id !== eachId)?.name || 'user';
			} else {
				searchName = groupName;
			}

			return createLocalRooms(
				{ groupId, searchName, firestore, userId: eachId, isGroup: is_group },
			);
		});

		updateSelfUserRoom({ draftRoomId: id, loggedInAgentId, groupId, firestore });

		let roomIds = await Promise.all(createGroupMemberRoomsPromises) || {};

		roomIds = [...roomIds, { user_id: loggedInAgentId, internal_group_id: id }];

		const globalRoomDoc = doc(firestore, `${FIRESTORE_PATH.internal_rooms}/${groupId}`);

		await updateDoc(globalRoomDoc, { group_members_rooms: roomIds });

		return groupId;
	} catch (e) {
		return '';
	}
};

const getCommunicationPayload = ({
	loggedInAgentId = '', groupId = '', activeTab = {}, draftMessage = '',
	// attachments = [],todo
}) => {
	const { data = {}, groupData } = activeTab || {};

	const {
		is_draft = false,
		group_members_ids = [],
	} = data || {};

	const { group_members_ids: publishedGroupMembers = [] } = groupData || {};

	const preferredGroupMembers = is_draft ? group_members_ids : publishedGroupMembers || [];

	const filteredGroupMembers = preferredGroupMembers?.filter((eachId) => eachId !== loggedInAgentId);

	return {
		type              : 'internal_chat',
		source            : 'CogoOne:AdminPlatform',
		conversation_type : 'outward',
		service           : 'user',
		sender_user_id    : loggedInAgentId,
		recipient         : groupId,
		service_id        : loggedInAgentId,
		message_metadata  : {
			message_type : 'text', // todo
			text         : draftMessage,
			user_ids     : filteredGroupMembers,
		},
	};
};

export { getOrPublishDraft, getCommunicationPayload, joinNamesWithCount };
