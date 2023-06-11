import { Legend, ProgressBar, cl, Popover, Placeholder, Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcMInfo, IcMArrowRotateDown, IcMArrowNext } from '@cogoport/icons-react';
import React, { useEffect, useState } from 'react';

// import SegmentedControl from '../../../commons/SegmentedControl/index';
import totalReceivablesKeyMappings from '../../constants/total-receivables-key-mapping';
// import totalRecievablesStats from '../../constants/total-recievales';
import useGetPayablesList from '../../hooks/getPayablesData';
import useGetReceivablesList from '../../hooks/getReceivablesData';
import showInTooltop from '../../utils/getOverFlowData';
import styles from '../styles.module.css';

import ResponsivePieChart from './ResponsivePieChart';
import TotalPayable from './TotalPayable';

function TotalPayablesRecievables({ globalFilters, entityTabFilters }) {
	const {
		receivablesData,
		// recievablesTab,
		// setRecievablesTab,
		receivablesLoading,
	} = useGetReceivablesList({ globalFilters, entityTabFilters });

	const { payablesData, payablesLoading } = useGetPayablesList({ globalFilters, entityTabFilters });
	const {
		overdueAmount = 0, nonOverdueAmount = 0, notPaidDocumentCount = 0,
		onAccountAndOutStandingData = [], onAccountChangeFromYesterday = 0, outstandingChangeFromYesterday = 0,
	} = receivablesData || {};

	let onAccountReceivable = 0;
	let outstandingReceivable = 0;

	(onAccountAndOutStandingData || []).forEach((item:any) => {
		if (item?.id === 'onAccount') {
			onAccountReceivable = item?.value;
			return onAccountReceivable;
		} if (item?.id === 'outstanding') {
			outstandingReceivable = item?.value;
			return outstandingReceivable;
		}
		return null;
	});

	const progressDataReceivables = overdueAmount + nonOverdueAmount;

	const progressReceivablesPer = 	progressDataReceivables !== 0
		? ((nonOverdueAmount / progressDataReceivables) * 100) : 0;
	const progressReceivablesPercent = progressReceivablesPer.toFixed(2);

	const [progressReceivables, setProgressReceivables] = useState(String(progressReceivablesPercent) || 0);

	const items = [
		{ label: 'Current', color: 'orange', key: 'current' },
		{ label: 'Overdue', color: '#88CAD1', key: 'overdue' },
	];

	useEffect(() => {
		setProgressReceivables(progressReceivablesPercent);
	}, [receivablesLoading, progressReceivablesPercent]);

	return (
		<div>
			<div className={cl`${styles.space_between} ${styles.legend} ${styles.progress_bar}`}>

				<div className={styles.service_stats}>

					<div className={styles.main}>
						<div className={styles.text_filters_gap}>
							<div className={styles.text_style}>
								Total Receivables
								<div className={styles.border} />
							</div>
							<div className={styles.icon}>
								<Tooltip
									content={(
										<div className={styles.text_styles}>
											sum of all invoices billed to the
											<br />
											{' '}
											customer but not yet paid for
										</div>
									)}
									placement="right"
									caret={false}
								>
									<IcMInfo />
								</Tooltip>

							</div>
						</div>
						{/* <div className={styles.segment_filters}>
							<SegmentedControl
								options={totalRecievablesStats()}
								activeTab={recievablesTab}
								setActiveTab={setRecievablesTab}
								color="#ED3726"
								background="#FFFAEB"
							/>
						</div> */}
					</div>
					{receivablesLoading ? (
						<div style={{ alignItems: 'center' }}>
							<Placeholder height="140px" width="600px" margin="10px 0px 50px 20px" />
						</div>
					) : (
						<>
							<div className={styles.legend_style}>
								<Legend hasBackground={false} direction="horizontal" items={items} size="lg" />
								<div style={{ margin: '20px 40% 0px 0px' }} />
							</div>
							<div className={styles.current_overdue_style}>
								<span className={styles.current_amount_style}>

									{showInTooltop(
										formatAmount({
											amount   :	nonOverdueAmount,
											currency : GLOBAL_CONSTANTS.currency_code.INR,
											options  : {
												style           : 'currency',
												currencyDisplay : 'code',
											},
										}),
										formatAmount({
											amount   :	nonOverdueAmount,
											currency : GLOBAL_CONSTANTS.currency_code.INR,
											options  : {
												style           : 'currency',
												currencyDisplay : 'code',
												notation        : 'comapct',
											},
										}),
									)}

								</span>
								<div className={styles.icon_style}>
									<span className={styles.current_amount_style}>
										{showInTooltop(
											formatAmount({
												amount   :	overdueAmount,
												currency : GLOBAL_CONSTANTS.currency_code.INR,
												options  : {
													style           : 'currency',
													currencyDisplay : 'code',
												},
											}),
											formatAmount({
												amount   :	overdueAmount,
												currency : GLOBAL_CONSTANTS.currency_code.INR,
												options  : {
													style           : 'currency',
													currencyDisplay : 'code',
													notation        : 'comapct',

												},
											}),
										)}

									</span>
									<Popover
										placement="bottom"
										trigger="click"
										caret={false}
										render={(totalReceivablesKeyMappings({ receivablesData }) || []).map((val) => (
											<tr key={val.countKey}>
												<td className={styles.recei_label}>{val.label}</td>
												<td className={styles.label}>{val.valueKey}</td>
											</tr>
										))}
									>
										<IcMArrowRotateDown style={{ margin: '0px 20px', cursor: 'pointer' }} />
									</Popover>

								</div>
							</div>
							<div className={styles.borders} />
							<ProgressBar progress={String(progressReceivables)} />
							<div style={{ display: 'flex' }}>
								<div className={styles.texts}>Total Unpaid invoices:</div>
								<div style={{ marginLeft: '20px', display: 'flex' }}>
									<div>
										{showInTooltop(
											formatAmount({
												amount   :	Math.abs(progressDataReceivables) as any,
												currency : GLOBAL_CONSTANTS.currency_code.INR,
												options  : {
													style           : 'currency',
													currencyDisplay : 'code',
												},
											}),
											formatAmount({
												amount   :	Math.abs(progressDataReceivables) as any,
												currency :	GLOBAL_CONSTANTS.currency_code.INR,
												options  : {
													style           : 'currency',
													currencyDisplay : 'code',
													notation        : 'comapct',
												},
											}),
										)}
									</div>
									<span style={{ marginLeft: '5px' }}>
										(
										{notPaidDocumentCount}
										)
									</span>
								</div>
							</div>
						</>
					)}
					<div className={styles.account_payment_box}>
						<div className={styles.responsive_pie_chart}>
							{receivablesLoading ? (
								<div style={{ alignItems: 'center' }}>
									<Placeholder height="100px" width="150px" margin="24px 0px 50px 20px" />
								</div>
							) : (

								<ResponsivePieChart pieData={onAccountAndOutStandingData} />
							)}
						</div>
						<div className={styles.border_left} />
						<div>
							{receivablesLoading ? (
								<div style={{ alignItems: 'center' }}>
									<Placeholder height="30px" width="250px" margin="16px 20px 50px 0px" />
								</div>
							) : (
								<div style={{ marginTop: '20px' }}>
									<div style={{ display: 'flex' }}>
										<span>
											{showInTooltop(
												formatAmount({
													amount   :	onAccountReceivable as any,
													currency : GLOBAL_CONSTANTS.currency_code.INR,
													options  : {
														style           : 'currency',
														currencyDisplay : 'code',
													},
												}),
												formatAmount({
													amount   :	onAccountReceivable as any,
													currency :	GLOBAL_CONSTANTS.currency_code.INR,
													options  : {
														style           : 'currency',
														currencyDisplay : 'code',
														notation        : 'comapct',
													},
												}),
											)}
										</span>
										<div className={styles.on_account}>On Account Payment</div>
									</div>

									<div className={styles.accounts_text_style}>
										<div style={{ marginRight: '2px' }}>

											<div className={styles.account_change_text_style}>
												<div className={styles.color_box} />
												<div className={onAccountChangeFromYesterday >= 0
													? styles.icon_plus_styles : styles.icon_minus_styles}
												>
													<IcMArrowNext height={20} width={20} />

												</div>
												<div>
													{onAccountChangeFromYesterday.toFixed(2)}
												</div>
											</div>

										</div>
										%
										<span className={styles.yesterday_text_style}>
											{onAccountChangeFromYesterday >= 0 ? 'more' : 'less'}
											{' '}
											than yesterday
										</span>
									</div>
								</div>
							)}
							{receivablesLoading ? (
								<div style={{ alignItems: 'center' }}>
									<Placeholder height="30px" width="250px" margin="10px 20px 50px 0px" />
								</div>
							) : (
								<div style={{ marginTop: '20px', marginRight: '20px' }}>
									<div style={{ display: 'flex' }}>
										<span>
											{showInTooltop(
												formatAmount({
													amount   :	outstandingReceivable as any,
													currency : GLOBAL_CONSTANTS.currency_code.INR,
													options  : {
														style           : 'currency',
														currencyDisplay : 'code',
													},
												}),
												formatAmount({
													amount   :	outstandingReceivable as any,
													currency :	GLOBAL_CONSTANTS.currency_code.INR,
													options  : {
														style           : 'currency',
														currencyDisplay : 'code',
														notation        : 'comapct',
													},
												}),
											)}
										</span>
										<div className={styles.on_account}>Outstanding</div>
									</div>

									<div className={styles.accounts_text_style}>
										<div>

											<div className={styles.account_change_text_style}>
												<div className={styles.color_box_outstanding} />
												<div className={outstandingChangeFromYesterday >= 0
													? styles.icon_plus_styles : styles.icon_minus_styles}
												>
													<IcMArrowNext height={20} width={20} />

												</div>
												<div>
													{outstandingChangeFromYesterday.toFixed(2)}
												</div>
											</div>

										</div>
										%
										<span className={styles.yesterday_text_style}>
											{outstandingChangeFromYesterday >= 0 ? 'more' : 'less'}
											{' '}
											than yesterday
										</span>
									</div>
								</div>
							)}
						</div>
					</div>

				</div>

				<TotalPayable payablesData={payablesData} payablesLoading={payablesLoading} items={items} />

			</div>
		</div>
	);
}

export default TotalPayablesRecievables;
