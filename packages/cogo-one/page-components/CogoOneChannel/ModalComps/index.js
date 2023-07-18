import RaiseTicket from '../../../common/RaiseTicket';
import ReminderModal from '../ReminderModal';

import FeedbackModal from './FeedbackModal';

function ModalComp({
	raiseTicketModal,
	setRaiseTicketModal,
	refetchTickets,
	firestore,
	userId,
}) {
	return (
		<>
			<FeedbackModal />

			{raiseTicketModal?.state && (
				<RaiseTicket
					setRaiseTicketModal={setRaiseTicketModal}
					raiseTicketModal={raiseTicketModal}
					refetchTickets={refetchTickets}
				/>
			)}

			<ReminderModal
				firestore={firestore}
				agentId={userId}
			/>
		</>
	);
}
export default ModalComp;
