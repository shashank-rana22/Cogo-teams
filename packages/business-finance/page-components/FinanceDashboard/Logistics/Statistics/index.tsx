import { Placeholder, Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcMInfo, IcMArrowNext } from '@cogoport/icons-react';
import React from 'react';

import useGetTodayStats from '../../hooks/getTodayStats';
import showInTooltop from '../../utils/getOverFlowData';

import styles from './styles.module.css';

function Statistics({ globalFilters, entityTabFilters }) {
	const { todayStatsData, todayStatsLoading } = useGetTodayStats({ globalFilters, entityTabFilters });
	const {
		todayPurchaseStats, todaySalesStats,
		totalCashFlow = 0, cashFlowDiffFromYesterday = 0, yesterdayCashFlow = 0,
	} = todayStatsData || {};
	const { totalBills = 0, totalExpense = 0, totalPurchaseCreditNotes = 0 } = todayPurchaseStats || {};
	const { totalInvoices = 0, totalRevenue = 0, totalSalesCreditNotes = 0 } = todaySalesStats || {};

	return (
		<div>
			<div className={styles.card}>
				<div style={{ display: 'flex' }}>
					<div className={styles.main_div}>
						<div style={{ display: 'flex', justifyContent: 'space-between' }}>
							<div className={styles.text}>Today’s Statistics</div>
							<div className={styles.icon}>
								<Tooltip
									content={(
										<div className={styles.texts_style}>
											cash flow projection that is
											<br />
											estimated by taking
											into
											<br />
											account the total value of
											<br />
											invoices and bills
											generated on
											<br />
											the current day
										</div>
									)}
									placement="right"
									caret={false}
								>
									<IcMInfo />
								</Tooltip>
							</div>
						</div>
						<div className={styles.border} />
					</div>
					<div className={styles.border_left_side} />
					<div className={styles.expense_main}>
						<div className={styles.expense_text}>Expense</div>
						{todayStatsLoading ? (
							<div style={{ alignItems: 'center' }}>
								<Placeholder height="60px" width="200px" margin="0px 0px 0px 0px" />
							</div>
						) : (
							<>
								<div className={styles.amount_styles}>

									{showInTooltop(
										formatAmount({
											amount   :	totalExpense,
											currency : GLOBAL_CONSTANTS.currency_code.INR,
											options  : {
												style           : 'currency',
												currencyDisplay : 'code',
											},
										}),
										formatAmount({
											amount   :	totalExpense,
											currency : GLOBAL_CONSTANTS.currency_code.INR,
											options  : {
												style           : 'currency',
												currencyDisplay : 'code',
											},
										}),
									)}
								</div>
								<div className={styles.invoices_styles}>
									{totalBills}
									{' '}
									Invoices |
									{' '}
									{totalPurchaseCreditNotes}
									{' '}
									Credit Notes
								</div>
							</>
						)}
					</div>
					<div className={styles.revenue_main}>
						<div className={styles.expense_text}>Revenue</div>
						{todayStatsLoading ? (
							<div style={{ alignItems: 'center' }}>
								<Placeholder height="60px" width="200px" margin="0px 20px 0px 0px" />
							</div>
						) : (
							<>
								<div className={styles.amount_styles}>

									{showInTooltop(
										formatAmount({
											amount   : totalRevenue,
											currency : GLOBAL_CONSTANTS.currency_code.INR,
											options  : {
												style           : 'currency',
												currencyDisplay : 'code',
											},
										}),
										formatAmount({
											amount   :	totalRevenue,
											currency : GLOBAL_CONSTANTS.currency_code.INR,
											options  : {
												style           : 'currency',
												currencyDisplay : 'code',
											},
										}),
									)}
								</div>
								<div className={styles.invoices_styles}>
									{totalInvoices}
									{' '}
									Invoices |
									{' '}
									{totalSalesCreditNotes}
									{' '}
									Credit Notes
								</div>
							</>
						)}
					</div>
					<div className={styles.border_right_side} />
					<div className={styles.revenue_main}>
						<div style={{ marginTop: '10px' }}>Cash Flow</div>
						{todayStatsLoading ? (
							<div style={{ alignItems: 'center' }}>
								<Placeholder height="60px" width="200px" margin="0px 20px 0px 0px" />
							</div>
						) : (
							<>
								<div className={totalCashFlow >= 0
									? styles.amount_plus_styles : styles.amount_minus_styles}
								>
									{showInTooltop(
										formatAmount({
											amount   : totalCashFlow,
											currency : GLOBAL_CONSTANTS.currency_code.INR,
											options  : {
												style           : 'currency',
												currencyDisplay : 'code',
											},
										}),
										formatAmount({
											amount   :	totalCashFlow,
											currency : GLOBAL_CONSTANTS.currency_code.INR,
											options  : {
												style           : 'currency',
												currencyDisplay : 'code',
											},
										}),
									)}
								</div>
								<div className={styles.text_styles}>
									<div className={cashFlowDiffFromYesterday >= 0
										? styles.icon_plus_styles : styles.icon_minus_styles}
									>
										<IcMArrowNext height={20} width={20} />

									</div>
									<div style={{ display: 'flex' }}>
										<div style={{ marginRight: '2px' }}>

											<Tooltip
												content={(
													<div className={styles.tooltip_text}>
														<div>
															Yesterday Cash Flow Amount :
														</div>
														<div>
															{formatAmount({
																amount   :	yesterdayCashFlow,
																currency : GLOBAL_CONSTANTS.currency_code.INR,
																options  : {
																	style           : 'currency',
																	currencyDisplay : 'code',
																},
															})}
														</div>
													</div>
												)}
											>
												<div>
													{cashFlowDiffFromYesterday}
												</div>
											</Tooltip>

										</div>
										%
										<span style={{ marginLeft: '10px' }}>
											{cashFlowDiffFromYesterday >= 0 ? 'more' : 'less'}
											{' '}
											than yesterday
										</span>
									</div>
								</div>
							</>
						)}

					</div>
				</div>
			</div>
		</div>
	);
}

export default Statistics;
