import useListShipmentPendingTasks from '../../../../../hooks/useListShipmentPendingTasks';
import TaskCard from '../TaskCard';

import Card from './Card';
import Header from './Header';
import styles from './styles.module.css';

function List() {
	const {
		count, completedTaskCount, tasksList, loading,
		setHideCompletedTasks, handleClick, selectedTaskId, setSelectedTaskId,
		shipment_data,
	} = useListShipmentPendingTasks();

	if (loading) {
		return (
			<div className={styles.container}>
				Loading
			</div>
		);
	} if ((tasksList || []).length === 0) {
		return (
			<div>
				Empty State
			</div>
		);
	}
	return (
		<div className={styles.container}>
			<Header
				count={count}
				completedTaskCount={completedTaskCount}
				setHideCompletedTasks={setHideCompletedTasks}
			/>

			{
				selectedTaskId ? (
					<div className={styles.see_all_tasks} onClick={() => setSelectedTaskId(null)}>
						<img
							src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/arrow.svg"
							alt="arrow"
						/>
						<div>See All Tasks</div>
					</div>
				) : null
			}

			{!selectedTaskId ? (tasksList || []).map((task) => <Card task={task} handleClick={handleClick} />) : null}

			{selectedTaskId ? (
				<>
					<Card
						task={tasksList.find((task) => task.id === selectedTaskId)}
						handleClick={handleClick}
						isTaskOpen
					/>

					<TaskCard
						task={tasksList.find((task) => task.id === selectedTaskId)}
						shipment_data={shipment_data}
					/>
				</>
			) : null }
		</div>
	);
}

export default List;
