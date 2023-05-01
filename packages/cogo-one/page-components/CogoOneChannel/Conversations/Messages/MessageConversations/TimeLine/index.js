import { format } from '@cogoport/utils';
import React from 'react';

import getVoiceCallStatement from '../../../../../../utils/getVoiceCallStatement';

import styles from './styles.module.css';

function TimeLine({ eachMessage = {}, key = '' }) {
	const {
		conversation_type = '',
		agent_data = {},
		performed_by_data = {},
		created_at,
		conversation_started_at,
		user_data :{ name: voiceCallUserName = '' } = {},
		status = '',
		channel = '',
	} = eachMessage;
	const { name : presentAgent } = agent_data || {};
	const { name : previousAgent } = performed_by_data || {};

	const timelineText = getVoiceCallStatement({
		type            : conversation_type,
		present         : presentAgent,
		previous        : channel === 'voice_call' ? voiceCallUserName : previousAgent,
		startAt         : conversation_started_at,
		voiceCallStatus : status,
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
						{format(new Date(created_at), 'dd MMM YYYY, HH:mm')}
					</div>
				</div>
			</div>
		) : null
	);
}

export default TimeLine;
