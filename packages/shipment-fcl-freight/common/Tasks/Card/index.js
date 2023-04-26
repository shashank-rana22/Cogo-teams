import styles from './styles.module.css';
import TaskDetails from './TaskDetails';
import UpdateAction from './UpdateAction';
import UpdateButton from './UpdateButton';

function Card({ task = {}, handleClick = () => {}, selectedTaskId = '', isTaskOpen = false }) {
	return (
		<div className={styles.container}>

			<TaskDetails task={task} isTaskOpen={isTaskOpen} />

			<div className={styles.action}>
				{isTaskOpen ? (
					null
				) : (
					<UpdateButton
						task={task}
						handleClick={handleClick}
						hideButton={task.status === 'completed' || selectedTaskId.length}
					/>
				)}

				<UpdateAction task={task} />
			</div>
		</div>
	);
}

export default Card;
