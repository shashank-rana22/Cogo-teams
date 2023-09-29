import React from 'react';

import useListCogooneGroupMembers from '../../../../../hooks/useListCogooneGroupMembers';

import GroupMemberView from './GroupMemberView';
import SingleMemberView from './SingleMemberView';

function TeamsProfile({ activeMessageCard = {} }) {
	const {
		group_members_data = [], is_group = false, group_id: groupId = '',
		is_draft = false,
	} = activeMessageCard || {};

	const { listData = {} } = useListCogooneGroupMembers({ groupId });
	const { list = [] } = listData || {};

	const groupMembersData = is_draft ? group_members_data : list;

	if (is_group) {
		return <GroupMemberView groupMembersData={groupMembersData} />;
	}

	return <SingleMemberView groupMembersData={groupMembersData} />;
}

export default TeamsProfile;
