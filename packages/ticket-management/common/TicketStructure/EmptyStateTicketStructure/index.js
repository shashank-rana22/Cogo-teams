import { Button, cl } from '@cogoport/components';
import { IcMTicket } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function EmptyStateTicketStructure({
	setModalData,
	listType = '',
	emptyText = 'No Tickets Raised',
}) {
	return (
		<div
			className={cl`${styles.container} ${
				listType === 'create' ? styles.create_raise_box : ''
			}`}
		>
			<IcMTicket className={styles.icm_tag} />
			<div className={styles.ticket_label}>{emptyText}</div>
			{!(listType === 'create') && (
				<Button
					size="md"
					themeType="secondary"
					className={styles.ticket_raise_button}
					onClick={() => setModalData({ type: 'raise_a_ticket' })}
				>
					Raise a Ticket
				</Button>
			)}
		</div>
	);
}

export default EmptyStateTicketStructure;
