import { format } from '@cogoport/utils';
import React from 'react';

import { renderStatement } from '../../../../../../utils/voiceTimeLine';

import styles from './styles.module.css';

function TimeLine({ eachMessage, key }) {
	const {
		conversation_type = '',
		agent_data = {},
		performed_by_data = {},
		created_at,
	} = eachMessage || {};
	const { name : presentAgent } = agent_data || {};
	const { name : previousAgent } = performed_by_data || {};

	return (
		<div className={styles.container} key={key}>
			<div className={styles.line} />
			<div className={styles.timeline_text}>
				<div className={styles.timeline_container}>
					{renderStatement({
						type     : conversation_type,
						present  : presentAgent,
						previous : previousAgent,
					})}
				</div>
				<div className={styles.timeline_container}>
					{format(new Date(created_at), 'dd MMM YYYY, HH:mm')}
				</div>
			</div>
		</div>
	);
}

export default TimeLine;
