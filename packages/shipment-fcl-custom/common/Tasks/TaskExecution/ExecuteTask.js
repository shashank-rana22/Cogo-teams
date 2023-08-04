import { ShipmentDetailContext } from '@cogoport/context';
import { ThreeDotLoader } from '@cogoport/ocean-modules';
import { useContext } from 'react';

import useGetTaskConfig from '../../../hooks/useGetTaskConfig';

import { MarkConfirmServices } from './CustomTasks';
import ExecuteStep from './ExecuteStep';
import useTaskExecution from './helpers/useTaskExecution';

const REDUCE_LENGTH_BY = 1;

function ExecuteTask({
	task = {},
	onCancel = () => {},
	taskListRefetch = () => {},
	selectedMail = [],
}) {
	const { taskConfigData = {}, loading = true } = useGetTaskConfig({ task });

	const {
		steps = [],
		currentStep = {},
		setCurrentStep = () => {},
		serviceIdMapping = [],
	} = useTaskExecution({ task, taskConfigData });

	const { servicesList, shipment_data, primary_service } = useContext(ShipmentDetailContext);

	const stepConfigValue = steps.length
		? steps[currentStep] || steps[steps.length - REDUCE_LENGTH_BY]
		: {};

	if (loading) {
		return <ThreeDotLoader message="Fetching Task" />;
	}

	if (
		task.service_type
		&& task.task === 'mark_confirmed'
	) {
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

	return (
		<ExecuteStep
			task={task}
			stepConfig={stepConfigValue}
			onCancel={onCancel}
			refetch={taskListRefetch}
			isLastStep={currentStep === steps.length - REDUCE_LENGTH_BY}
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
