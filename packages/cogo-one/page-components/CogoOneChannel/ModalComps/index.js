import RaiseTicket from '../../../common/RaiseTicket';
import ReminderModal from '../ReminderModal';

import FeedbackModal from './FeedbackModal';
import OrgUsers from './OrgUsers';

function ModalComp({
	raiseTicketModal = {},
	setRaiseTicketModal = () => {},
	refetchTickets = () => {},
	firestore = {},
	userId = '',
	setOpenKamContacts = () => {},
	openKamContacts = false,
	setActiveTab = () => {},
	orgId = '',
	viewType = '',
	isMobile = false,
}) {
	return (
		<>
			<FeedbackModal />

			{raiseTicketModal?.state && (
				<RaiseTicket
					setRaiseTicketModal={setRaiseTicketModal}
					raiseTicketModal={raiseTicketModal}
					refetchTickets={refetchTickets}
					orgId={orgId}
				/>
			)}

			{isMobile
				? null
				: (
					<ReminderModal
						firestore={firestore}
						agentId={userId}
						viewType={viewType}
					/>
				)}

			{openKamContacts && (
				<OrgUsers
					openKamContacts={openKamContacts}
					setOpenKamContacts={setOpenKamContacts}
					setActiveTab={setActiveTab}
				/>
			)}
		</>
	);
}
export default ModalComp;
