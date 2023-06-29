import { Layout } from '@cogoport/air-modules';
import { Button, Modal } from '@cogoport/components';
import { useState } from 'react';

import ConfirmationEditParamsModal from './ConfirmationEditParamsModal';
import useHandleSubmit from './helpers/useHandleSubmit';
import useStepExecution from './helpers/useStepExecution';
import styles from './styles.module.css';
import checkAWBValidation from './utils/checkAWBNumberValidation';

function ExecuteStep({
	task = {},
	stepConfig = {},
	onCancel = () => {},
	refetch = () => {},
	currentStep = 0,
	isLastStep = false,
	getApisData = {},
	selectedMail = [],
	serviceIdMapping = [],
	shipment_data = {},
	primary_service = {},
	getShipment = () => {},
	getShipmentTimeline = () => {},
	services = [],
	tradeType,
}) {
	const [showEditParamsModal, setShowEditParamsModal] = useState(false);
	const [updateModal, setUpdateModal] = useState(true);

	const showUpdateParams = ((task?.task === 'upload_export_cargo_tracking_slip'
			&& tradeType === 'export')
			|| (task?.task === 'upload_airway_bill'
				&& tradeType === 'import')
			|| task?.task === 'confirm_booking')
		&& task?.shipment_type === 'air_freight'
		&& isLastStep;

	const buttonLabel = isLastStep ? 'Submit' : 'Next';

	const { formProps, fields, showElements } = useStepExecution({
		task,
		stepConfig,
		getApisData,
		selectedMail,
		shipment_data,
		primary_service,
		services,
		onCancel,
		refetch,
	});

	const { control, formState: { errors }, handleSubmit, watch } = formProps;

	const { loading: isLoading, onSubmit } = useHandleSubmit({
		finalConfig: stepConfig,
		task,
		onCancel,
		refetch,
		serviceIdMapping,
		currentStep,
		isLastStep,
		getApisData,
		showElements,
		getShipment,
		getShipmentTimeline,
		services,
	});

	const formValues = watch();

	const handleSubmitClick = async () => {
		if (stepConfig.end_point || isLastStep) {
			if (formValues?.booking_reference_number
				&& !checkAWBValidation(formValues?.booking_reference_number)) {
				return;
			}
			await handleSubmit(onSubmit)();
		}
	};

	const handleClick = () => {
		if (showUpdateParams && updateModal) {
			handleSubmit(() => setShowEditParamsModal((prev) => !prev))();
		} else {
			handleSubmitClick();
		}
	};

	return (
		<div className={styles.task_container}>
			<div className={styles.form}>
				<Layout
					fields={fields}
					control={control}
					errors={errors}
					showElements={showElements}
					formValues={formValues}
				/>
			</div>

			<div className={styles.button_container}>
				<Button
					themeType="secondary"
					onClick={onCancel}
					disabled={isLoading}
				>
					CANCEL
				</Button>

				<Button
					themeType="primary"
					disabled={isLoading}
					onClick={handleClick}
				>
					{showUpdateParams && updateModal ? 'Update' : buttonLabel}
				</Button>
			</div>
			{showEditParamsModal && (
				<Modal
					show={showEditParamsModal}
					onClose={() => setShowEditParamsModal(false)}
					size="lg"
				>
					<ConfirmationEditParamsModal
						shipment_data={primary_service}
						services={services}
						setUpdateModal={setUpdateModal}
						setShowEditParamsModal={setShowEditParamsModal}
						task={task?.task}
					/>
				</Modal>
			)}
		</div>
	);
}

export default ExecuteStep;
