import useGetTaskConfig from '../../../hooks/useGetTaskConfig';

import ExecuteStep from './ExecuteStep';
import useTaskExecution from './helpers/useTaskExecution';

function ExecuteTask({
	task = {},
	onCancel = () => {},
	taskListRefetch = () => {},
	primary_service = {},
	servicesList = [],
}) {
	const { taskConfigData, loading } = useGetTaskConfig({ task });

	const {
		steps,
		currentStep,
		setCurrentStep,
		serviceIdMapping,
	} = useTaskExecution({ task, taskConfigData, primary_service, servicesList });

	const stepConfigValue = steps.length
		? steps[currentStep] || steps[steps.length - 1]
		: {};

	return (
		<ExecuteStep
			task={task}
			stepConfig={stepConfigValue}
			onCancel={onCancel}
			refetch={taskListRefetch}
			primary_service={primary_service}
			isLastStep={currentStep === steps.length - 1}
			currentStep={currentStep}
			setCurrentStep={setCurrentStep}
			getApisData={taskConfigData?.apis_data}
			uiConfig={taskConfigData?.task_config?.ui_config[currentStep]}
			serviceIdMapping={serviceIdMapping}
		/>
	);
}

export default ExecuteTask;
