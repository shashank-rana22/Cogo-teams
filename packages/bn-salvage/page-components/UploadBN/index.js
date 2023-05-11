import { Modal } from '@cogoport/components';
import { useState } from 'react';

import RenderForm from '../../commons/RenderForm';
import useCreateBookingNote from '../../hooks/useCreateBookingNote';

import styles from './styles.module.css';

export default function UploadBN({ setShow, refetchList }) {
	const [currentStep, setCurrentStep] = useState('step1');

	const [scheduleDeparture, setScheduleDeparture] = useState();

	const closeModal = () => setShow(false);

	const { controls, loading, createBookingNote } = useCreateBookingNote({
		scheduleDeparture,
		closeModal,
		currentStep,
		refetchList,
	});

	return (
		<Modal
			show
			onClose={closeModal}
			showCloseIcon={!loading}
			closeOnOuterClick={false}
			className={styles.modal_container}
			size={currentStep === 'step2' ? 'xl' : 'lg'}
		>
			<Modal.Header title="Upload Booking Note" />

			<RenderForm
				closeModal={closeModal}
				controls={controls}
				onFormSubmit={createBookingNote}
				modalBodyClass={styles.modal_body_container}
				modalFooterClass={styles.modal_footer}
				setScheduleDeparture={setScheduleDeparture}
				currentStep={currentStep}
				setCurrentStep={setCurrentStep}
			/>
		</Modal>
	);
}
