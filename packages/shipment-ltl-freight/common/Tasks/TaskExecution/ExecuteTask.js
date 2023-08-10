import { Loader } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { useContext } from 'react';

import useGetTaskConfig from '../../../hooks/useGetTaskConfig';

import {
	AddPaymentInfo,
	ConfirmationOnServicesTaken,
	MarkConfirmServices,
} from './CustomTasks';
import ExecuteStep from './ExecuteStep';
import useTaskExecution from './helpers/useTaskExecution';
import styles from './styles.module.css';

function ExecuteTask({
	task = {},
	onCancel = () => {},
	taskListRefetch = () => {},
	selectedMail = [],
}) {
	const { taskConfigData = {}, loading = true } = useGetTaskConfig({ task });

	const { servicesList, shipment_data, primary_service } = useContext(ShipmentDetailContext);

	const {
		steps = [],
		currentStep = {},
		setCurrentStep = () => {},
		serviceIdMapping = [],
	} = useTaskExecution({ task, taskConfigData });

	const stepConfigValue = steps.length
		? steps[currentStep] || steps[steps.length - 1]
		: {};

	if (loading) {
		return (
			<div className={styles.loader}>
				<Loader />
				Loading Task
			</div>
		);
	}

	if (task.service_type && task.task === 'mark_confirmed') {
		return (
			<MarkConfirmServices
				task={task}
				onCancel={onCancel}
				taskListRefetch={taskListRefetch}
				primaryService={primary_service}
				shipment_data={shipment_data}
				servicesList={servicesList}
			/>
		);
	}

	if (task.task === 'confirmation_on_services_taken') {
		return (
			<ConfirmationOnServicesTaken
				onCancel={onCancel}
				shipment_data={shipment_data}
				task={task}
				taskListRefetch={taskListRefetch}
			/>
		);
	}

	if (task.task === 'add_payment_info') {
		return (
			<AddPaymentInfo
				onCancel={onCancel}
				shipment_data={shipment_data}
				task={task}
				taskListRefetch={taskListRefetch}
			/>
		);
	}

	return (
		<ExecuteStep
			task={task}
			stepConfig={stepConfigValue}
			onCancel={onCancel}
			refetch={taskListRefetch}
			isLastStep={currentStep === steps.length - 1}
			currentStep={currentStep}
			setCurrentStep={setCurrentStep}
			getApisData={taskConfigData?.apis_data}
			uiConfig={taskConfigData?.task_config?.ui_config[currentStep]}
			selectedMail={selectedMail}
			serviceIdMapping={serviceIdMapping}
		/>
	);
}

export default ExecuteTask;
