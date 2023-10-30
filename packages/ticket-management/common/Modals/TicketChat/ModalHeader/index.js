import { IcMRefresh } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';

import TicketActions from '../../../TicketActions';

import styles from './styles.module.css';

function ModalHeader({
	ticketData = {},
	updateLoading = false,
	refreshTickets = () => {},
	setShowReassign = () => {},
	setShowEscalate = () => {},
	setShowResolveRequest = () => {},
	updateTicketActivity = () => {},
}) {
	const {
		Ticket: ticket = {}, TicketStatus : ticketStatus = '',
		IsClosureAuthorizer: isClosureAuthorizer = false, IsCurrentReviewer: isCurrentReviewer = '',
	} = ticketData || {};
	const { ID: id = '' } = ticket || {};

	const { t } = useTranslation(['myTickets']);

	const handleTicket = (e, { actionType }) => {
		e.stopPropagation();
		updateTicketActivity({ actionType, id });
	};

	return (
		<div className={styles.header_container}>
			<div className={styles.tickets_header}>
				<div className={styles.tickets_header_text}>{t('myTickets:chat')}</div>
				<IcMRefresh className={styles.refresh_icon} onClick={refreshTickets} />
			</div>
			<TicketActions
				isModal
				id={id}
				updateLoading={updateLoading}
				ticketStatus={ticketStatus}
				handleTicket={handleTicket}
				setShowReassign={setShowReassign}
				setShowEscalate={setShowEscalate}
				isCurrentReviewer={isCurrentReviewer}
				isClosureAuthorizer={isClosureAuthorizer}
				setShowResolveRequest={setShowResolveRequest}
			/>
		</div>
	);
}

export default ModalHeader;
