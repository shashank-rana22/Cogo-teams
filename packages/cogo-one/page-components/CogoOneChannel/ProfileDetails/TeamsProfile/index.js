import GroupMemberView from './GroupMemberView';
import SingleMemberView from './SingleMemberView';

function TeamsProfile({ activeMessageCard = {}, membersList = [] }) {
	console.log('activeMessageCard', activeMessageCard);
	const { group_members_data = [], is_group = false, is_draft = false } = activeMessageCard || {};

	const groupMembersData = is_draft ? group_members_data : membersList;

	if (is_group) {
		return <GroupMemberView groupMembersData={groupMembersData} />;
	}

	return <SingleMemberView groupMembersData={groupMembersData} />;
}

export default TeamsProfile;
