import { Loader } from '@cogoport/components';
import getTradeTypeByIncoTerm from '@cogoport/globalization/utils/getTradeTypeByIncoTerm';
import { startCase } from '@cogoport/utils';
import React from 'react';

import taskDisplayName from '../../../../configs/task-display-name';

import styles from './styles.module.css';

function TaskContainer({
	children = null,
	loading = false,
	pendingTask,
	actions,
	shipment_data = {},
}) {
	const trade_type = getTradeTypeByIncoTerm(shipment_data?.inco_term);

	const taskName = taskDisplayName(trade_type)[pendingTask?.task]?.display_name || startCase(pendingTask?.task || '');

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
