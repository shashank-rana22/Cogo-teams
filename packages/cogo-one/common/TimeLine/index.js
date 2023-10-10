import { cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMArrowDoubleUp } from '@cogoport/icons-react';
import React from 'react';

import { CHANNEL_TYPE } from '../../constants';
import getVoiceCallStatement from '../../utils/getVoiceCallStatement';

import styles from './styles.module.css';

function TimeLine({
	eachMessage = {},
	showHideOption = false,
	setExpandedState = () => {},
}) {
	const {
		conversation_type = '',
		agent_data = {},
		performed_by_data = {},
		created_at = '',
		conversation_started_at,
		user_data,
		status = '',
		channel = '',
		reason = '',
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
		reason,
	});

	if (!timelineText) {
		return null;
	}

	return (
		<>
			{showHideOption ? (
				<div
					role="presentation"
					onClick={() => setExpandedState(false)}
					className={styles.grouped_container}
				>
					<IcMArrowDoubleUp />
					{' '}
					hide activities
				</div>
			) : null}
			<div className={styles.container}>
				<div className={styles.break_the_chat} />
				<div className={styles.timeline_text}>
					<div className={styles.timeline_container}>
						{timelineText}
					</div>
					<div className={cl`${styles.timeline_container} ${styles.date_time_styles}`}>
						{formatDate({
							date       : new Date(created_at),
							dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
							timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
							formatType : 'dateTime',
							separator  : ', ',
						})}
					</div>
				</div>
			</div>
		</>
	);
}

export default TimeLine;