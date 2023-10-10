import { Avatar } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';

import { getformattedGroupData } from '../../../../helpers/teamsProfileDataHelper';

import GroupMemberView from './GroupMemberView';
import SingleMemberView from './SingleMemberView';
import styles from './styles.module.css';

function TeamsProfile({
	membersList = [],
	chatsConfig = {},
	userId :loggedInAgentId = '',
	groupMembersLoading = false,
	userName = '',
}) {
	const { data = {} } = chatsConfig || {};
	const { group_members_data = [], is_group = false, is_draft = false } = data || {};

	const membersArray = getformattedGroupData({
		groupMembersData : group_members_data,
		isDraft          : is_draft,
		membersList,
	});

	const loggedInAgentData = membersArray?.find((obj) => obj.id === loggedInAgentId) || {};

	const otherPerson = membersArray?.find((obj) => obj.id !== loggedInAgentId) || {};

	if (groupMembersLoading) {
		return (
			<div className={styles.loader_div}>
				<Image
					src={GLOBAL_CONSTANTS.image_url.cogo_one_loader}
					alt="alarm"
					width={100}
					height={100}
				/>
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<div className={styles.name_container}>
				<Avatar
					personName={loggedInAgentData?.name || userName}
					alt="name"
					size="38px"
					className={styles.styled_avatar}
				/>
			</div>
			<div className={styles.list_users}>
				{
					is_group ? (
						<GroupMemberView
							restData={membersArray}
							isDraft={is_draft}
						/>
					) : (
						<SingleMemberView
							userData={otherPerson}
							isDraft={is_draft}
						/>
					)
				}
			</div>
		</div>
	);
}

export default TeamsProfile;
