import { Modal } from '@cogoport/components';

import TicketModal from './TicketModal';

function RaiseTicketModal({
	shipmentData = {},
	setShowRaiseTicket = () => {},
	showRaiseTicket = false,
}) {
	const handleClose = () => {
		setShowRaiseTicket(false);
	};

	if (!showRaiseTicket) {
		return null;
	}

	return (
		<Modal
			placement="center"
			size="sm"
			show
			closeOnOuterClick={handleClose}
			onClose={handleClose}
		>
			<TicketModal
				shipmentData={shipmentData}
				setShowRaiseTicket={setShowRaiseTicket}
			/>
		</Modal>
	);
}

export default RaiseTicketModal;
