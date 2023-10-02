import INCENTIVE_SNAPSHOT_CONSTANTS from '../../constants/incentive-snapshot-constants';

import Snapshot from './Snapshot';
import styles from './styles.module.css';

function IncentiveSnapshot(props) {
	const {
		userIncentiveData,
		userIncentiveStatsLoading,
	} = props;

	return (
		<div className={styles.container}>
			<h3>Incentive Snapshot</h3>

			<div className={styles.snapshot_container}>
				{Object.values(INCENTIVE_SNAPSHOT_CONSTANTS).map((stage) => (
					<Snapshot
						key={stage}
						stage={stage}
						userIncentiveData={userIncentiveData}
						userIncentiveStatsLoading={userIncentiveStatsLoading}
					/>
				))}
			</div>
		</div>
	);
}

export default IncentiveSnapshot;
