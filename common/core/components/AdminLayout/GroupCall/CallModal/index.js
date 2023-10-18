import { Modal } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function CallModal({
	url = '',
	showDeleteModal = false,
	setShowDeleteModal = () => {},
}) {
	if (!url) {
		return null;
	}

	return (
		<Modal show={showDeleteModal} size="fullscreen" placement="center" onClose={() => setShowDeleteModal(false)}>
			<Modal.Header title="Video Call" className={styles.modal_header} />
			<Modal.Body className={styles.modal_body}>
				<iframe
					allow="camera; microphone; display-capture; fullscreen; clipboard-read; clipboard-write; autoplay"
					src={url}
					type="application/pdf"
					width="100%"
					height="100%"
					title="Document"
					style={{ border: 'none' }}
				/>
			</Modal.Body>
		</Modal>
	);
}

export default CallModal;
