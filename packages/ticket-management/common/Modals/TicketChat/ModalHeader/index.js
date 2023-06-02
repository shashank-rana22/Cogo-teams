import { Button } from '@cogoport/components';
import { IcMRefresh } from '@cogoport/icons-react';

import { ACTION_KEYS } from '../../../../constants';
import useUpdateTicketActivity from '../../../../hooks/useUpdateTicketActivity';

import styles from './styles.module.css';

function ModalHeader({
	ticketData = {},
	refetchTicket = () => {},
	ticketExists = false,
	modalData,
}) {
	const { ID: id = '', Status: status = '' } = ticketData?.Ticket || {};

	const { updateTicketActivity = () => {} } = useUpdateTicketActivity({
		refetchTicket,
	});

	const showResolve = ['Open', 'Closed'].includes(modalData?.key);

	return (
		<div className={styles.header_container}>
			<div className={styles.tickets_header}>
				<div className={styles.tickets_header_text}>Chat</div>
				<IcMRefresh className={styles.refresh_icon} onClick={refetchTicket} />
			</div>
			{showResolve && (
				<div className={styles.header_buttons}>
					<Button
						size="md"
						themeType="primary"
						onClick={() => updateTicketActivity(ACTION_KEYS[status]?.name, id)}
						disabled={!ticketExists || status === 'rejected'}
					>
						{ACTION_KEYS[status]?.label || 'Resolve'}
					</Button>
				</div>
			)}
		</div>
	);
}

export default ModalHeader;
