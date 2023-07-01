import RaiseTicket from '../../../common/RaiseTicket';
import AgentModal from '../AgentModal';
import DialCallModal from '../DialCallModal';
import FeedbackModal from '../FeedbackModal';
import ReminderModal from '../ReminderModal';

function ModalComp({
	agentDetails, setAgentDetails, showFeedback, setShowFeedback, raiseTicketModal, setRaiseTicketModal,
	refetchTickets, firestore, showDialModal, setShowDialModal, userId, getAssignedChats,
}) {
	return (
		<>
			{agentDetails && (
				<AgentModal
					agentDetails={agentDetails}
					setAgentDetails={setAgentDetails}
				/>
			)}
			{
				showFeedback && (
					<FeedbackModal
						showFeedback={showFeedback}
						setShowFeedback={setShowFeedback}
					/>
				)
			}
			{raiseTicketModal?.state && (
				<RaiseTicket
					setRaiseTicketModal={setRaiseTicketModal}
					raiseTicketModal={raiseTicketModal}
					refetchTickets={refetchTickets}
				/>
			)}
			<ReminderModal firestore={firestore} agentId={userId} getAssignedChats={getAssignedChats} />
			{showDialModal && (
				<DialCallModal
					setShowDialModal={setShowDialModal}
					showDialModal={showDialModal}
				/>
			)}
		</>
	);
}
export default ModalComp;
