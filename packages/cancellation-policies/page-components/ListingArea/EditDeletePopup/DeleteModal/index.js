import { Button, Modal } from '@cogoport/components';
import React, { useState } from 'react';

function DeleteModal() {
	const [showDeleteModal, setShowDeleteModal] = useState(false);

	const onCloseDeleteModal = () => {
		setShowDeleteModal(false);
	};
	return (
		<div>
			<hr />
			<Button themeType="tertiary" onClick={() => setShowDeleteModal(true)}>Delete</Button>
			<Modal size="md" show={showDeleteModal} onClose={onCloseDeleteModal} placement="middle">
				<Modal.Header title="Are you sure?" />
				<Modal.Body>
					Are you sure
				</Modal.Body>
				<Modal.Footer>
					<Button themeType="primary" onClick={onCloseDeleteModal}>No1</Button>
					<Button themeType="secondary" onClick={onCloseDeleteModal}>Yes</Button>

				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default DeleteModal;
