import GroupMemberView from './GroupMemberView';
import SingleMemberView from './SingleMemberView';

function TeamsProfile({
	membersList = [],
	chatsConfig = {},
}) {
	const { data = {} } = chatsConfig || {};
	const { group_members_data = [], is_group = false, is_draft = false } = data || {};

	const groupMembersData = is_draft ? group_members_data : membersList;

	if (is_group) {
		return <GroupMemberView groupMembersData={groupMembersData} isDraft={is_draft} />;
	}

	return <SingleMemberView groupMembersData={groupMembersData} isDraft={is_draft} />;
}

export default TeamsProfile;
