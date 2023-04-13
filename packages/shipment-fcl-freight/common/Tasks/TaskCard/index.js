import AdditionsService from './AdditionalService';
import ExecuteTask from './ExecuteTask';
import ReviewDoc from './ReviewDoc';

function TaskCard({ task = {}, onCancel = () => {}, refetch = () => {} }) {
	// split the task on the basis of view here i.e, categorize the task into various categories
	// and make a view that hadles all the use cases

	if (task.task_type === 'approve_document') {
		return (
			<ReviewDoc
				task={task}
				onClose={onCancel}
				refetch={refetch}
			/>
		);
	}

	if (
		[
			'add_quote_additional_service',
			'approve_quote_additional_service',
			'approve_amended_quote',
			'amend_quote_additional_service',
		].includes(task?.task_type)
	) {
		return (
			<AdditionsService
				onCancel={onCancel}
				task={task}
				refetch={refetch}
			/>
		);
	}
	return (
		<div>
			<ExecuteTask task={task} onCancel={onCancel} />
		</div>
	);
}

export default TaskCard;
