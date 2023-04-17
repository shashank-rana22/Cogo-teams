import AdditionsServicesTasks from './AdditionalServicesTasks';
import ExecuteTask from './ExecuteTask';
import ReviewDoc from './ReviewDoc';

function TaskExecution({ task = {}, onCancel = () => {}, taskListRefetch = () => {} }) {
	// split the task on the basis of view here i.e, categorize the task into various categories
	// and make a view that hadles all the use cases

	if (task.task_type === 'approve_document') {
		return (
			<ReviewDoc
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
	return (
		<ExecuteTask task={task} onCancel={onCancel} taskListRefetch={taskListRefetch} />
	);
}

export default TaskExecution;
