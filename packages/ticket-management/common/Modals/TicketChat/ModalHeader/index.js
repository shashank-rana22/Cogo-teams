import { Button } from '@cogoport/components';
import { IcMRefresh } from '@cogoport/icons-react';

import { actionButtonKeys } from '../../../../configurations/key-mapping';
import useUpdateTicketActivity from '../../../../hooks/useUpdateTicketActivity';

import styles from './styles.module.css';

function ModalHeader({
	ticketData = {},
	refetchTicket = () => {},
	ticketExists = false,
}) {
	const actionButton = actionButtonKeys();
	const { ID: id = '', Status: status = '' } = ticketData?.Ticket || {};

	const { updateTicketActivity = () => {} } = useUpdateTicketActivity({
		refetchTicket,
	});

	return (
		<div className={styles.header_container}>
			<div className={styles.tickets_header}>
				<div className={styles.tickets_header_text}>Chat</div>
				<IcMRefresh className={styles.refresh_icon} onClick={refetchTicket} />
			</div>
			<div className={styles.header_buttons}>
				<Button
					size="md"
					themeType="primary"
					onClick={() => updateTicketActivity(actionButton[status]?.name, id)}
					disabled={!ticketExists || status === 'rejected'}
				>
					{actionButton[status]?.label || 'Resolve'}
				</Button>
			</div>
		</div>
	);
}

export default ModalHeader;
