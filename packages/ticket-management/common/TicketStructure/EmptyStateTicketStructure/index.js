import { IcMTicket } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function EmptyStateTicketStructure({ label }) {
	return (
		<div
			className={styles.container}

		>
			<IcMTicket className={styles.icm_tag} />
			<div className={styles.ticket_label}>{`No ${label} Tickets Raised`}</div>
		</div>
	);
}

export default EmptyStateTicketStructure;
