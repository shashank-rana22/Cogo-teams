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
		getPayload: () => {}, // todo
	},
};

export default GROUP_PAYLOAD_FUNC_MAPPING;
