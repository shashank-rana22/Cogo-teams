import { IcMTicket } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function EmptyStateTicketStructure({
	emptyText = 'No Tickets Raised',
}) {
	return (
		<div
			className={styles.container}

		>
			<IcMTicket className={styles.icm_tag} />
			<div className={styles.ticket_label}>{emptyText}</div>
		</div>
	);
}

export default EmptyStateTicketStructure;
