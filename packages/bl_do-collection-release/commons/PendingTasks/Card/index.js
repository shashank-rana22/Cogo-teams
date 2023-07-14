import styles from './styles.module.css';
import TaskDetails from './TaskDetails';
import UpdateAction from './UpdateAction';
import UpdateButton from './UpdateButton';

function Card({
	task = {},
	handleClick = () => {},
}) {
	const handleChange = (newMails) => {
		handleClick(task, newMails);
	};

	return (
		<div className={styles.container}>

			<TaskDetails task={task} />

			<div className={styles.action}>
				<UpdateButton
					task={task}
					handleClick={handleClick}
					handleChange={handleChange}
					hideButton={task.status === 'completed'}
				/>

				<UpdateAction
					task={task}
					hideThreeDots={task.status === 'completed'}
				/>
			</div>
		</div>
	);
}

export default Card;
