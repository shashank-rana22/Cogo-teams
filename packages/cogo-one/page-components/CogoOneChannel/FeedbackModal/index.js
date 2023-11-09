import { Modal } from '@cogoport/components';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import Feedback from './Feedback';
import styles from './styles.module.css';
import TicketChat from './TicketChat';

function FeedbackModal({ showFeedback = false, setShowFeedback = () => {} }) {
	const { partnerId = '' } = useSelector(({ profile }) => ({
		partnerId: profile?.partner?.id,
	}));

	const [modalData, setModalData] = useState({});
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
							showReassign={showReassign}
							setShowReassign={setShowReassign}
							partnerId={partnerId}
						/>
					)}
			</Modal.Body>
		</Modal>
	);
}

export default FeedbackModal;
