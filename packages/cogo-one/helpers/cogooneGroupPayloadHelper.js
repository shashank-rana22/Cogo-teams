import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import {
	updateSelfUserRoom,
	createLocalGroupRooms,
	getCreateGlobalRoomPayload,
	createLocalNonGroupRoom,
} from './cogoOneGroupHelpers';

const getPublishRoomPayload = ({
	activeTab = {},
	loggedInAgentId = '',
}) => {
	const PAYLOAD_DATA = [];

	const { data = {} } = activeTab || {};

	const {
		group_members_ids = [],
		group_members_data = [],
		search_name = '',
		is_group = false,
		id = '',
	} = data || {};

	const groupMemberRooms = [{ user_id: loggedInAgentId, internal_group_id: id }];

	const modifiedGroupMembersIds = group_members_ids?.filter(
		(eachUserId) => eachUserId !== loggedInAgentId,
	) || [];

	let createLocalRoomPayload = {};

	if (is_group) {
		createLocalRoomPayload = createLocalGroupRooms({
			groupName : search_name,
			userIds   : modifiedGroupMembersIds,
			isGroup   : is_group,
			groupMemberRooms,
		});
	} else {
		createLocalRoomPayload = createLocalNonGroupRoom(
			{
				searchName: group_members_data?.find(
					(member) => member?.id === loggedInAgentId,
				)?.name?.toUpperCase() || 'User',
				userId  : modifiedGroupMembersIds?.[GLOBAL_CONSTANTS.zeroth_index],
				isGroup : is_group,
				groupMemberRooms,
			},
		);
	}

	const selfLocalRoomUpdatePayload = updateSelfUserRoom({
		draftRoomId: id,
		loggedInAgentId,
	});

	const createGlobalRoomPayload = getCreateGlobalRoomPayload({ data, groupMemberRooms });

	PAYLOAD_DATA.push(createGlobalRoomPayload);
	PAYLOAD_DATA.push(createLocalRoomPayload);
	PAYLOAD_DATA.push(selfLocalRoomUpdatePayload);

	return PAYLOAD_DATA;
};

export { getPublishRoomPayload };
