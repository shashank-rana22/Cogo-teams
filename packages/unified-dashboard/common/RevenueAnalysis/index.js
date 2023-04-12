import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcMArrowLeft } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useEffect } from 'react';

import currencyCoversion from '../../utils/currencyCoversion';
import getMonthYear from '../../utils/getMonthYear';
import getNextData from '../../utils/getNextData';
import getPreviousData from '../../utils/getPreviousData';
import isNextRevenueAllowed from '../../utils/isNextRevenueAllowed';
import Empty from '../Empty';
import PieChart from '../PieChart';
import RevenueData from '../RevenueData';
import RevenueLoader from '../RevenueLoader';

import styles from './styles.module.css';

function RevenueAnalysis({
	selectedFilter,
	selectedFilterTab,
	headerFilters,
	param,
	setParam,
	loading,
	revenue_analysis,
	etd,
	heading,
}) {
	const { currency: selectedCurrency } = headerFilters;

	const currency = selectedCurrency
		? GLOBAL_CONSTANTS.currency_code.INR
		: GLOBAL_CONSTANTS.currency_code.USD;

	const isClickable = isNextRevenueAllowed(
		selectedFilterTab,
		revenue_analysis[0],
		etd,
	);

	const handleNext = () => {
		if (!isClickable) {
			getNextData(
				selectedFilterTab,
				revenue_analysis,
				param,
				setParam,
				'revenue',
			);
		}
	};

	useEffect(() => {
		setParam((prevF) => ({
			...prevF,
			start_date  : null,
			end_date    : null,
			period_type : selectedFilter,
		}));
	}, [selectedFilter, setParam]);

	const currentMonth = `${getMonthYear()?.getMonth}${getMonthYear()?.getYear}`;

	if (loading) {
		return (
			<div className={styles.container}>
				<RevenueLoader count={4} />
			</div>
		);
	}

	if (!loading && isEmpty(revenue_analysis)) {
		return <Empty />;
	}

	return (
		<div className={styles.container}>
			<div className={styles.flex_container}>
				<IcMArrowLeft
					height={20}
					width={20}
					className={styles.arrow_icon}
					style={{
						cursor: isClickable ? 'not-allowed' : 'pointer',
					}}
					onClick={handleNext}
				/>
				<div className={styles.stepper_line} />

				<IcMArrowLeft
					height={20}
					width={20}
					className={styles.down_arrow_icon}
					onClick={() => getPreviousData(
						selectedFilterTab,
						revenue_analysis[revenue_analysis.length - 1],
						param,
						setParam,
						'revenue',
					)}
				/>
				{revenue_analysis?.length > 0
					&& revenue_analysis?.map((data) => (
						<div
							className={styles.card_wrapper}
							style={{
								background: currentMonth === `${data?.month}${data?.year}` ? '#F9FEF9'
									: '#fff',
							}}
						>
							<div className={styles.stepper_dots} />
							<div className={styles.row}>
								<div className={styles.revenue_data}>
									<div className={styles.flex_filter}>
										<div className={styles.text_filter}>
											{selectedFilterTab === 'week' && data?.day}
											{' '}
											{data?.month}
											{' '}
											{data?.year}
											<div className={styles.revenue_span}>
												{selectedFilterTab === 'month'
													&& currentMonth === `${data?.month}${data?.year}`
													&& '(current Month)'}
											</div>
										</div>
									</div>
									<div className={styles.flex_currency}>
										<div className={styles.text_currency}>
											{formatAmount({
												amount: currencyCoversion(
													currency,
													data?.total_amount || 0,
												),
												currency,
												options: {
													style                 : 'currency',
													currencyDisplay       : 'symbol',
													notation              : 'compact',
													compactDisplay        : 'short',
													minimumFractionDigits : 2,
												},
											})}
										</div>
										<div>
											<div className={styles.flex_booking}>
												<div className={styles.text_booking}>
													No. of Bookings
												</div>
												<div className={styles.text_booking_data}>
													{data?.total_bookings}
												</div>
											</div>
											<div className={styles.flex_customers}>
												<div className={styles.text_customers}>
													No. of Customers
												</div>
												<div className={styles.text_customers_data}>
													{data?.total_customers}
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className={styles.col_2}>
									<div className={styles.row_2}>
										<div className={styles.col_pie}>
											<div className={styles.chart_container}>
												<PieChart
													className={styles.pie}
													chartData={data?.trade_data}
													margin={{
														top    : 0,
														right  : 0,
														bottom : 0,
														left   : 0,
													}}
													currency={currency}
												/>
											</div>
										</div>
										<div className={styles.revenue_trade_data}>
											{data?.trade_data.length > 0 ? (
												<RevenueData
													data={data?.trade_data}
													currency={currency}
													heading={heading}
												/>
											) : (
												<div className={styles.flex_nodate}>
													<h1>No data found</h1>
												</div>
											)}
										</div>
									</div>
								</div>
							</div>
						</div>
					))}
			</div>
		</div>
	);
}

export default RevenueAnalysis;
