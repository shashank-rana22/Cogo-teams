import { ShipmentDetailContext } from '@cogoport/context';
import { useContext } from 'react';

import useGetTaskConfig from '../../../hooks/useGetTaskConfig';
import LoadingState from '../LoadingState';

import ConfirmShipmentRate from './CustomTasks/ConfirmShipmentRate';
import UploadIndent from './CustomTasks/UploadIndent';
import ExecuteStep from './ExecuteStep';
import useTaskExecution from './helpers/useTaskExecution';

function ExecuteTask({
	task = {},
	onCancel = () => {},
	taskListRefetch = () => {},
	selectedMail = [],

}) {
	const { taskConfigData = {}, loading = true } = useGetTaskConfig({ task });

	const {
		servicesList, shipment_data, primary_service,
		getShipmentTimeline = () => {},
	} = useContext(ShipmentDetailContext);

	const {
		steps = [],
		currentStep = {},
		setCurrentStep = () => {},
		serviceIdMapping = [],
	} = useTaskExecution({ task, taskConfigData });

	const stepConfigValue = steps.length ? steps[currentStep] || steps[steps.length - 1] : {};

	if (loading) {
		return <div><LoadingState /></div>;
	}

	if (task?.task === 'mark_confirmed') {
		return (
			<ConfirmShipmentRate
				shipment_data={shipment_data}
				primaryService={primary_service}
				timeLineRefetch={getShipmentTimeline}
				task={task}
				refetch={taskListRefetch}
				onCancel={onCancel}
				servicesList={servicesList}
			/>
		);
	}

	if (task?.task === 'upload_indent') {
		return (
			<UploadIndent
				task={task}
				onCancel={onCancel}
				services={servicesList}
				refetch={taskListRefetch}
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
			uiConfig={taskConfigData?.task_config?.ui_config?.[currentStep]}
			selectedMail={selectedMail}
			serviceIdMapping={serviceIdMapping}
		/>
	);
}

export default ExecuteTask;
