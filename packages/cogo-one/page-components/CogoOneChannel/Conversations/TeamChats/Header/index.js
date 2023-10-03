import { ButtonGroup, Popover, Avatar } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';
import { startCase, isEmpty } from '@cogoport/utils';

import { BUTTON_GROUP_OPTIONS } from '../../../../../constants/teamsHeaderMappings';

import Members from './Members';
import styles from './styles.module.css';
import ToUser from './ToUsers';

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
	console.log('activeTeamCard', activeTeamCard);

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
				<div className={styles.name}>{startCase(search_name?.toLowerCase() || '')}</div>
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
				<ButtonGroup
					size="xs"
					options={BUTTON_GROUP_OPTIONS}
					disabled={!hasPermissionToEdit}
				/>
			</div>
		</div>
	);
}

export default Header;
