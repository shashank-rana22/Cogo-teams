import useListShipmentPendingTasks from '../../../../../hooks/useListShipmentPendingTasks';

import Card from './Card';
import Header from './Header';
import styles from './styles.module.css';

function List() {
	const {
		count, completedTaskCount, tasksList, loading,
		shipmentData, setHideCompletedTasks,
	} = useListShipmentPendingTasks();

	console.log('task', loading, shipmentData);

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
        (tasksList || []).map((task) => <Card task={task} />)
      }
		</div>
	);
}

export default List;
