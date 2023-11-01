import AdditionsServicesTasks from './AdditionalServicesTasks';
import { UploadComplianceDocs } from './CustomTasks';
import ExecuteTask from './ExecuteTask';
import ReviewDoc from './ReviewDoc';
import UploadAmendDoc from './UploadAmendDoc';

function TaskExecution({
	task = {},
	onCancel = () => {},
	taskListRefetch = () => {},
	selectedMail = [],
	setSelectedMail = () => {},
	tasksList = [],
}) {
	if (['approve_document', 'amend_document'].includes(task?.task_type)
	&& ['approve_compliance_documents', 'amend_compliance_documents'].includes(task?.task)) {
		return (
			<UploadComplianceDocs
				task={task}
				onCancel={onCancel}
				taskListRefetch={taskListRefetch}
				tasksList={tasksList}
			/>
		);
	}

	if (task?.task_type === 'approve_document') {
		return (
			<ReviewDoc
				task={task}
				onClose={onCancel}
				refetch={taskListRefetch}
			/>
		);
	}

	if (task?.task_type === 'amend_document' && task?.task !== 'amend_draft_house_bill_of_lading') {
		return (
			<UploadAmendDoc
				task={task}
				onClose={onCancel}
				refetch={taskListRefetch}
			/>
		);
	}

	if (
		['add_quote_additional_service',
			'approve_quote_additional_service',
			'approve_amended_quote',
			'amend_quote_additional_service',
		].includes(task?.task_type)
	) {
		return (
			<AdditionsServicesTasks
				onCancel={onCancel}
				task={task}
				refetch={taskListRefetch}
			/>
		);
	}
	console.log('in task executiuon');
	return (
		<ExecuteTask
			task={task}
			onCancel={onCancel}
			taskListRefetch={taskListRefetch}
			selectedMail={selectedMail}
			setSelectedMail={setSelectedMail}
			tasksList={tasksList}
		/>
	);
}

export default TaskExecution;
