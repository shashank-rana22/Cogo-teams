import { Popover, Tooltip } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';
import { useState } from 'react';

import ChartData from './ChartData';
import FilterHeader from './FilterHeader';
import StatsNumericData from './StatsNumericData';
import styles from './styles.module.css';

function Dashboard() {
	const [dashboardFilters, setDashboardFilters] = useState({});

	const reportMonth = [
		{ id: '1', days: '1 - 15 Days Left' },
		{ id: '2', days: '15 - 30 Days Left' },
		{ id: '3', days: '1 - 2 Month Left' },
		{ id: '4', days: '2 - 3 Month Left' },
	];

	const renderDownloadReport = (
		reportMonth.map((item) => (
			<div key={item?.id} className={styles.days_show}>
				{item?.days}
			</div>
		))
	);

	return (
		<div>
			<FilterHeader setDashboardFilters={setDashboardFilters} dashboardFilters={dashboardFilters} />
			<div className={styles.statistics_card}>
				<div className={styles.statistics}>
					<div className={styles.sid_view}>
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

					<div className={styles.report}> Download Report</div>
				</div>
				<div className={styles.hr_statistics} />

				<div className={styles.stats_full_data}>
					<StatsNumericData />
					<ChartData />
				</div>

			</div>

			<div className={styles.sid_card}>
				<div className={styles.statistics}>
					<div className={styles.sid_view}>
						3 Months SID View
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
					<Popover placement="bottom" caret={false} render={renderDownloadReport}>
						<div className={styles.report}> Download Report</div>
					</Popover>

				</div>
				<div className={styles.hr_statistics} />
			</div>

		</div>
	);
}
export default Dashboard;
