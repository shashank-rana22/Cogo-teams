// import { ShipmentDetailContext } from '@cogoport/context';
// import { useContext } from 'react';

import useGetTaskConfig from '../../../hooks/useGetTaskConfig';
import LoadingState from '../LoadingState';

import ExecuteStep from './ExecuteStep';
import useTaskExecution from './helpers/useTaskExecution';

function ExecuteTask({
	task = {},
	onCancel = () => {},
	taskListRefetch = () => {},
	selectedMail = [],
	// setSelectedMail = () => {},
	// services = [],
}) {
	const { taskConfigData = {}, loading = true } = useGetTaskConfig({ task });
	// const { mailLoading = true } = useTaskRpa({ setSelectedMail, task });

	// const { servicesList, shipment_data, primary_service } = useContext(ShipmentDetailContext);

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
