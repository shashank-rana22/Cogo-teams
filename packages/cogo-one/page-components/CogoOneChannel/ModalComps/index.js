import RaiseTicket from '../../../common/RaiseTicket';
import ReminderModal from '../ReminderModal';

import FeedbackModal from './FeedbackModal';
import OrgUsers from './OrgUsers';
// import SpOrganizationUsers from './SpOrganizationUsers';

function ModalComp({
	raiseTicketModal = {},
	setRaiseTicketModal = () => {},
	refetchTickets = () => {},
	firestore = {},
	userId = '',
	setOpenKamContacts = () => {},
	openKamContacts = false,
	setActiveTab = () => {},
	// openSpContacts = false,
	// setOpenSpContacts = () => {},
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

			{openKamContacts && (
				<OrgUsers
					openKamContacts={openKamContacts}
					setOpenKamContacts={setOpenKamContacts}
					setActiveTab={setActiveTab}
				/>
			)}

			{/* {openSpContacts && (
				<SpOrganizationUsers
					openSpContacts={openSpContacts}
					setOpenSpContacts={setOpenSpContacts}
					setActiveTab={setActiveTab}
				/>
			)} */}

		</>
	);
}
export default ModalComp;
