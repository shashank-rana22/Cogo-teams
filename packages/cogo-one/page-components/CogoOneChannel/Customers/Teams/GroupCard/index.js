import { cl, Avatar } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import {
	IcMPin, IcCPin,
} from '@cogoport/icons-react';
import { Image } from '@cogoport/next';
import { startCase } from '@cogoport/utils';
import React from 'react';

import dateTimeConverter from '../../../../../utils/dateTimeConverter';

import styles from './styles.module.css';

const GROUP_COUNT = 2;

function GroupCard({
	eachRoom = {},
	activeTeamCard = {},
	setActiveTeamCard = () => {},
	loggedInUserId = '',
}) {
	const {
		id = '',
		is_draft = false,
		new_message_sent_at = 0,
		group_members_count = 0,
		is_pinned = false,
		group_members_data = [],
		group_name = '',
		last_message_document = {},
	} = eachRoom || {};

	const activeCard = id === activeTeamCard?.id;

	const lastActive = new Date(new_message_sent_at);

	const isGroup = group_members_count > GROUP_COUNT;

	const userName = group_members_data?.find((eachGroupMember) => eachGroupMember?.id !== loggedInUserId)?.name || '';

	const displayName = isGroup ? group_name : (userName || 'User');

	const lastMessage = last_message_document?.response?.message || '';

	const { renderTime } = dateTimeConverter(
		Date.now() - Number(lastActive),
		Number(lastActive),
	);

	const updatePinnedChats = (e, type) => {
		e.stopPropagation();
		console.log('type:', type);
	};

	return (
		<div
			className={cl`${styles.container} ${activeCard ? styles.active_card : ''}`}
			role="presentation"
			onClick={() => setActiveTeamCard(eachRoom)}
		>
			<div className={styles.info}>
				<div className={styles.group}>
					{isGroup ? (
						<Image
							src={GLOBAL_CONSTANTS.image_url.teams}
							alt="group"
							width={26}
							height={26}
						/>
					) : (
						<Avatar
							personName={displayName}
							alt="name"
							size="26px"
							className={styles.styled_avatar}
						/>
					)}
					<div className={styles.type}>
						{startCase(displayName)}
					</div>
				</div>
				<div className={styles.description}>
					<div className={cl`${styles.label} ${is_draft ? styles.draft_styles : ''}`}>
						{is_draft ? 'draft' : lastMessage}
					</div>
					<div className={styles.activity_duration}>
						{renderTime}
					</div>
				</div>
			</div>
			<div className={styles.pinned_div}>
				{is_pinned ? <IcCPin onClick={(e) => updatePinnedChats(e, 'unpin')} />
					: <IcMPin onClick={(e) => updatePinnedChats(e, 'pin')} />}
			</div>
		</div>
	);
}

export default GroupCard;
