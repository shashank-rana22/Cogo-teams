import { Button } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';

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
					<Button
						className={styles.see_all_tasks}
						onClick={() => setSelectedTaskId(null)}
						themeType="link"
						size="md"
					>
						<IcMArrowBack width={50} />
						<div style={{ width: 200 }}>See All Tasks</div>
					</Button>
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
						onCancel={() => { setSelectedTaskId(null); }}
						shipment_data={shipment_data}
					/>
				</>
			) : null }
		</div>
	);
}

export default List;
