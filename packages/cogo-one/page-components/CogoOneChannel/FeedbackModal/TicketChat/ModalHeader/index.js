import { IcMRefresh, IcMArrowBack } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';

import TicketActions from '../../../../../common/TicketActions';

import styles from './styles.module.css';

function ModalHeader({
	ticketData = {},
	updateLoading = false,
	refreshTickets = () => {},
	setModalData = () => {},
	setShowEscalate = () => {},
	setShowReassign = () => {},
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
				<div
					role="presentation"
					className={styles.back_icon}
					onClick={() => setModalData({})}
				>
					<IcMArrowBack />
				</div>
				<div className={styles.tickets_header_text}>{t('myTickets:chat')}</div>
				<IcMRefresh className={styles.refresh_icon} onClick={refreshTickets} />
			</div>
			<TicketActions
				isModal
				id={id}
				updateLoading={updateLoading}
				ticketStatus={ticketStatus}
				setShowEscalate={setShowEscalate}
				handleTicket={handleTicket}
				setShowReassign={setShowReassign}
				isCurrentReviewer={isCurrentReviewer}
				isClosureAuthorizer={isClosureAuthorizer}
			/>
		</div>
	);
}

export default ModalHeader;
