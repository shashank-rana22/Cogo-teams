import { Tooltip } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';
import { useState } from 'react';

import ChartData from './ChartData';
import FilterHeader from './FilterHeader';
import StatsNumericData from './StatsNumericData';
import styles from './styles.module.css';

function Dashboard() {
	const [dashboardFilters, setDashboardFilters] = useState({});
	return (
		<div>
			<FilterHeader setDashboardFilters={setDashboardFilters} dashboardFilters={dashboardFilters} />
			<div className={styles.statistics_card}>
				<div className={styles.statistics}>
					Shipment ID Statistics
					<Tooltip
						content={(
							<div className={styles.font_size_tooltip}>
								Please select the
								<br />
								accounting month
							</div>
						)}
						placement="top"
					>
						<div className={styles.info_icon_container}>
							<IcMInfo />
						</div>
					</Tooltip>
				</div>
				<div className={styles.hr_statistics} />

				<div className={styles.stats_full_data}>
					<StatsNumericData />
					{' '}
					<ChartData />
				</div>
			</div>

		</div>
	);
}
export default Dashboard;
