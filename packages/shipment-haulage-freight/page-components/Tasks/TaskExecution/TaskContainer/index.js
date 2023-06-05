import { Loader } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function TaskContainer({
	children = null,
	loading = false,
	pendingTask,
	actions,
}) {
	const taskName = startCase(pendingTask?.task || '');

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.text}>{startCase(taskName)}</div>
				{loading ? null : <div className={styles.action_container}>{actions}</div>}
			</div>

			{loading ? (
				<div className={styles.loader}>
					<Loader />
				</div>
			) : children}
		</div>
	);
}

export default TaskContainer;
