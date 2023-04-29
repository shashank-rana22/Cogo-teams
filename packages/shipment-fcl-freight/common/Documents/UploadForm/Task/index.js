import { useState } from 'react';

import TaskCard from '../../../Tasks/TaskExecution';

import styles from './styles.module.css';

function Task({ showDoc = {}, setShowDoc = () => {}, refetch = () => {} }) {
	const [pendingTask, setPendingTask] = useState({});
	const { pendingItem = {} } = showDoc;

	const handleClick = () => {
		setShowDoc(null);
		setPendingTask({
			...pendingTask,
			[pendingItem.id]: !pendingTask?.[pendingItem?.id],
		});
	};

	return (
		<div className={styles.container}>
			<TaskCard
				task={pendingItem}
				onCancel={() => handleClick(pendingItem)}
				refetch={refetch}
				type="modal"
			/>
		</div>

	);
}

export default Task;
