import useGetTaskConfig from '../../../hooks/useGetTaskConfig';

import ExecuteStep from './ExecuteStep';
import useTaskExecution from './helpers/useTaskExecution';

function ExecuteTask({ task = {}, onCancel = () => {}, refetch = () => {} }) {
	const { taskConfigData, loading } = useGetTaskConfig({ task, onCancel });

	const {
		steps,
		currentStep,
		setCurrentStep,
		primaryService,
	} = useTaskExecution({ task, taskConfigData });

	const stepConfigValue = steps.length
		? steps[currentStep] || steps[steps.length - 1]
		: {};
	console.log('laoding', loading);

	return (
		<div>
			<ExecuteStep
				task={task}
				stepConfig={stepConfigValue}
				onCancel={onCancel}
				refetch={refetch}
				primaryService={primaryService}
				isLastStep={currentStep === steps.length - 1}
				currentStep={currentStep}
				setCurrentStep={setCurrentStep}
				getApisData={taskConfigData?.apis_data}
				uiConfig={taskConfigData?.task_config?.ui_config[currentStep]}
			/>
		</div>
	);
}

export default ExecuteTask;
