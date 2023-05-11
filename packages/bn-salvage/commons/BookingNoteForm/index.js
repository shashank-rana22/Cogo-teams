import { Toast, Button, Modal } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useState } from 'react';

import getModifiedControls from '../../helpers/getModifiedControls';
import FilePreview from '../FilePreview';
import FormElement from '../FormElement';

import styles from './styles.module.css';

const FormError = () => Toast.error('Some of the fields has error(s)');

export default function BookingNoteForm({
	closeModal = () => {},
	defaultValues = {},
	controlsMapping = {},
	onFormSubmit = () => {},
	loading,
	modalHeader = 'Upload Booking Note',
}) {
	const [currentStep, setCurrentStep] = useState('step1');

	const { control, watch, formState: { errors }, trigger, handleSubmit } = useForm({ defaultValues });

	const { schedule_departure, url } = watch();

	const currentControls = controlsMapping[currentStep];
	const modifiedControls = getModifiedControls(currentControls, schedule_departure);

	const currentUrl = typeof url === 'object' ? url?.finalUrl : url;

	const goToStep2 = async () => {
		const isFormValid = await trigger();

		(isFormValid ? setCurrentStep : FormError)('step2');
	};

	const stepWiseButtons = {
		step1: [
			{ label: 'Cancel', onClick: closeModal, themeType: 'secondary' },
			{ label: 'Next', onClick: goToStep2 },
		],
		step2: [
			{ label: 'Back', onClick: () => setCurrentStep('step1'), themeType: 'secondary' },
			{ label: 'Submit', onClick: handleSubmit(onFormSubmit, FormError) },
		],
	};

	return (
		<Modal
			show
			onClose={closeModal}
			showCloseIcon={!loading}
			closeOnOuterClick={false}
			className={styles[currentStep]}
		>
			<Modal.Header title={modalHeader} />

			<Modal.Body className={styles.modal_body}>
				<div className={styles.form_container}>
					{modifiedControls.map((ctrl) => (
						<FormElement
							key={ctrl.name}
							control={control}
							errors={errors}
							{...ctrl}
						/>
					))}
				</div>

				{currentStep === 'step2' ? (
					<FilePreview url={currentUrl} />
				) : null}
			</Modal.Body>

			<Modal.Footer className={styles.modal_footer}>
				{stepWiseButtons[currentStep].map(({ label, ...rest }) => (
					<Button key={label} {...rest}>
						{label}
					</Button>
				))}
			</Modal.Footer>
		</Modal>
	);
}
