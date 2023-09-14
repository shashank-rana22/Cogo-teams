import INCENTIVE_SNAPSHOT_CONSTANTS from '../../constants/incentive-snapshot-constants';

import Snapshot from './Snapshot';
import styles from './styles.module.css';

function IncentiveSnapshot() {
	return (
		<div className={styles.container}>
			<h3 className={styles.heading}>Incentive Snapshot</h3>

			<div className={styles.snapshot_container}>
				{Object.values(INCENTIVE_SNAPSHOT_CONSTANTS).map((stage) => (
					<Snapshot
						key={stage}
						stage={stage}
					/>
				))}
			</div>
		</div>
	);
}

export default IncentiveSnapshot;
