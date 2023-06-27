import styles from './styles.module.css';
import TaskDetails from './TaskDetails';
import UpdateAction from './UpdateAction';
import UpdateButton from './UpdateButton';

function Card({
	task = {},
	handleClick = () => {},
	selectedTaskId = '',
	isTaskOpen = false,
	refetch = () => {},
	servicesList = [],
}) {
	const handleChange = (newMails) => {
		handleClick(task, newMails);
	};

	return (
		<div className={styles.container}>
			<TaskDetails task={task} isTaskOpen={isTaskOpen} servicesList={servicesList} />

			<div className={styles.action}>
				{isTaskOpen ? (
					null
				) : (
					<UpdateButton
						task={task}
						handleClick={handleClick}
						handleChange={handleChange}
						hideButton={task.status === 'completed' || selectedTaskId.length}
						disabledTaskButton={task?.disabled}
					/>
				)}

				<UpdateAction
					task={task}
					hideThreeDots={task.status === 'completed'}
					refetch={refetch}
					services={servicesList}
				/>
			</div>
		</div>
	);
}

export default Card;
