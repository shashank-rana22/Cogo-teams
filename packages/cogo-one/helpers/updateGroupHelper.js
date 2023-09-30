function addToGroupPayload({
	userIds = [],
	groupId = '',
}) {
	const metadata = {
		data: [{
			action_name : 'add_members_in_group',
			payload     : { add_user_ids: userIds },
		}],
	};

	const payload = {
		users       : userIds,
		group_id    : groupId,
		action_name : 'add_to_group',
		metadata,
	};

	return payload;
}

function removeFromGroup({
	groupMemberRooms = [],
	groupId = '',
	userIds = [],
}) {
	const userRoomMappings = groupMemberRooms?.map((eachroom) => ({
		user_id : eachroom?.userId,
		room_id : eachroom?.internal_group_id,
	}));

	const metadata = {
		data: [{
			action_name : 'add_members_in_group',
			payload     : { user_room_mappings: userRoomMappings },
		}],
	};

	const payload = {
		users       : userIds,
		group_id    : groupId,
		action_name : 'remove_from_group',
		metadata,
	};

	return payload;
}

function addOwnerToGroup({ userIds = [], groupId = '' }) {
	const metadata = {
		data: [{
			action_name : 'set_global_room',
			payload     : { last_group_updated_at: Date.now() },
		}],
	};
	const payload = {
		users       : userIds,
		group_id    : groupId,
		action_name : 'add_owner_to_group',
		metadata,
	};
	return payload;
}

function removeOwnerToGroup({ userIds = [], groupId = '' }) {
	const metadata = {
		data: [{
			action_name : 'set_global_room',
			payload     : { last_group_updated_at: Date.now() },
		}],
	};
	const payload = {
		users       : userIds,
		group_id    : groupId,
		action_name : 'remove_owner_from_group',
		metadata,
	};
	return payload;
}

function updateGroupName({ groupId = '', groupName = '', groupMemberRooms = [] }) {
	const userRoomMappings = groupMemberRooms?.map((eachroom) => ({
		user_id : eachroom?.userId,
		room_id : eachroom?.internal_group_id,
	}));

	const metadata = {
		data: [{
			action_name : 'set_global_room',
			payload     : { search_name: groupName },
		},
		{
			action_name        : 'set_bulk_local_room',
			user_room_mappings : userRoomMappings,
			payload            : {
				search_name : groupName,
				updated_at  : Date.now(),
			},
		},
		],
	};

	const payload = {
		name        : groupName,
		group_id    : groupId,
		action_name : 'update_group_name',
		metadata,
	};
	return payload;
}

const GROUP_PAYLOAD_FUNC_MAPPING = {
	ADD_TO_GROUP: {
		getPayload: addToGroupPayload,
	},

	REMOVE_FROM_GROUP: {
		getPayload: removeFromGroup,
	},
	REMOVE_OWNER_FROM_GROUP: {
		name       : 'remove_owner_from_group',
		getPayload : removeOwnerToGroup,
	},
	ADD_OWNER_TO_GROUP: {
		name       : 'add_owner_to_group',
		getPayload : addOwnerToGroup,
	},
	UPDATE_GROUP_NAME: {
		name       : 'update_group_name',
		getPayload : updateGroupName,
	},
};

export default GROUP_PAYLOAD_FUNC_MAPPING;
