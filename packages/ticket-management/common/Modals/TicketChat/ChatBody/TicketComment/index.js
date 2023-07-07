import { cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { Image } from '@cogoport/next';

import MessageBody from './MessageBody';
import styles from './styles.module.css';
import TimeLine from './TimeLine';

function TicketComment({
	type = '',
	createdAt = '',
	description = '',
	mediaUrls = [],
	userId = '',
	ticketType = '',
	name = '',
	userType = '',
	oldReviewerName = '',
	reviewerName = '',
	restData = {},
	rating = 0,
	activityUserId = '',
	currentAgentName = '',
}) {
	const isCurrentUser = activityUserId === userId;
	const isAgent = userType === 'user';

	if (type === 'respond') {
		return (
			<div className={cl`${!isCurrentUser ? styles.agent_message_flex : ''}`}>
				{!isCurrentUser && (
					<Image
						src={GLOBAL_CONSTANTS.image_url?.[isAgent ? 'bot_icon' : 'user_avatar']}
						alt="agent"
						width={20}
						height={20}
						className={styles.agent_profile_pic}
					/>
				)}
				<div
					className={cl`${
						!isCurrentUser ? styles.message_div : styles.user_message_flex
					}`}
				>
					<div className={styles.header_flex}>
						<div className={styles.name_div}>
							{isCurrentUser ? currentAgentName : name}
							,
						</div>
						<div className={styles.time}>
							{formatDate({
								date       : createdAt,
								dateFormat : GLOBAL_CONSTANTS.formats.date['dd-MMM-yyyy'],
								separator  : ' ',
								timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
								formatType : 'dateTime',
							})}
						</div>
					</div>
					<div className={styles.message_container}>
						<MessageBody
							message={description}
							mediaUrls={mediaUrls}
							restData={restData}
						/>
					</div>
				</div>
			</div>
		);
	}

	return (
		<TimeLine
			type={type}
			name={name}
			rating={rating}
			userType={userType}
			oldReviewerName={oldReviewerName}
			reviewerName={reviewerName}
			description={description}
			createdAt={createdAt}
			ticketType={ticketType}
		/>
	);
}

export default TicketComment;
