import { Loader } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { startCase } from '@cogoport/utils';
import { useContext } from 'react';

import taskDisplayNames from '../../../../../../configurations/display-name-mappings';

import styles from './styles.module.css';

function TaskContainer({
	children = null,
	loading = false,
	pendingTask,
	actions,
}) {
	const { primary_service = {} } = useContext(ShipmentDetailContext);

	const { trade_type } = primary_service;

	const taskName = taskDisplayNames(trade_type)[pendingTask?.task]?.display_name
		|| startCase(pendingTask?.task || '');

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
