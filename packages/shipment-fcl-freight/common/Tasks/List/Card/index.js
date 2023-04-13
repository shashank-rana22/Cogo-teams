import styles from './styles.module.css';
import TaskDetails from './TaskDetails';
import UpdateAction from './UpdateAction';
import UpdateButton from './UpdateButton';

function Card({ task = {}, handleClick = () => {}, selectedTaskId = '', isTaskOpen = false }) {
	return (
		<div className={styles.container}>
			<div className={styles.row}>
				<TaskDetails task={task} />

				{isTaskOpen ? (
					null
				) : (
					<UpdateButton
						task={task}
						handleClick={handleClick}
						hideButton={task.status === 'completed' || selectedTaskId.lenght}
					/>
				)}

				<UpdateAction task={task} />
			</div>

		</div>
	);
}

export default Card;
