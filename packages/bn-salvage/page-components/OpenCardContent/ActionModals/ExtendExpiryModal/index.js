import { cl, Modal } from '@cogoport/components';
import { useState } from 'react';

import RenderForm from '../../../../commons/RenderForm';
import EXTENDEXPIRYCONTROLS from '../../../../config/extendExpiryControls.json';
import STEP2CONTROLS from '../../../../config/uploadBNStep2Controls.json';
import getCreateBookingDocumentPayload from '../../../../helpers/getCreateBookingDocumentPayload';
import getDefaultValues from '../../../../helpers/getDefaultValuesForExtendBN';
import useUpdateBookingNote from '../../../../hooks/useUpdateBookingNote';

import styles from './styles.module.css';

const controlsMapping = {
	step1 : EXTENDEXPIRYCONTROLS,
	step2 : STEP2CONTROLS,
};

export default function ExtendExpiryModal({ closeModal, item, successRefetch }) {
	const [currentStep, setCurrentStep] = useState('step1');

	const controls = controlsMapping[currentStep];

	const defaultValues = getDefaultValues({ controlsMapping, item });

	const { loading, updateBookingNote } = useUpdateBookingNote({ refetch: successRefetch });

	const onFormSubmit = (formData) => {
		updateBookingNote(getCreateBookingDocumentPayload(formData));
	};

	return (
		<Modal
			show
			onClose={closeModal}
			showCloseIcon={!loading}
			closeOnOuterClick={false}
			className={cl`${styles.modal_container} ${styles[currentStep]}`}
			size={currentStep === 'step2' ? 'xl' : 'lg'}
		>
			<Modal.Header title="Extend Expiry of Booking Note" />

			<RenderForm
				closeModal={closeModal}
				controls={controls}
				defaultValues={defaultValues}
				onFormSubmit={onFormSubmit}
				modalBodyClass={styles.modal_body_container}
				modalFooterClass={styles.modal_footer}
				currentStep={currentStep}
				setCurrentStep={setCurrentStep}
			/>
		</Modal>
	);
}
