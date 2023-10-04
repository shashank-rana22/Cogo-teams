import { Modal, Button } from '@cogoport/components';
import React from 'react';

function CreateVendorModal({
	setShowModal,
	showModal = false,
}) {
	return (
		<Modal size="md" show={showModal} onClose={() => setShowModal(false)} placement="center">
			<Modal.Header title="Create Vendor" />
			<Modal.Body>
				through Vendor CRM
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={() => setShowModal(false)}>OK</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default CreateVendorModal;
