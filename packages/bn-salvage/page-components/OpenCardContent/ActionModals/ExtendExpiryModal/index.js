import { cl, Toast, Button, Modal } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useState } from 'react';

import FilePreview from '../../../../commons/FilePreview';
import FormElement from '../../../../commons/FormElement';
import EXTENDEXPIRYCONTROLS from '../../../../config/extendExpiryControls.json';
import STEP2CONTROLS from '../../../../config/uploadBNStep2Controls.json';
import useUpdateBookingNote from '../../../../hooks/useUpdateBookingNote';

import styles from './styles.module.css';

const FormError = () => Toast.error('Some of the fields has error(s)');

const cut_offs = [
	'vgm_cutoff',
	'si_cutoff',
	'tr_cutoff',
	'document_cutoff',
	'gate_in_cutoff',
	'si_filed_at',
	'expiry',
];

const controlsMapping = {
	step1 : EXTENDEXPIRYCONTROLS,
	step2 : STEP2CONTROLS,
};

export default function ExtendExpiryModal({ closeModal, item, successRefetch }) {
	const [currentStep, setCurrentStep] = useState('step1');

	const controls = controlsMapping[currentStep];

	const defaultValues = {};
	controls.forEach((ctrl) => {
		defaultValues[ctrl.name] = item?.[ctrl.name];
	});
	console.log(defaultValues);

	const { loading, updateBookingNote } = useUpdateBookingNote({ refetch: successRefetch });

	const { control, watch, formState: { errors }, trigger, handleSubmit } = useForm();

	const url = watch('url');

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
			{ label: 'Submit', onClick: handleSubmit(updateBookingNote, FormError) },
		],
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
			<Modal.Header title="Move To Expiry" />

			<Modal.Body className={styles.modal_body_container}>
				<div className={styles.form_container}>
					{controls.map((ctrl) => (
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
