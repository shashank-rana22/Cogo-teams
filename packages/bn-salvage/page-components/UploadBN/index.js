import { Toast, Button, Modal } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useState } from 'react';

import FilePreview from '../../commons/FilePreview';
import FormElement from '../../commons/FormElement';
import useCreateBookingNote from '../../hooks/useCreateBookingNote';

import styles from './styles.module.css';

const FormError = () => Toast.error('Some of the fields has error(s)');

export default function UploadBN({ setShow, refetchList }) {
	const [currentStep, setCurrentStep] = useState('step1');

	const closeModal = () => setShow(false);

	const { control, watch, formState: { errors }, trigger, handleSubmit } = useForm();

	const { schedule_departure, url } = watch();

	const { controls, loading, createBookingNote } = useCreateBookingNote({
		schedule_departure,
		closeModal,
		currentStep,
		refetchList,
	});

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
			{ label: 'Submit', onClick: handleSubmit(createBookingNote, FormError) },
		],
	};

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

			<Modal.Body className={styles.modal_body_container}>
				<div className={styles.form_container}>
					{controls.map((item) => (
						<FormElement
							key={item.name}
							control={control}
							errors={errors}
							{...item}
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
