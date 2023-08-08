import { Button, Modal } from '@cogoport/components';
import React from 'react';

function DeleteConfigurationModal({
	showModal,
	setShowModal,
	onClickButton,
	label,
	deleteLoading,
}) {
	return (
		<div>
			<Modal
				size="md"
				show={showModal}
				onClose={() => setShowModal(false)}
				placement="center"
			>
				<Modal.Header title={`Delete ${label}`} />

				<Modal.Body>{`Are you sure you want to delete this ${label}?`}</Modal.Body>

				<Modal.Footer>
					<Button
						themeType="primary"
						onClick={onClickButton}
						loading={deleteLoading}
					>
						Delete
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default DeleteConfigurationModal;
