// import EmptyState from '@cogo/bookings/commons/EmptyState';
import { Loader } from '@cogoport/components';
import { useState } from 'react';

import Card from './Card';
import styles from './styles.module.css';
import Task from './Task';

function PendingTasks({
	taskList = [],
	item = {},
	shipment_type = '',
	tasksLoading = false,
	handleAccordionOpen = () => {},
	refetchForTask = () => {},
}) {
	const [selectedTask, setSelectedTask] = useState(null);

	if (tasksLoading) {
		return (
			<div className={styles.loading_container}>
				<Loader />
			</div>
		);
	}

	if (taskList.length === 0) {
		return <div>Empty State</div>;
	}

	return !selectedTask ? (
		<div style={{ padding: '16px' }}>
			{taskList.map((task, index) => (
				<Card
					task={task}
					index={index}
					handleClick={setSelectedTask}
					refetch={refetchForTask}
				/>
			))}
		</div>
	) : (
		<Task
			task={selectedTask}
			shipment_data={{ id: item?.id }}
			shipment_type={shipment_type}
			tasksLoading={false}
			primary_service={item?.freight_service || {}}
			onCancel={handleAccordionOpen}
			refetch={refetchForTask}
		/>
	);
}

export default PendingTasks;
