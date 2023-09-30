function addToGroupPayload({
	userIds = [],
	groupData = {},
}) {
	const metadata = {
		data: [{
			action_name  : 'add_members_in_group',
			add_user_ids : userIds,
		}],
	};

	const payload = {
		users       : userIds,
		group_id    : groupData?.id,
		action_name : 'add_to_group',
		metadata,
	};

	return payload;
}

function removeFromGroup({
	groupData = {},
	userIds = [],
}) {
	const { group_members_rooms = [], id = '' } = groupData || {};

	const userRoomMappings = group_members_rooms?.filter?.((
		eachPerson,
	) => userIds?.includes(eachPerson?.user_id))?.map((eachroom) => ({
		user_id : eachroom?.user_id,
		room_id : eachroom?.internal_group_id,
	}));

	const metadata = {
		data: [{
			action_name        : 'remove_members_in_group',
			user_room_mappings : userRoomMappings,
		}],
	};

	const payload = {
		users       : userIds,
		group_id    : id,
		action_name : 'remove_from_group',
		metadata,
	};

	return payload;
}

function addOwnerToGroup({ userIds = [], groupData = {} }) {
	const metadata = {
		data: [{
			action_name : 'set_global_room',
			payload     : { last_group_updated_at: Date.now() },
		}],
	};
	const payload = {
		users       : userIds,
		group_id    : groupData?.id,
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
		getPayload: removeOwnerToGroup, // todo
	},
	ADD_OWNER_TO_GROUP: {
		getPayload: addOwnerToGroup, // todo
	},
	UPDATE_GROUP_NAME: {
		getPayload: updateGroupName, // todo
	},
};

export default GROUP_PAYLOAD_FUNC_MAPPING;
