import { Popover, Avatar } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';

import EditName from './EditName';
import Members from './Members';
import styles from './styles.module.css';
import ToUser from './ToUsers';
import VideoCalling from './VideoCalling';

function Header({
	activeTeamCard = {},
	viewType = '',
	firestore = {},
	setActiveTab = () => {},
	membersList = [],
	activeTab = {},
	hasPermissionToEdit = false,
	loggedInUserId = '',
}) {
	const {
		is_draft = false,
		is_group: isGroup = false,
		search_name = '',
		id = '',
		group_id = '',
		group_members_ids = [],
	} = activeTeamCard || {};

	const newDraft = isEmpty(group_members_ids);

	if (is_draft && newDraft) {
		return (
			<ToUser
				firestore={firestore}
				setActiveTab={setActiveTab}
			/>
		);
	}

	return (
		<div className={styles.container}>
			<div className={styles.common_flex}>
				{isGroup ? (
					<Image
						src={GLOBAL_CONSTANTS.image_url.teams}
						alt="group"
						width={28}
						height={28}
					/>
				) : (
					<Avatar
						personName={search_name}
						alt="name"
						size="28px"
						className={styles.styled_avatar}
					/>
				)}
				<div className={styles.name}>
					<EditName
						searchName={search_name}
						isGroup={isGroup}
						firestore={firestore}
						activeTab={activeTab}
						isDraft={is_draft}
					/>
				</div>
			</div>
			<div className={styles.buttons_flex}>
				{isGroup ? (
					<>
						<Popover
							placement="bottom-end"
							render={(
								<Members
									viewType={viewType}
									membersList={membersList}
									activeTeamCard={activeTeamCard}
									key={group_id || id}
									activeTab={activeTab}
									hasPermissionToEdit={hasPermissionToEdit}
									loggedInUserId={loggedInUserId}
									firestore={firestore}
									isDraft={is_draft}
								/>
							)}
							caret={false}
							className={styles.popover_styles}
						>
							<Image
								src={GLOBAL_CONSTANTS.image_url.groups}
								alt="group"
								width={25}
								height={22}
								className={styles.image_styles}
							/>
						</Popover>
						<div className={styles.count}>
							{is_draft
								? group_members_ids?.length : membersList?.length || ''}
						</div>
					</>
				) : null}
				{(hasPermissionToEdit && !isGroup) ? <VideoCalling activeTab={activeTab} /> : null}
			</div>
		</div>
	);
}

export default Header;
