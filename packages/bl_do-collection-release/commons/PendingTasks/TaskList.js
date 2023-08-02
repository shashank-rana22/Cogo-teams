import { Loader } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useState } from 'react';

import EmptyState from '../EmptyState';

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
				<div> Loading Task</div>
			</div>
		);
	}

	if (taskList.length === GLOBAL_CONSTANTS.zeroth_index) {
		return (
			<div>
				<EmptyState
					heading="No Task found !!"
					subHeading="Looks like this task has not been created yet,
					please complete previous tasks first!!"
				/>
			</div>
		);
	}

	return !selectedTask ? (
		<div style={{ padding: '16px' }}>
			{taskList.map((task, index) => (
				<Card
					task={task}
					index={index}
					handleClick={setSelectedTask}
					refetch={refetchForTask}
					key={task.id}
				/>
			))}
		</div>
	) : (
		<Task
			shipment_data={item}
			task={selectedTask}
			shipment_type={shipment_type}
			onCancel={handleAccordionOpen}
			refetch={refetchForTask}
		/>
	);
}

export default PendingTasks;
