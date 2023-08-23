import getTradeTypeByIncoTerm from '@cogoport/globalization/utils/getTradeTypeByIncoTerm';
import { ThreeDotLoader } from '@cogoport/ocean-modules';
import { startCase } from '@cogoport/utils';

import taskDisplayNames from '../../../../../../configurations/display-name-mappings';

import styles from './styles.module.css';

function TaskContainer({
	children = null,
	loading = false,
	pendingTask = {},
	actions = '',
	shipment_data = {},
}) {
	const trade_type = getTradeTypeByIncoTerm(shipment_data?.inco_term);

	const taskName = taskDisplayNames(trade_type)[pendingTask?.task]?.display_name
		|| startCase(pendingTask?.task || '');

	return (
		<div className={styles.container}>
			<header className={styles.header}>
				<span className={styles.text}>{startCase(taskName)}</span>
				{loading ? null : <div className={styles.action_container}>{actions}</div>}
			</header>

			{loading ? (
				<div className={styles.loader}>
					<ThreeDotLoader message="Loading Data" />
				</div>
			) : children}
		</div>
	);
}

export default TaskContainer;
