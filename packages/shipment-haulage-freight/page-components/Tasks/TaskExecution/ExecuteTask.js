import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import useGetTaskConfig from '../../../hooks/useGetTaskConfig';
import LoadingState from '../LoadingState';

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
		steps = [],
		currentStep = {},
		setCurrentStep = () => {},
		serviceIdMapping = [],
	} = useTaskExecution({ task, taskConfigData });

	const stepConfigValue = steps.length ? steps[currentStep] || steps[steps.length - GLOBAL_CONSTANTS.one] : {};

	if (loading) {
		return <div><LoadingState /></div>;
	}

	return (
		<ExecuteStep
			task={task}
			stepConfig={stepConfigValue}
			onCancel={onCancel}
			refetch={taskListRefetch}
			isLastStep={currentStep === steps.length - GLOBAL_CONSTANTS.one}
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
