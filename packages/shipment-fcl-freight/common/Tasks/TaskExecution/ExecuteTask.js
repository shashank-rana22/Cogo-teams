import useGetTaskConfig from '../../../hooks/useGetTaskConfig';

import { UploadBookingNote, MarkConfirmServices } from './CustomTasks';
import ExecuteStep from './ExecuteStep';
import useTaskExecution from './helpers/useTaskExecution';

const excludeServices = [
	'fcl_freight_service',
	'haulage_freight_service',
];
const includeServices = ['air_freight_service', 'lcl_freight_service'];

function ExecuteTask({ task = {}, onCancel = () => {}, taskListRefetch = () => {} }) {
	const { taskConfigData, loading } = useGetTaskConfig({ task });

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

	if (
		task?.service_type
		&& task?.task === 'mark_confirmed'
		&& (!excludeServices.includes(task?.service_type))
	) {
		return (
			<MarkConfirmServices
				task={task}
				onCancel={onCancel}
				taskListRefetch={taskListRefetch}
				primaryService={primaryService}
			/>
		);
	}

	if (
		task.task === 'upload_draft_bill_of_lading' && primaryService?.trade_type === 'export'
	) {
		return (
			<div>Draft bl flow for export</div>
		);
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

	if (task?.task === 'amend_draft_house_bill_of_lading') {
		return <div>Amend draft bl flow</div>;
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
