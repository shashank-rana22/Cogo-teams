import { ButtonGroup, Popover, Avatar } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';
import { startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import { BUTTON_GROUP_OPTIONS } from '../../../../../constants/teamsHeaderMappings';

import AddMembers from './AddMembers';
import styles from './styles.module.css';
import ToUser from './ToUsers';

const GROUP_COUNT = 2;

const ZERO_USERS = 0;

function Header({
	activeTeamCard = {},
	viewType = '',
	firestore = {},
	setActiveTab = () => {},
}) {
	const [showPopover, setShowPopover] = useState(false);

	const {
		group_members_count = 0,
		is_draft = false,
		search_name = '',
	} = activeTeamCard || {};

	const isGroup = group_members_count > GROUP_COUNT;

	const newDraft = !(group_members_count > ZERO_USERS);

	if (is_draft && newDraft) {
		return (
			<div className={styles.container}>
				<ToUser
					firestore={firestore}
					setActiveTab={setActiveTab}
				/>
			</div>
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
				<ButtonGroup size="xs" options={BUTTON_GROUP_OPTIONS} />
				<Popover
					placement="bottom"
					visible={showPopover}
					render={showPopover ? (
						<AddMembers viewType={viewType} />
					) : null}
				>
					<Image
						src={GLOBAL_CONSTANTS.image_url.groups}
						alt="group"
						width={28}
						height={25}
						onClick={() => setShowPopover((prev) => !prev)}
						className={styles.image_styles}
					/>
				</Popover>
			</div>
		</div>
	);
}

export default Header;
