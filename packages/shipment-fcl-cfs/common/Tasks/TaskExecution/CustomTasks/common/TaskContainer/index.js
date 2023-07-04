import getTradeTypeByIncoTerm from '@cogoport/globalization/utils/getTradeTypeByIncoTerm';
import { startCase } from '@cogoport/utils';

import taskDisplayNames from '../../../../../../configurations/display-name-mappings';

import styles from './styles.module.css';

function TaskContainer({
	children = null,
	loading = false,
	pendingTask,
	actions,
	shipment_data = {},
}) {
	const trade_type = getTradeTypeByIncoTerm(shipment_data?.inco_term);

	const taskName = taskDisplayNames(trade_type)[pendingTask?.task]?.display_name
		|| startCase(pendingTask?.task || '');

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.text}>{startCase(taskName)}</div>
				{loading ? null : <div>{actions}</div>}
			</div>

			{loading ? <div className={styles.text}>Loading ...</div> : children}
		</div>
	);
}

export default TaskContainer;
