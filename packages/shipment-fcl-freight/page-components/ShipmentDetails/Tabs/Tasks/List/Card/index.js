import styles from './styles.module.css';
import TaskDetails from './TaskDetails';
import UpdateAction from './UpdateAction';
import UpdateButton from './UpdateButton';

let count = 0;
function Card({ task = {}, handleClick = () => {}, selectedTaskId = '' }) {
	count += 1;
	console.log('count of list', count);
	console.log('card', task);
	return (
		<div className={styles.container}>
			<div className={styles.row}>
				<TaskDetails task={task} />

				<UpdateButton
					task={task}
					handleClick={handleClick}
					hideButton={task.status === 'completed' || selectedTaskId.lenght}
				/>

				<UpdateAction task={task} />
			</div>

		</div>
	);
}

export default Card;
