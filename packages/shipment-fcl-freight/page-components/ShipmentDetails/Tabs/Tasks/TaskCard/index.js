import ExecuteTask from './ExecuteTask';

function TaskCard({ task = {}, onCancel = () => {}, refetch = () => {} }) {
	// split the task on the basis of view here i.e, categorize the task into various categories
	// and make a view that hadles all the use cases

	console.log('sfsdfs', refetch);
	return (
		<div>
			<ExecuteTask task={task} onCancel={onCancel} />
		</div>
	);
}

export default TaskCard;
