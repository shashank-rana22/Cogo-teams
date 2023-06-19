import { Pill, Popover, Toast, Toggle, Tooltip } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { IcMInfo } from '@cogoport/icons-react';
import { useState } from 'react';

import useMonthlyTrendStats from '../../hooks/useMonthlyTrendStats';
import useShipmentIdStats from '../../hooks/useShipmentIdStats';
import useShipmentViewStats from '../../hooks/useShipmentViewStats';
import { optionsMonth, optionsYear } from '../ShipmentView/constant';

import ChartData from './ChartData';
import FilterHeader from './FilterHeader';
import { data, dataExpense, reportMonth } from './helper';
import MonthBarChart from './MonthBarChart';
import SIDView from './SIDView';
import StatsNumericData from './StatsNumericData';
import styles from './styles.module.css';

const GET_MONTH_DETAILS = optionsMonth.filter((i) => i.value === new Date().getMonth().toString())?.[0];

const GET_YEAR_DETAILS = optionsYear?.[0]?.value;

const COLORS = ['#57C6D1', '#ADCC6A'];

interface DashboardFilterInterface {
	month?:string
	year?:string
}

function Dashboard() {
	const { control, watch } = useForm();

	const entityCode = watch('entityCode');

	const [dashboardFilters, setDashboardFilters] = useState<DashboardFilterInterface>();

	const [toggle, setToggle] = useState(false);

	const { month, year } = dashboardFilters || {};

	const { statsData = {}, statsLoading } = useShipmentIdStats({
		month : month || GET_MONTH_DETAILS?.value,
		year  : year || GET_YEAR_DETAILS,
		entityCode,
	});

	const { shipmentViewData = {}, shipmentViewLoading } = useShipmentViewStats({
		month : month || GET_MONTH_DETAILS?.value,
		year  : year || GET_YEAR_DETAILS,
		entityCode,
	});
	const { monthlyData = [] } = useMonthlyTrendStats({
		month : month || GET_MONTH_DETAILS?.value,
		year  : year || GET_YEAR_DETAILS,
		entityCode,
	});

	const {
		expenseBookedSum = 0,
		expenseAccruedSum = 0,
		expenseCurrency,
		incomeBookedSum = 0,
		incomeAccruedSum = 0,
		incomeCurrency,
	} = statsData;

	const renderDownloadReport = (
		reportMonth(shipmentViewData).map((item) => (
			<div
				key={item?.id}
				className={styles.days_show}
				onClick={() => { Toast.default('Coming Soon'); }}
				role="presentation"
			>
				{item?.days}
			</div>
		))
	);

	const monthlyDataValue = (monthlyData || [{}]).map((item) => {
		const {
			incomeAccruedSum:incomeAccrued, incomeBookedSum:incomeBooked,
			incomeCurrency:currencyIncome, expenseAccruedSum:expenseAccrued,
			expenseBookedSum:expenseBooked, expenseCurrency:currencyExpense, periodName,
		} = item || {};
		return {
			Month    : periodName,
			Booked   : toggle ? expenseBooked : incomeBooked,
			Accrued  : toggle ? expenseAccrued : incomeAccrued,
			currency : toggle ? currencyExpense : currencyIncome,
		};
	});

	return (
		<div>

			<FilterHeader
				setDashboardFilters={setDashboardFilters}
				dashboardFilters={dashboardFilters}
				GET_MONTH_DETAILS={GET_MONTH_DETAILS}
				GET_YEAR_DETAILS={GET_YEAR_DETAILS}
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
									Current month statistics
									of booked and accrued income
									and expense
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
						{`Month : ${optionsMonth[Number(month) - 1]?.label || GET_MONTH_DETAILS?.label}`}
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
						data={data(incomeAccruedSum, incomeBookedSum)}
						dataExpense={dataExpense(expenseAccruedSum, expenseBookedSum)}
					/>
				</div>
			</div>

			<div className={styles.sid_card}>

				<div className={styles.statistics}>

					<div className={styles.sid_view}>
						3 Months SID View
					</div>

					<Popover placement="bottom" caret={false} render={renderDownloadReport}>

						<div className={styles.report}> Download Report</div>

					</Popover>

				</div>

				<div className={styles.hr_statistics} />

				<SIDView reportMonth={reportMonth(shipmentViewData)} shipmentViewLoading={shipmentViewLoading} />

			</div>

			<div>

				<div className={styles.stats_card}>

					<div className={styles.statistics}>

						<div className={styles.sid_view}>
							Monthly Trend
							<Tooltip
								content={(
									<div className={styles.font_size_tooltip}>
										Month wise view of booked and
										accrued income and expense
									</div>
								)}
								placement="top"
							>
								<div className={styles.info_icon_container}>
									<IcMInfo />
								</div>
							</Tooltip>
						</div>
						<div>
							<Toggle
								name="toggle"
								size="md"
								onLabel="Expense"
								offLabel="Income"
								onChange={() => { setToggle(!toggle); }}
							/>

						</div>
					</div>

					<div className={styles.hr_statistics} />

					<div>
						<MonthBarChart monthlyData={monthlyDataValue} />
					</div>

				</div>
			</div>

		</div>
	);
}
export default Dashboard;
