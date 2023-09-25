import { ButtonGroup, Button, Popover, Avatar } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMCall } from '@cogoport/icons-react';
import { Image } from '@cogoport/next';
import React, { useState } from 'react';

import AddMembers from './AddMembers';
import styles from './styles.module.css';
import ToUser from './ToUsers';

const GROUP_COUNT = 2;

const ZERO_USERS = 0;

const USER_AVATAR_MAPPING = {
	single: (
		<Avatar
			personName="Lachiram naik"
			alt="img"
			disabled={false}
			size="40px"
			className={styles.styled_avatar}
		/>
	),
	group: (
		<Image
			src={GLOBAL_CONSTANTS.image_url.teams}
			alt="group"
			width={40}
			height={40}
		/>
	),
};

const BUTTON_GROUP_OPTIONS = [{
	children: (<IcMCall
		width={22}
		height={22}
		fill="#777"
	/>
	),
	onClick: () => {
		console.log('Left Button');
	},

}, {
	children: (<Image
		src={GLOBAL_CONSTANTS.image_url.video_call}
		alt="group"
		width={22}
		height={22}
	/>
	),
	onClick: () => {
		console.log('Right Button');
	},

}];

function Header({
	activeTeamCard = {},
	viewType = '',
	loggedInUserId = '',
}) {
	const [showPopover, setShowPopover] = useState(false);
	const [users, setUsers] = useState([]);

	const {
		group_member_count = 0,
		group_name = '',
		group_member_data = [],
	} = activeTeamCard || {};

	const isGroup = group_member_count > GROUP_COUNT;

	const newDraft = !(group_member_count > ZERO_USERS);

	const userName = group_member_data?.find((eachGroupMember) => eachGroupMember?.id !== loggedInUserId)?.name || '';

	if (newDraft) {
		return (
			<div className={styles.container}>
				<ToUser users={users} setUsers={setUsers} />
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<div className={styles.common_flex}>
				{USER_AVATAR_MAPPING[isGroup ? 'group' : 'single']}
				<div className={styles.name}>{isGroup ? group_name : (userName || 'User')}</div>
			</div>
			<div className={styles.common_flex}>
				<ButtonGroup size="md" options={BUTTON_GROUP_OPTIONS} />
				<Popover
					placement="bottom"
					visible={showPopover}
					render={showPopover ? (
						<AddMembers viewType={viewType} />
					) : null}
				>
					<Button themeType="tertiary" onClick={() => setShowPopover((prev) => !prev)}>
						<Image
							src={GLOBAL_CONSTANTS.image_url.groups}
							alt="group"
							width={28}
							height={25}
						/>
					</Button>
				</Popover>
			</div>
		</div>
	);
}

export default Header;
