import { Modal } from '@cogoport/components';
import React, { useState } from 'react';

import FeedbackForm from './FeedbackForm';
import ResignationForm from './ResignationForm';
import styles from './styles.module.css';
import TicketGenerated from './TicketGenerated';

const RESIGNATION_COMPONENT_MAPPING = {
	resignation_form: {
		render     : ResignationForm,
		modal_size : 'xl',
	},
	ticket_generation: {
		render     : TicketGenerated,
		modal_size : 'md',
	},
	feedback_form: {
		render     : FeedbackForm,
		modal_size : 'xl',
	},
};

function ApplyResignationModal({ showModal = false, setShowModal = () => {} }) {
	const [currentState, setCurrentState] = useState('resignation_form');

	const modalSize = RESIGNATION_COMPONENT_MAPPING[currentState].modal_size;
	const RenderComponent = RESIGNATION_COMPONENT_MAPPING[currentState].render;

	return (
		<div className={styles.modal_container}>
			<Modal
				size={modalSize}
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
