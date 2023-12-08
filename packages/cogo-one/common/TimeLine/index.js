import { cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMArrowDoubleUp } from '@cogoport/icons-react';
import { useSelector } from '@cogoport/store';
import React from 'react';

import { CHANNEL_TYPE } from '../../constants';
import getVoiceCallStatement from '../../utils/getVoiceCallStatement';

import styles from './styles.module.css';

function TimeLine({
	eachMessage = {},
	showHideOption = false,
	setExpandedState = () => {},
}) {
	const loggedInAgentId = useSelector((state) => state?.profile?.user?.id);

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

	const { name : presentAgent, id: presentAgentId = '' } = agent_data || {};
	const { name : previousAgent, id: prevAgentId = '' } = performed_by_data || {};
	const { name: voiceCallUserName = '' } = user_data || {};

	const prevName = prevAgentId === loggedInAgentId ? 'You' : previousAgent;

	const timelineText = getVoiceCallStatement({
		type            : conversation_type,
		present         : presentAgentId === loggedInAgentId ? 'You' : presentAgent,
		previous        : CHANNEL_TYPE.includes(channel) ? voiceCallUserName : prevName,
		startAt         : conversation_started_at,
		voiceCallStatus : status,
		channel,
		reason,
		isSameAgent     : presentAgentId === prevAgentId,
	});

	// console.log(eachMessage, timelineText, 'message-showHideOption');

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
