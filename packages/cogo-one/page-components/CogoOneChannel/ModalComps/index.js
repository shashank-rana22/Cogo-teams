import RaiseTicket from '../../../common/RaiseTicket';
import FeedbackModal from '../FeedbackModal';
import ReminderModal from '../ReminderModal';

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
			<ReminderModal firestore={firestore} agentId={userId} />
		</>
	);
}
export default ModalComp;
