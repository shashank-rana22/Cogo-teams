import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { isEmpty } from '@cogoport/utils';
import { useEffect } from 'react';

import currencyCoversion from '../../../utils/currencyCoversion';
import getMonthYear from '../../../utils/getMonthYear';
import Empty from '../../Empty';
import PieChart from '../../PieChart';
import RevenueData from '../../RevenueData';
import RevenueLoader from '../../RevenueLoader';

import MobileRevenueAnalytics from './MobileRevenueAnalytics';
import styles from './styles.module.css';

function CommonData({
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

	const rev = revenue_analysis[0] || [];

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
				<RevenueLoader />
			</div>
		);
	}

	if (!loading && isEmpty(revenue_analysis)) {
		return <Empty />;
	}

	return (
		<div className={styles.container}>
			<div className={styles.flex_container}>
				<MobileRevenueAnalytics
					selectedFilterTab={selectedFilterTab}
					param={param}
					setParam={setParam}
					revenue_analysis={revenue_analysis}
					maxEtd={etd}
				/>

				{Object.keys(rev).length > 0
					&& (
						<div
							className={styles.card_wrapper}
							style={{
								background: currentMonth === `${rev?.month}${rev?.year}` ? '#F9FEF9'
									: '#fff',
							}}
						>
							<div className={styles.row}>
								<div className={styles.revenue_data}>
									<div className={styles.booking_pie}>
										<div className={styles.flex_currency}>
											<div className={styles.text_currency}>
												{formatAmount({
													amount: currencyCoversion(
														currency,
														rev?.total_amount || 0,
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

											<div className={styles.booking}>
												<div className={styles.flex_booking}>
													<div className={styles.text_booking}>
														No. of Bookings
													</div>
													<div className={styles.text_booking_data}>
														{rev?.total_bookings}
													</div>
												</div>
												<div className={styles.flex_customers}>
													<div className={styles.text_customers}>
														No. of Customers
													</div>
													<div className={styles.text_customers_data}>
														{rev?.total_customers}
													</div>
												</div>
											</div>
										</div>
										<div className={styles.chart_container}>
											<PieChart
												className={styles.pie}
												chartData={rev?.trade_data}
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
								</div>
								<div className={styles.col_2}>
									<div className={styles.row_2}>
										<div className={styles.revenue_trade_data}>
											{rev?.trade_data.length > 0 ? (
												<RevenueData
													data={rev?.trade_data}
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
					)}
			</div>
		</div>
	);
}

export default CommonData;
