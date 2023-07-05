import { IcMRefresh } from '@cogoport/icons-react';

import TicketActions from '../../../TicketActions';

import styles from './styles.module.css';

function ModalHeader({
	ticketData = {},
	refreshTickets = () => {},
	setShowReassign = () => {},
	setShowEscalate = () => {},
	isClosureAuthorizer,
	updateTicketActivity = () => {},
}) {
	const { ID: id = '', Status: status = '' } = ticketData?.Ticket || {};

	const handleTicket = (e, { actionType }) => {
		e.stopPropagation();
		updateTicketActivity({ actionType, id });
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
				setShowReassign={setShowReassign}
				setShowEscalate={setShowEscalate}
				isClosureAuthorizer={isClosureAuthorizer}
			/>
		</div>
	);
}

export default ModalHeader;
