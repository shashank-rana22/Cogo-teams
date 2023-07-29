import React from 'react';
import { Modal, Button } from '@cogoport/components';
import useCreateShipmentTerminalService from '../../../../../hooks/useCreateShipmentTerminalServiceTask';


function ConfirmTerminalChargeModal({
	terminalChargeModal = false,
	setTerminalChargeModal = () => {},
	shipment_id = '',
}) {


	const { createShipmentTerminalService, loading } =
		useCreateShipmentTerminalService({
			shipment_id,
			setTerminalChargeModal,
		});

	const handleSubmit = () => {
		createShipmentTerminalService();
	};

	const handleCloseModal = () => {
		if (!loading) {
			setTerminalChargeModal(false);
		}
	};

	return (
		<div>
			<Modal
				show={terminalChargeModal}
				onClose={() => handleCloseModal()}
				onOuterClick={() => handleCloseModal()}
			>
				<Modal.Header
					title='Add Terminal Charges'
				/>
				<Modal.Body>
					<div>
						Do You Want To Take Terminal Charges?
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button
						onClick={() => setTerminalChargeModal(false)}
						disabled={loading}
						class
					>
						No

					</Button>
					<Button onClick={() => handleSubmit()} disabled={loading}>
						Yes
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}
export default ConfirmTerminalChargeModal;
