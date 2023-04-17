import useGetTaskConfig from '../../../hooks/useGetTaskConfig';

import { UploadBookingNote } from './CustomTasks';
import ExecuteStep from './ExecuteStep';
import useTaskExecution from './helpers/useTaskExecution';

function ExecuteTask({ task = {}, onCancel = () => {}, taskListRefetch = () => {} }) {
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

	if (loading) {
		return <div>Loading...</div>;
	}

	if (task.task === 'upload_booking_note') {
		return (
			<UploadBookingNote
				task={task}
				onCancel={onCancel}
				taskListRefetch={taskListRefetch}
				taskConfigData={taskConfigData}
			/>
		);
	}

	return (
	// <div>
		<ExecuteStep
			task={task}
			stepConfig={stepConfigValue}
			onCancel={onCancel}
			refetch={taskListRefetch}
			primaryService={primaryService}
			isLastStep={currentStep === steps.length - 1}
			currentStep={currentStep}
			setCurrentStep={setCurrentStep}
			getApisData={taskConfigData?.apis_data}
			uiConfig={taskConfigData?.task_config?.ui_config[currentStep]}
		/>
	// </div>
	);
}

export default ExecuteTask;
