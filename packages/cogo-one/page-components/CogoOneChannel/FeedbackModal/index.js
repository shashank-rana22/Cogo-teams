import { Modal } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import Feedback from './Feedback';
import styles from './styles.module.css';
import TicketChat from './TicketChat';

function FeedbackModal({ showFeedback = false, setShowFeedback = () => {} }) {
	const [modalData, setModalData] = useState({});
	const [isInternal, setIsInternal] = useState(true);
	const [showReassign, setShowReassign] = useState(false);

	const handleClose = () => {
		setShowFeedback(false);
	};

	return (
		<Modal
			size="sm"
			scroll={false}
			show={showFeedback}
			onClose={handleClose}
			showCloseIcon={false}
			placement="right"
			className={styles.modal_container}
		>
			<Modal.Body className={styles.modal_body}>
				{isEmpty(modalData)
					? <Feedback setModalData={setModalData} />
					: (
						<TicketChat
							modalData={modalData}
							setModalData={setModalData}
							isInternal={isInternal}
							setIsInternal={setIsInternal}
							showReassign={showReassign}
							setShowReassign={setShowReassign}
						/>
					)}
			</Modal.Body>
		</Modal>
	);
}

export default FeedbackModal;
