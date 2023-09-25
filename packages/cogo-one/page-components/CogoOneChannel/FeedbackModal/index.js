import { Modal } from '@cogoport/components';
import React from 'react';

import Feedback from './Feedback';
// import styles from './styles.module.css';

function FeedbackModal({ showFeedback = false, setShowFeedback = () => {} }) {
	const handleClose = () => {
		setShowFeedback(false);
	};

	return (
		<Modal
			size="sm"
			scroll={false}
			show={showFeedback}
			onClose={handleClose}
			placement="right"
		>
			<Modal.Body>
				<Feedback />
			</Modal.Body>
		</Modal>
	);
}

export default FeedbackModal;
