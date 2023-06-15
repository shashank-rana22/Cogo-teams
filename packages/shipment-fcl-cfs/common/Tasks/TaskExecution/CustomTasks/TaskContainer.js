import { startCase } from '@cogoport/utils';

import taskDisplayNames from '../../../../configurations/display-name-mappings';
import incoTermMapping from '../../../../configurations/inco-term-mapping.json';

import styles from './styles.module.css';

function TaskContainer({

	loading = false,
	task,
	actions,
	shipment_data = {},
}) {
	const trade_type = incoTermMapping[shipment_data?.inco_term] || '';

	const taskName = taskDisplayNames(trade_type)[task?.task]?.display_name || startCase(task?.task || '');

	return (
		<div className={styles.task_container}>
			<div className={styles.task_sub_container}>
				<div size={16}>
					{taskName}
				</div>

				{loading ? null : <div className={styles.flex}>{actions}</div>}
			</div>
		</div>
	);
}

export default TaskContainer;