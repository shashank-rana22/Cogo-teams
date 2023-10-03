import { Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
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

	const updateGroup = ({ userId = '' }) => {
		if (is_draft) {
			updateDraftLocalCogooneGroup(
				{
					actionName : 'REMOVE_FROM_GROUP',
					userIds    : [userId],
				},
			);
			return;
		}

		updateCogooneGroup({
			actionName : 'REMOVE_FROM_GROUP',
			userIds    : [userId],
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
			/>
			<div className={styles.footer_buttons}>
				<Button
					size="md"
					themeType="tertiary"
					className={styles.button_styles}
					onClick={() => setAddMembers(true)}
					disabled={!hasPermissionToEdit || loading}
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
				{!is_draft && hasPermissionToEdit ? (
					<Button
						size="md"
						themeType="tertiary"
						className={styles.button_styles}
						onClick={() => updateGroup({ userId: loggedInUserId })}
						disabled={loading}
					>
						<Image
							src={GLOBAL_CONSTANTS.image_url.groups}
							alt="group"
							width={22}
							height={20}
							className={styles.image_styles}
						/>
						<div className={styles.button_text}>Leave</div>
					</Button>
				) : null}
			</div>
		</>
	);
}
export default MembersList;
