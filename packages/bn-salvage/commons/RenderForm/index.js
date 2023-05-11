import { Toast, Button, Modal } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useEffect } from 'react';

import FilePreview from '../FilePreview';
import FormElement from '../FormElement';

import styles from './styles.module.css';

const FormError = () => Toast.error('Some of the fields has error(s)');

export default function RenderForm({
	closeModal = () => {},
	defaultValues = {},
	controls,
	onFormSubmit = () => {},
	modalBodyClass,
	modalFooterClass,
	currentStep,
	setCurrentStep = () => {},
	setScheduleDeparture = () => {},
}) {
	const { control, watch, formState: { errors }, trigger, handleSubmit } = useForm({ defaultValues });

	const { schedule_departure, url } = watch();

	useEffect(() => {
		setScheduleDeparture(schedule_departure);
	}, [schedule_departure, setScheduleDeparture]);

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
			<Modal.Body className={modalBodyClass}>
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
