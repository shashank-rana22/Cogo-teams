import { cl, Toast, Button, Modal } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { addDays } from '@cogoport/utils';
import { useState } from 'react';

import FilePreview from '../FilePreview';
import FormElement from '../FormElement';

import styles from './styles.module.css';

const cut_offs = [
	'vgm_cutoff',
	'si_cutoff',
	'tr_cutoff',
	'document_cutoff',
	'gate_in_cutoff',
	'si_filed_at',
	'expiry',
];
const prefillDateValues = [
	'schedule_departure',
	'schedule_arrival',
	'vgm_cutoff',
	'si_cutoff',
	'tr_cutoff',
	'document_cutoff',
	'gate_in_cutoff',
	'si_filed_at',
	'expiry',
];

const FormError = () => Toast.error('Some of the fields has error(s)');

export default function RenderForm({
	closeModal = () => {},
	defaultValues = {},
	controlsMapping = {},
	onFormSubmit = () => {},
	modalBodyClass,
	modalFooterClass,
}) {
	const [currentStep, setCurrentStep] = useState('step1');

	const { control, watch, formState: { errors }, trigger, handleSubmit } = useForm({ defaultValues });

	const { schedule_departure, url } = watch();

	const currentControls = controlsMapping[currentStep];

	currentControls.forEach((ctrl, index) => {
		if (ctrl.name === 'schedule_arrival') {
			currentControls[index].minDate = schedule_departure ? addDays(schedule_departure, 1) : undefined;
			currentControls[index].disable = !schedule_departure;
		}
		if (cut_offs.includes(ctrl.name)) {
			currentControls[index].maxDate = schedule_departure;
			currentControls[index].disable = !schedule_departure;
		}
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
			{ label: 'Submit', onClick: handleSubmit(onFormSubmit, FormError) },
		],
	};

	return (
		<>
			<Modal.Body className={cl`${modalBodyClass} ${currentStep}`}>
				<div className={styles.form_container}>
					{currentControls.map((ctrl) => (
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

			<Modal.Footer className={modalFooterClass}>
				{stepWiseButtons[currentStep].map(({ label, ...rest }) => (
					<Button key={label} {...rest}>
						{label}
					</Button>
				))}
			</Modal.Footer>
		</>
	);
}
