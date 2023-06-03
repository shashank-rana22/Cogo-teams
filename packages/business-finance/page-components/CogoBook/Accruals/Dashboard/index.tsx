import { Pill, Popover, Tooltip } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';
import { useState } from 'react';

import { optionsMonth, optionsYear } from '../ShipmentView/constant';

import ChartData from './ChartData';
import FilterHeader from './FilterHeader';
import MonthBarChart from './MonthBarChart';
import SIDView from './SIDView';
import StatsNumericData from './StatsNumericData';
import styles from './styles.module.css';

const GetMonthDetails = optionsMonth.filter((i) => i.value === new Date().getMonth().toString())?.[0];

const GetYearDetails = optionsYear()?.[0]?.value;

function Dashboard() {
	const [dashboardFilters, setDashboardFilters] = useState({});

	const reportMonth = [
		{ id: '1', days: '1 - 15 Days Left', shipmentId: '12' },
		{ id: '2', days: '15 - 30 Days Left', shipmentId: '12' },
		{ id: '3', days: '1 - 2 Month Left', shipmentId: '12' },
		{ id: '4', days: '2 - 3 Month Left', shipmentId: '12' },
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

			<FilterHeader
				setDashboardFilters={setDashboardFilters}
				dashboardFilters={dashboardFilters}
				GetMonthDetails={GetMonthDetails}
				GetYearDetails={GetYearDetails}
				optionsMonth={optionsMonth}
				optionsYear={optionsYear}
			/>

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

					<Pill size="md" color="green">
						{`Month : ${GetMonthDetails?.label}`}
					</Pill>
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

				<SIDView reportMonth={reportMonth} />
			</div>
			<div>
				<div className={styles.stats_card}>
					<div className={styles.statistics}>
						<div className={styles.sid_view}>
							Monthly Trend
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

					</div>
					<div className={styles.hr_statistics} />
					<div>
						<MonthBarChart />
					</div>

				</div>
			</div>

		</div>
	);
}
export default Dashboard;
