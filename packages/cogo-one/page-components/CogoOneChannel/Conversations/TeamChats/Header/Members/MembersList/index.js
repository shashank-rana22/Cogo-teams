import { Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMCrossInCircle } from '@cogoport/icons-react';
import { Image } from '@cogoport/next';

import List from './List';
import styles from './styles.module.css';

function MembersList({
	membersList = [],
	setAddMembers = () => {},
	activeTeamCard = {},
	updateCogooneGroup = () => {},
	hasPermissionToEdit = false,
	loggedInUserId = '',
	loading = false,
	updateDraftLocalCogooneGroup = () => {},
	loggedInAgentId = '',
}) {
	const { is_draft = false, group_members_data = [] } = activeTeamCard || {};

	const modifiedMembersList = is_draft ? group_members_data : membersList;

	const isAgentAdmin = is_draft ? true : membersList?.find(
		(eachPerson) => eachPerson?.user_id === loggedInAgentId,
	)?.access_type === 'owner';

	const updateGroup = ({ userId = '', actionName = '' }) => {
		if (is_draft) {
			updateDraftLocalCogooneGroup(
				{
					actionName,
					userIds: [userId],
				},
			);
			return;
		}

		updateCogooneGroup({
			actionName,
			userIds: [userId],
		});
	};

	return (
		<>
			<List
				membersList={modifiedMembersList}
				isDraft={is_draft}
				hasPermissionToEdit={hasPermissionToEdit}
				loading={loading}
				updateGroup={updateGroup}
				loggedInAgentId={loggedInAgentId}
				isAgentAdmin={isAgentAdmin}
			/>
			{hasPermissionToEdit ? 	(
				<div className={styles.footer_buttons}>
					{isAgentAdmin ? (
						<Button
							size="md"
							themeType="tertiary"
							className={styles.button_styles}
							onClick={() => setAddMembers(true)}
							disabled={loading}
						>
							<Image
								src={GLOBAL_CONSTANTS.image_url.groups}
								alt="group"
								width={22}
								height={20}
								className={styles.image_styles}
							/>
							<div className={styles.button_text}>Add People</div>
						</Button>
					) : null}
					{!is_draft ? (
						<Button
							size="md"
							themeType="tertiary"
							className={styles.button_styles}
							onClick={() => updateGroup({ userId: loggedInUserId, actionName: 'REMOVE_FROM_GROUP' })}
							disabled={loading}
						>
							<IcMCrossInCircle
								className={styles.leave_icon}
							/>
							<div className={styles.button_text}>Leave</div>
						</Button>
					) : null}
				</div>
			) : null}
		</>
	);
}
export default MembersList;
