import { v1 as uuid } from 'uuid';

const getCreateGlobalRoomPayload = ({ data = {}, groupMemberRooms = [] }) => {
	const {
		group_members_ids = [],
		group_members_count = 0,
		group_members_hash_string = '',
	} = data || {};

	const payload = {
		group_members_ids,
		group_members_count,
		created_at          : Date.now(),
		updated_at          : Date.now(),
		group_members_hash_string,
		group_members_rooms : groupMemberRooms,
	};

	return {
		action_name: 'set_global_room',
		payload,
	};
};

const createLocalNonGroupRoom = ({
	searchName,
	userId = '',
	isGroup = false,
	groupMemberRooms = [],
}) => {
	const payload = {
		is_pinned                  : false,
		self_unread_messages_count : 0,
		self_has_unread_messages   : false,
		created_at                 : Date.now(),
		updated_at                 : Date.now(),
		search_name                : searchName,
		is_group                   : isGroup,
		is_draft                   : false,
	};

	const generatedRoomId = uuid();
	groupMemberRooms.push({ user_id: userId, internal_group_id: generatedRoomId });

	return {
		action_name         : 'set_local_room',
		user_id             : userId,
		room_id             : generatedRoomId,
		payload,
		is_update_global_id : true,
	};
};

const createLocalGroupRooms = ({
	groupName = '',
	userIds = [],
	isGroup = false,
	groupMemberRooms = [],
}) => {
	const payload = {
		is_pinned                  : false,
		self_unread_messages_count : 0,
		self_has_unread_messages   : false,
		created_at                 : Date.now(),
		updated_at                 : Date.now(),
		search_name                : groupName?.toUpperCase(),
		is_group                   : isGroup,
		is_draft                   : false,
	};

	const userRoomMappings = userIds?.map(
		(eachId) => {
			const generatedRoomId = uuid();
			groupMemberRooms.push({ user_id: eachId, internal_group_id: generatedRoomId });

			return {
				user_id : eachId,
				room_id : generatedRoomId,
			};
		},
	);

	return {
		action_name         : 'set_bulk_local_room',
		user_room_mappings  : userRoomMappings,
		payload,
		is_update_global_id : true,
	};
};

const updateSelfUserRoom = ({
	draftRoomId = '',
	loggedInAgentId = '',
}) => {
	const payload = {
		updated_at : Date.now(),
		is_draft   : false,
	};

	return {
		action_name         : 'set_local_room',
		user_id             : loggedInAgentId,
		room_id             : draftRoomId,
		payload,
		is_update_global_id : true,
	};
};

export { updateSelfUserRoom, createLocalGroupRooms, getCreateGlobalRoomPayload, createLocalNonGroupRoom };
