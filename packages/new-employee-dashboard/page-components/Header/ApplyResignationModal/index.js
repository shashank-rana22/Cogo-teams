import { Modal } from '@cogoport/components';
import React, { useState } from 'react';

import FeedbackForm from './FeedbackForm';
import ResignationForm from './ResignationForm';
import styles from './styles.module.css';
import TicketGenerated from './TicketGenerated';

const RESIGNATION_COMPONENT_MAPPING = {
	resignation_form  : ResignationForm,
	ticket_generation : TicketGenerated,
	feedback_form     : FeedbackForm,
};

function ApplyResignationModal({ showModal = false, setShowModal = () => {} }) {
	const [currentState, setCurrentState] = useState('resignation_form');

	const RenderComponent = RESIGNATION_COMPONENT_MAPPING[currentState];

	return (
		<div className={styles.modal_container}>
			<Modal
				size="xl"
				show={showModal}
				closeOnOuterClick={false}
				showCloseIcon={false}
			>
				<Modal.Header title="Apply Resignation" />

				<Modal.Body>
					<RenderComponent
						setShowModal={setShowModal}
						currentState={currentState}
						setCurrentState={setCurrentState}
					/>
				</Modal.Body>
			</Modal>
		</div>
	);
}

export default ApplyResignationModal;
