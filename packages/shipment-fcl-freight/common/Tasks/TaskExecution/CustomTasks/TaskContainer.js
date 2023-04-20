import { Text } from '@cogoport/components';
import startCase from '@cogoport/utils';

import taskDisplayNames from './display-name-Mapping';
import incoTermMapping from './inco-term-mapping.json';
import styles from './styles.module.css';

function TaskContainer({
	children = null,
	loading = false,
	pendingTask,
	actions,
	shipment_data = {},
}) {
	const trade_type = incoTermMapping[shipment_data?.inco_term] || '';

	const taskName =		taskDisplayNames(trade_type)[pendingTask?.task]?.display_name
		|| startCase(pendingTask?.task || '');

	return (
		<div className={styles.task_container}>
			<div className={styles.task_sub_container}>
				<Text size={16} bold>
					{taskName}
				</Text>
				{loading ? null : <div className={styles.flex}>{actions}</div>}
			</div>
			{loading ? <Text align="center">Loading ...</Text> : children}
		</div>
	);
}

export default TaskContainer;
