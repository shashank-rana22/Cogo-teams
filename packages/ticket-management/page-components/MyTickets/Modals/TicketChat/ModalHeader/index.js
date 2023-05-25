import { Button } from '@cogoport/components';
import { IcMArrowBack, IcMRefresh } from '@cogoport/icons-react';

import { actionButtonKeys } from '../../../../../constants';
import useUpdateTicketActivity from '../../../../../hooks/useUpdateTicketActivity';

import styles from './styles.module.css';

function ModalHeader({
	setModalData = () => {},
	ticketData = {},
	refetchTicket = () => {},
	ticketExists = false,
}) {
	const { ID = '', Status = '' } = ticketData?.Ticket || {};

	const { updateTicketActivity = () => {} } = useUpdateTicketActivity({
		refetchTicket,
	});

	return (
		<div className={styles.header_container}>
			<div className={styles.tickets_header}>
				<IcMArrowBack
					onClick={() => setModalData({ type: 'tickets_list' })}
					className={styles.back_icon}
				/>
				<div className={styles.tickets_header_text}>
					Chat
				</div>
				<IcMRefresh className={styles.refresh_icon} onClick={refetchTicket} />
			</div>
			<div className={styles.header_buttons}>
				<Button
					size="md"
					themeType="primary"
					onClick={() => {
						updateTicketActivity(actionButtonKeys[Status]?.name, ID);
					}}
					disabled={!ticketExists || Status === 'rejected'}
				>
					{actionButtonKeys[Status]?.label || 'Resolve'}
				</Button>
			</div>
		</div>
	);
}

export default ModalHeader;
