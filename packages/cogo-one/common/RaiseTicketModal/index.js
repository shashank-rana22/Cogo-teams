import { Button, Modal } from '@cogoport/components';
import { useState } from 'react';

import TicketModal from './TicketModal';

function RaiseTicketModal({ shipmentData = {} }) {
	const [showRaiseTicket, setShowRaiseTicket] = useState(false);

	const handleClose = () => {
		setShowRaiseTicket(false);
	};

	return (
		<div>
			<Button
				size="xs"
				onClick={() => setShowRaiseTicket(true)}
			>
				Raise Ticket
			</Button>

			{showRaiseTicket && (
				<Modal
					placement="center"
					size="sm"
					show={showRaiseTicket}
					closeOnOuterClick={handleClose}
					onClose={handleClose}
				>
					<TicketModal
						shipmentData={shipmentData}
						setShowRaiseTicket={setShowRaiseTicket}
					/>
				</Modal>
			)}
		</div>
	);
}

export default RaiseTicketModal;
