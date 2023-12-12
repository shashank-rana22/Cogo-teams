import { cl, Avatar } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';
import { startCase, isEmpty } from '@cogoport/utils';
import React from 'react';

import { togglePinChat, deleteDraftDoc } from '../../../../../helpers/teamsPinChatHelpers';
import dateTimeConverter from '../../../../../utils/dateTimeConverter';

import PopUp from './PopUp';
import styles from './styles.module.css';

const DEFAULT_UNREAD_MESSAGES = 0;
const MAXIMUM_UNREAD_MESSAGES = 100;

const groupNameRegex = new RegExp(GLOBAL_CONSTANTS.regex_patterns.group_draft_name);

function GroupCard({
	eachRoom = {},
	activeTeamCard = {},
	setActiveCard = () => {},
	loggedInUserId = '',
	firestore = {},
	setActiveTab = () => {},
}) {
	const {
		id = '',
		is_draft = false,
		new_message_sent_at = 0,
		is_pinned = false,
		search_name = '',
		is_group :isGroup = false,
		last_message_document = {},
		self_unread_messages_count = 0,
	} = eachRoom || {};

	const activeCard = id === activeTeamCard?.id;

	const lastActive = new Date(new_message_sent_at);
	const mediaText = last_message_document?.response?.message_type === 'media' ? 'media' : '';

	const lastMessage = last_message_document?.response?.message || mediaText;

	const isDraftName = !isEmpty(search_name?.match(groupNameRegex));
	console.log(search_name, groupNameRegex, isDraftName, 'search_name');

	const { renderTime } = dateTimeConverter(
		Date.now() - Number(lastActive),
		Number(lastActive),
	);

	const updatePinnedChats = (e, type) => {
		e.stopPropagation();
		togglePinChat({ firestore, loggedInAgentId: loggedInUserId, roomId: id, type });
	};

	const closeRoom = () => {
		if (activeCard) {
			setActiveTab((prev) => ({ ...prev, data: {}, groupData: {} }));
		}
	};

	const deleteDraft = () => {
		deleteDraftDoc({
			firestore,
			roomId          : id,
			loggedInAgentId : loggedInUserId,
			clearActiveRoom : closeRoom,
		});
	};

	return (
		<div
			className={cl`${styles.container} ${activeCard ? styles.active_card : ''}`}
			role="presentation"
			onClick={() => setActiveCard(eachRoom)}
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
							personName={search_name}
							alt="name"
							size="26px"
							className={styles.styled_avatar}
						/>
					)}
					<div className={styles.type}>
						{!isDraftName ? startCase(search_name?.toLowerCase() || '') : search_name }
					</div>
					{self_unread_messages_count > DEFAULT_UNREAD_MESSAGES && (
						<div className={styles.new_message_count}>
							{self_unread_messages_count > MAXIMUM_UNREAD_MESSAGES
								? '99+'
								: self_unread_messages_count}
						</div>
					)}
					<div className={styles.popover_styles}>
						<PopUp
							isPinned={is_pinned}
							updatePinnedChats={updatePinnedChats}
							isDraft={is_draft}
							deleteDraft={deleteDraft}
						/>
					</div>
				</div>
				<div className={styles.description}>
					<div className={cl`${styles.label} ${is_draft ? styles.draft_styles : ''}`}>
						<div
							className={styles.content}
							dangerouslySetInnerHTML={{
								__html: (is_draft
									? 'draft' : lastMessage) || '',
							}}
						/>
					</div>
					<div className={styles.activity_duration}>
						{renderTime}
					</div>
				</div>
			</div>
		</div>
	);
}

export default GroupCard;
