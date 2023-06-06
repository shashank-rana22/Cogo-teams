import ExecuteTask from './ExecuteTask';
import ReviewDoc from './ReviewDoc';
import UploadAmendDoc from './UploadAmendDoc';

function TaskExecution({
	task = {},
	onCancel = () => {},
	taskListRefetch = () => {},
	selectedMail = [],
	setSelectedMail = () => {},
}) {
	if (task?.task_type === 'approve_document') {
		return (
			<ReviewDoc
				task={task}
				onClose={onCancel}
				refetch={taskListRefetch}
			/>
		);
	}

	if (task?.task_type === 'amend_document') {
		return (
			<UploadAmendDoc
				task={task}
				onClose={onCancel}
				refetch={taskListRefetch}
			/>
		);
	}

	return (
		<ExecuteTask
			task={task}
			onCancel={onCancel}
			taskListRefetch={taskListRefetch}
			selectedMail={selectedMail}
			setSelectedMail={setSelectedMail}
		/>
	);
}

export default TaskExecution;
