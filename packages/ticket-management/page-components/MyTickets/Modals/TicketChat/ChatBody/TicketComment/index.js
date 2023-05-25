import { cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';
import formatDate from '@cogoport/globalization/utils/formatDate';
import Image from 'next/image';
// import { useTranslation } from 'next-i18next';

import { BOT_ICON } from '../../../../../../constants';

import MessageBody from './MessageBody';
import styles from './styles.module.css';
import TimeLine from './TimeLine';

function TicketComment({
	Type = '',
	CreatedAt = '',
	Description = '',
	Url = [],
	userId = '',
	TicketType = '',
	SystemUserID = '',
	restData = {},
}) {
	const isAgent = SystemUserID !== userId;

	if (Type === 'respond') {
		return (
			<div className={cl`${isAgent ? styles.agent_message_flex : ''}`}>
				{isAgent && (
					<Image
						src={BOT_ICON}
						alt="agent"
						width={20}
						height={20}
						className={styles.agent_profile_pic}
					/>
				)}
				<div
					className={cl`${
						isAgent ? styles.message_div : styles.user_message_flex
					}`}
				>
					<div className={styles.header_flex}>
						<div className={styles.name_div}>
							{isAgent ? 'Agent' : 'You'}
							,
						</div>
						<div className={styles.time}>
							{formatDate({
								date       : CreatedAt,
								dateFormat : GLOBAL_CONSTANTS.formats.date['dd-MMM-yyyy'],
								separator  : ' ',
								timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
								formatType : 'dateTime',
							})}
						</div>
					</div>
					<div className={styles.message_container}>
						<MessageBody
							message={Description}
							media_urls={Url}
							restData={restData}
						/>
					</div>
				</div>
			</div>
		);
	}

	return (
		<TimeLine
			type={Type}
			description={Description}
			createdAt={CreatedAt}
			ticketType={TicketType}
		/>
	);
}

export default TicketComment;
