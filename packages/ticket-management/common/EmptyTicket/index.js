import { IcMTaskNotCompleted } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function EmptyTicket({
	emptyText = 'No Tickets Raised',
}) {
	return (
		<div className={styles.container}>
			<IcMTaskNotCompleted className={styles.icm_tag} />
			<div className={styles.ticket_label}>{emptyText}</div>
		</div>
	);
}

export default EmptyTicket;
