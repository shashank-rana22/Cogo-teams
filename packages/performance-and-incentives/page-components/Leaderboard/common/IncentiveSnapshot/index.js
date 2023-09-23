import { isEmpty } from '@cogoport/utils';

import INCENTIVE_SNAPSHOT_CONSTANTS from '../../constants/incentive-snapshot-constants';

import ComingSoon from './ComingSoon';
import Snapshot from './Snapshot';
import styles from './styles.module.css';

function IncentiveSnapshot(props) {
	const { incentiveSnapshotData } = props;

	return (
		<div className={styles.container}>
			<h3 className={styles.heading}>Incentive Snapshot</h3>

			{isEmpty(incentiveSnapshotData) ? <ComingSoon /> : (
				<div className={styles.snapshot_container}>
					{Object.values(INCENTIVE_SNAPSHOT_CONSTANTS).map((stage) => (
						<Snapshot
							key={stage}
							stage={stage}
						/>
					))}
				</div>
			)}

		</div>
	);
}

export default IncentiveSnapshot;
