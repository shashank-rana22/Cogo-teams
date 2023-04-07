import { format } from '@cogoport/utils';
import React from 'react';

import timeLineFunctions from '../../../../../../utils/timeLineFunctions';

import styles from './styles.module.css';

function TimeLine({ eachMessage = {}, key = '' }) {
	const {
		conversation_type = '',
		agent_data = {},
		performed_by_data = {},
		created_at,
		conversation_started_at,
	} = eachMessage;
	const { name : presentAgent } = agent_data || {};
	const { name : previousAgent } = performed_by_data || {};
	const { renderStatement } = timeLineFunctions();

	const timelineText = renderStatement({
		type     : conversation_type,
		present  : presentAgent,
		previous : previousAgent,
		startAt  : conversation_started_at,
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
