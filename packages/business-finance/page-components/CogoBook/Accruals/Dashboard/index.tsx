import { Pill, Popover, Tooltip } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { IcMInfo } from '@cogoport/icons-react';
import { useState } from 'react';

import useMonthlyTrendStats from '../../hooks/useMonthlyTrendStats';
import useShipmentIdStats from '../../hooks/useShipmentIdStats';
import useShipmentViewStats from '../../hooks/useShipmentViewStats';
import { optionsMonth, optionsYear } from '../ShipmentView/constant';

import ChartData from './ChartData';
import FilterHeader from './FilterHeader';
import MonthBarChart from './MonthBarChart';
import SIDView from './SIDView';
import StatsNumericData from './StatsNumericData';
import styles from './styles.module.css';

const GetMonthDetails = optionsMonth.filter((i) => i.value === new Date().getMonth().toString())?.[0];

const GetYearDetails = optionsYear()?.[0]?.value;

const COLORS = ['#57C6D1', '#ADCC6A'];

function Dashboard() {
	const { control, watch } = useForm();

	const entityCode = watch('entityCode');

	const [dashboardFilters, setDashboardFilters] = useState({ month: '', year: '' });

	const { statsData = {}, statsLoading } = useShipmentIdStats({
		month : dashboardFilters?.month,
		year  : dashboardFilters?.year,
		entityCode,
	});

	const { shipmentViewData = {}, shipmentViewLoading } = useShipmentViewStats({
		month : dashboardFilters?.month,
		year  : dashboardFilters?.year,
		entityCode,
	});
	const { monthlyData = {}, monthlyLoading } = useMonthlyTrendStats({
		month : dashboardFilters?.month,
		year  : dashboardFilters?.year,
		entityCode,
	});

	console.log({ monthlyData, monthlyLoading }, 'monthlyData');

	const {
		expenseBookedSum = 0,
		expenseAccruedSum = 0,
		expenseCurrency,
		incomeBookedSum = 0,
		incomeAccruedSum = 0,
		incomeCurrency = 0,
	} = statsData;

	const data = [
		{
			id    : 'Income Accrued',
			label : 'Income Accrued',
			value : incomeAccruedSum,
			color : '#57C6D1',
		},
		{
			id    : 'Income Booked',
			label : 'Income Booked',
			value : incomeBookedSum,
			color : '#ADCC6A',
		},
	];

	const dataExpense = [
		{
			id    : 'Expense Accrued',
			label : 'Expense Accrued',
			value : expenseAccruedSum,
			color : '#57C6D1',
		},
		{
			id    : 'Expense Booked',
			label : 'Expense Booked',
			value : expenseBookedSum,
			color : '#ADCC6A',
		},
	];

	const {
		zeroToFifteenDays = 0,
		sixteenToThirtyDays = 0,
		thirtyOneToSixtyDays = 0,
		sixtyOneToNinetyDays = 0,
	} = shipmentViewData;

	console.log(shipmentViewLoading, 'shipmentViewLoading');

	const reportMonth = [
		{ id: '1', days: '0 - 15 Days Left', shipmentId: zeroToFifteenDays },
		{ id: '2', days: '15 - 30 Days Left', shipmentId: sixteenToThirtyDays },
		{ id: '3', days: '1 - 2 Month Left', shipmentId: thirtyOneToSixtyDays },
		{ id: '4', days: '2 - 3 Month Left', shipmentId: sixtyOneToNinetyDays },
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
				control={control}
			/>

			<div className={styles.statistics_card}>
				<div className={styles.statistics}>
					<div className={styles.sid_view}>
						Shipment ID Statistics
						<Tooltip
							content={(
								<div className={styles.font_size_tooltip}>
									Fuck
									<br />
									You
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
					<StatsNumericData statsData={statsData} statsLoading={statsLoading} />
					<ChartData
						expenseBookedSum={expenseBookedSum}
						expenseAccruedSum={expenseAccruedSum}
						expenseCurrency={expenseCurrency}
						incomeBookedSum={incomeBookedSum}
						incomeAccruedSum={incomeAccruedSum}
						incomeCurrency={incomeCurrency}
						statsLoading={statsLoading}
						COLORS={COLORS}
						data={data}
						dataExpense={dataExpense}
					/>
				</div>
			</div>

			<div className={styles.sid_card}>

				<div className={styles.statistics}>

					<div className={styles.sid_view}>
						3 Months SID View
						<Tooltip
							content={(
								<div className={styles.font_size_tooltip}>
									Fuck
									<br />
									You
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
										Fuck
										<br />
										You
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
