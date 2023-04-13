import { Button, Loader } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import EmptyState from '@cogoport/ocean-modules/common/EmptyState';

import useListShipmentPendingTasks from '../../hooks/useListShipmentPendingTasks';

import Card from './Card';
import Header from './Header';
import styles from './styles.module.css';
import TaskExecution from './TaskExecution';

function List() {
	const {
		count, completedTaskCount, tasksList, loading, refetch,
		hideCompletedTasks, setHideCompletedTasks, handleClick, selectedTaskId,
		setSelectedTaskId, shipment_data, showMyTasks, setShowMyTasks,
	} = useListShipmentPendingTasks();

	if (loading) {
		return (
			<div className={styles.loading_container}>
				Loading Tasks....
				<Loader themeType="primary" className={styles.loader_icon} />
			</div>
		);
	}

	if ((tasksList || []).length === 0) {
		return (
			<div>
				<EmptyState />
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<Header
				count={count}
				completedTaskCount={completedTaskCount}
				hideCompletedTasks={hideCompletedTasks}
				setHideCompletedTasks={setHideCompletedTasks}
				showMyTasks={showMyTasks}
				setShowMyTasks={setShowMyTasks}
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

					<TaskExecution
						task={tasksList.find((task) => task.id === selectedTaskId)}
						onCancel={() => setSelectedTaskId(null)}
						shipment_data={shipment_data}
						refetch={refetch}
					/>
				</>
			) : null }
		</div>
	);
}

export default List;
