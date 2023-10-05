function addToGroupPayload({
	userIds = [],
	groupData = {},
}) {
	const payload = {
		users       : userIds,
		group_id    : groupData?.id,
		action_name : 'add_to_group',
		name        : groupData?.search_name,
	};

	return payload;
}

function removeFromGroup({
	groupData = {},
	userIds = [],
}) {
	const payload = {
		users       : userIds,
		group_id    : groupData?.id,
		action_name : 'remove_from_group',

	};

	return payload;
}

function addOwnerToGroup({ userIds = [], groupData = {} }) {
	const payload = {
		users       : userIds,
		group_id    : groupData?.id,
		action_name : 'add_owner_to_group',
	};
	return payload;
}

function removeOwnerToGroup({ userIds = [], groupData = {} }) {
	const payload = {
		users       : userIds,
		group_id    : groupData?.id,
		action_name : 'remove_owner_from_group',
	};
	return payload;
}

function updateGroupName({ groupData = {}, groupName = '' }) {
	const payload = {
		group_id    : groupData?.id,
		action_name : 'update_group_name',
		name        : groupName,
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
		getPayload: removeOwnerToGroup,
	},
	ADD_OWNER_TO_GROUP: {
		getPayload: addOwnerToGroup,
	},
	UPDATE_GROUP_NAME: {
		getPayload: updateGroupName,
	},
};

export default GROUP_PAYLOAD_FUNC_MAPPING;
