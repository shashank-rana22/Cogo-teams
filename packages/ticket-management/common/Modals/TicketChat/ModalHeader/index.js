import { IcMRefresh } from '@cogoport/icons-react';

import TicketActions from '../../../TicketActions';

import styles from './styles.module.css';

function ModalHeader({
	ticketData = {},
	refreshTickets = () => {},
	setShowReassign = () => {},
	setShowEscalate = () => {},
	updateTicketActivity = () => {},
}) {
	const {
		Ticket: ticket = {}, TicketStatus : ticketStatus = '',
		IsClosureAuthorizer: isClosureAuthorizer = false, IsCurrentReviewer: isCurrentReviewer = '',
	} = ticketData || {};
	const { ID: id = '' } = ticket || {};

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
				ticketStatus={ticketStatus}
				handleTicket={handleTicket}
				setShowReassign={setShowReassign}
				setShowEscalate={setShowEscalate}
				isCurrentReviewer={isCurrentReviewer}
				isClosureAuthorizer={isClosureAuthorizer}
			/>
		</div>
	);
}

export default ModalHeader;
