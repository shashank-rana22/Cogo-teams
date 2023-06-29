import { IcMRefresh } from '@cogoport/icons-react';

import useUpdateTicketActivity from '../../../../hooks/useUpdateTicketActivity';
import TicketActions from '../../../TicketActions';

import styles from './styles.module.css';

function ModalHeader({
	ticketData = {},
	refreshTickets = () => {},
	modalData,
}) {
	const { ID: id = '', Status: status = '' } = ticketData?.Ticket || {};
	const { isClosureAuthorizer } = modalData || {};

	const { updateTicketActivity = () => {} } = useUpdateTicketActivity({
		refreshTickets,
	});

	const handleTicket = (e, val) => {
		e.stopPropagation();
		updateTicketActivity(val, id);
	};

	return (
		<div className={styles.header_container}>
			<div className={styles.tickets_header}>
				<div className={styles.tickets_header_text}>Chat</div>
				<IcMRefresh className={styles.refresh_icon} onClick={refreshTickets} />
			</div>
			<TicketActions
				isModal
				status={status}
				handleTicket={handleTicket}
				isClosureAuthorizer={isClosureAuthorizer}
			/>
		</div>
	);
}

export default ModalHeader;
