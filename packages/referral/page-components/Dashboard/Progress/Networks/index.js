import { isEmpty } from '@cogoport/utils';

import NetworkLineChart from '../../../../configurations/network-line-chart';
import { networkEmptyState } from '../../../../constants';

import styles from './styles.module.css';

function Networks({ networkData = {} }) {
	const emptyState = isEmpty(networkData);
	return (
		<>
			<div className={styles.title}>NETWORKS</div>

			{emptyState ? (
				<div className={styles.empty_state}>
					<img src={networkEmptyState} alt="empty-state" width="120px" height="120px" />

				</div>
			) : (
				<div className={styles.line_chart}>
					<NetworkLineChart networkData={networkData} />
				</div>
			)}

		</>
	);
}

export default Networks;
