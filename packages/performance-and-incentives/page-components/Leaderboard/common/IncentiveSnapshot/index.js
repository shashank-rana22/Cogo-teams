import { Select } from '@cogoport/components';

import getMonthFilterOptions from '../../../../utils/get-month-filter-options';
import INCENTIVE_SNAPSHOT_CONSTANTS from '../../constants/incentive-snapshot-constants';

import Snapshot from './Snapshot';
import styles from './styles.module.css';

function IncentiveSnapshot(props) {
	const {
		currLevel,
		incentiveMonth,
		setIncentiveMonth,
		userIncentiveData,
		userIncentiveStatsLoading,
	} = props;

	const monthFilterOptions = getMonthFilterOptions();

	return (
		<div className={styles.container}>

			<div className={styles.header}>
				<h3>Incentive Snapshot</h3>

				<Select
					value={incentiveMonth}
					onChange={setIncentiveMonth}
					placeholder="Month"
					options={monthFilterOptions}
					size="sm"
				/>
			</div>

			<div className={styles.snapshot_container}>
				{Object.values(INCENTIVE_SNAPSHOT_CONSTANTS).map((stage) => (
					<Snapshot
						key={stage}
						stage={stage}
						currLevel={currLevel}
						userIncentiveData={userIncentiveData}
						userIncentiveStatsLoading={userIncentiveStatsLoading}
					/>
				))}
			</div>
		</div>
	);
}

export default IncentiveSnapshot;
