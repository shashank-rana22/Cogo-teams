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
}) {
	const { is_draft = false, group_members_data = [] } = activeTeamCard || {};

	const modifiedMembersList = is_draft ? group_members_data : membersList;

	return (
		<>
			<List
				membersList={modifiedMembersList}
				isDraft={is_draft}
				updateCogooneGroup={updateCogooneGroup}
				hasPermissionToEdit={hasPermissionToEdit}
				loading={loading}
			/>
			<div className={styles.footer_buttons}>
				<Button
					size="md"
					themeType="tertiary"
					className={styles.button_styles}
					onClick={() => setAddMembers(true)}
					disabled={is_draft}
				>
					<Image
						src={GLOBAL_CONSTANTS.image_url.groups}
						alt="group"
						width={22}
						height={20}
						className={styles.image_styles}
						disabled={hasPermissionToEdit || loading}
					/>
					<div className={styles.button_text}>Add People</div>
				</Button>
				{!is_draft && hasPermissionToEdit ? (
					<Button
						size="md"
						themeType="tertiary"
						className={styles.button_styles}
						onClick={() => {
							updateCogooneGroup({
								actionName : 'REMOVE_FROM_GROUP',
								userIds    : [loggedInUserId],
							});
						}}
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
