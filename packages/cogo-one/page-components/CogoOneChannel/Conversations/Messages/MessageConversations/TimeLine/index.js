import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import React from 'react';

import { CHANNEL_TYPE } from '../../../../../../constants';
import getVoiceCallStatement from '../../../../../../utils/getVoiceCallStatement';

import styles from './styles.module.css';

function TimeLine({ eachMessage = {}, key = '' }) {
	const {
		conversation_type = '',
		agent_data = {},
		performed_by_data = {},
		created_at = '',
		conversation_started_at,
		user_data,
		status = '',
		channel = '',
	} = eachMessage;

	const { name : presentAgent } = agent_data || {};
	const { name : previousAgent } = performed_by_data || {};
	const { name: voiceCallUserName = '' } = user_data || {};

	const timelineText = getVoiceCallStatement({
		type            : conversation_type,
		present         : presentAgent,
		previous        : CHANNEL_TYPE.includes(channel) ? voiceCallUserName : previousAgent,
		startAt         : conversation_started_at,
		voiceCallStatus : status,
		channel,
	});

	return (
		timelineText ? (
			<div className={styles.container} key={key}>
				<div className={styles.break_the_chat} />
				<div className={styles.timeline_text}>
					<div className={styles.timeline_container}>
						{timelineText}
					</div>
					<div className={styles.timeline_container}>
						{formatDate({
							date       : new Date(created_at),
							dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
							timeFormat : GLOBAL_CONSTANTS.formats.time['HH:mm'],
							formatType : 'dateTime',
							separator  : ', ',
						})}
					</div>
				</div>
			</div>
		) : null
	);
}

export default TimeLine;
