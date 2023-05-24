import AdditionsServicesTasks from './AdditionalServicesTasks';
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
	console.log('ins');
	if (task?.task_type === 'amend_document' && task?.task !== 'amend_draft_house_bill_of_lading') {
		return (
			<UploadAmendDoc
				task={task}
				onClose={onCancel}
				refetch={taskListRefetch}
			/>
		);
	}

	switch (task?.task_type) {
		case 'approve_document':
			return (
				<ReviewDoc
					task={task}
					onClose={onCancel}
					refetch={taskListRefetch}
				/>
			);

		case 'add_quote_additional_service':
		case 'approve_quote_additional_service':
		case 'approve_amended_quote':
		case 'amend_quote_additional_service':
			return (
				<AdditionsServicesTasks
					onCancel={onCancel}
					task={task}
					refetch={taskListRefetch}
				/>
			);

		default:
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
}

export default TaskExecution;
