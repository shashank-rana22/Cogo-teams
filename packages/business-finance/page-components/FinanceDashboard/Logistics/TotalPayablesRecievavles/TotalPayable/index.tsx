import { Legend, ProgressBar, Popover, Placeholder, Tooltip } from '@cogoport/components';
import { IcMInfo, IcMArrowRotateDown, IcMArrowNext } from '@cogoport/icons-react';
import React, { useState, useEffect } from 'react';

import getFormattedPrice from '../../../../commons/utils/getFormattedPrice';
import totalPayablesKeyMappings from '../../../constants/total-payables-key-mapping';
import showInTooltop from '../../../utils/getOverFlowData';
import { getAmountInLakhCrK } from '../../getAmountInLakhCrK';
import styles from '../../styles.module.css';
import ResponsivePieChart from '../ResponsivePieChart';

function TotalPayable({ payablesData, payablesLoading, items }) {
	const {
		overdueAmount:payOverdueAmount = 0, nonOverdueAmount:payNonOverdueAmount = 0,
		notPaidDocumentCount:payNotPaidDocumentCount = 0,
		onAccountAndOutStandingData:AccountAndOutStandingData = [],
		onAccountChangeFromYesterday:AccountChangeFromYesterday = 0,
		outstandingChangeFromYesterday:outstandingChangeYesterday = 0,
	} = payablesData || {};
	const progressPayableData = payOverdueAmount + payNonOverdueAmount;
	const progressPayablesPer = progressPayableData !== 0 ? ((payNonOverdueAmount / progressPayableData) * 100) : 0;
	const progressPayablesPercent = progressPayablesPer.toFixed(2);

	const [progressPayables, setProgressPayables] = useState(String(progressPayablesPercent) || 0);

	let onAccountPayable = 0;
	let outstandingPayable = 0;
	(AccountAndOutStandingData || []).forEach((item:any) => {
		if (item?.id === 'onAccount') {
			onAccountPayable = item?.value;
			return onAccountPayable;
		} if (item?.id === 'outstanding') {
			outstandingPayable = item?.value;
			return outstandingPayable;
		}
		return null;
	});

	useEffect(() => {
		setProgressPayables(progressPayablesPercent);
	}, [payablesLoading, progressPayablesPercent]);

	return (
		<div className={styles.service_stats}>
			<div className={styles.main}>
				<div className={styles.text_filters_gap}>
					<div className={styles.text_style}>
						Total Payables
						<div className={styles.border} />
					</div>
					<div className={styles.icon}>
						<Tooltip
							content={(
								<div className={styles.text_styles}>
									sum of all invoices billed to
									<br />
									Cogoport but not yet paid for
								</div>
							)}
							placement="right"
							caret={false}
						>
							<IcMInfo />
						</Tooltip>
					</div>
				</div>
			</div>
			{payablesLoading ? (
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
								getFormattedPrice(Math.abs(payNonOverdueAmount), 'INR'),
								getAmountInLakhCrK(Math.abs(payNonOverdueAmount), 'INR'),
							)}
						</span>
						<div className={styles.icon_style}>
							<span className={styles.current_amount_style}>
								{showInTooltop(
									getFormattedPrice(Math.abs(payOverdueAmount), 'INR'),
									getAmountInLakhCrK(Math.abs(payOverdueAmount), 'INR'),
								)}
							</span>
							<Popover
								placement="bottom"
								trigger="click"
								caret={false}
								render={(totalPayablesKeyMappings({ payablesData }) || []).map((val) => (
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
					<ProgressBar progress={String(progressPayables)} />
					<div style={{ display: 'flex' }}>
						<div className={styles.texts}>Total Unpaid invoices:</div>
						<div style={{ marginLeft: '20px', display: 'flex' }}>
							{' '}
							<div>
								{showInTooltop(
									getFormattedPrice(Math.abs(progressPayableData), 'INR'),
									getAmountInLakhCrK(Math.abs(progressPayableData), 'INR'),
								)}
							</div>
							<span style={{ marginLeft: '5px' }}>
								(
								{payNotPaidDocumentCount}
								)
							</span>
						</div>
					</div>
				</>
			)}
			<div className={styles.account_payment_box}>
				<div className={styles.responsive_pie_chart}>
					{payablesLoading ? (
						<div style={{ alignItems: 'center' }}>
							<Placeholder height="100px" width="150px" margin="24px 0px 50px 20px" />
						</div>
					) : (
						<ResponsivePieChart pieData={AccountAndOutStandingData} />
					)}
				</div>
				<div className={styles.border_left} />
				<div style={{ marginRight: '24px' }}>
					{payablesLoading ? (
						<div style={{ alignItems: 'center' }}>
							<Placeholder height="30px" width="250px" margin="16px 20px 50px 0px" />
						</div>
					) : (
						<div style={{ marginTop: '20px' }}>
							<div style={{ display: 'flex' }}>
								<span>
									{showInTooltop(
										getFormattedPrice(onAccountPayable, 'INR'),
										getAmountInLakhCrK(onAccountPayable, 'INR'),
									)}
								</span>
								<div className={styles.on_account}>On Account Payment</div>
							</div>

							<div className={styles.accounts_text_style}>
								<div style={{ marginRight: '2px' }}>

									<div className={styles.account_change_text_style}>
										<div className={styles.color_box} />
										<div className={AccountChangeFromYesterday >= 0
											? styles.icon_plus_styles : styles.icon_minus_styles}
										>
											<IcMArrowNext height={20} width={20} />

										</div>
										<div>
											{AccountChangeFromYesterday.toFixed(2)}
										</div>
									</div>

								</div>
								%
								<span className={styles.yesterday_text_style}>
									{AccountChangeFromYesterday >= 0 ? 'more' : 'less'}
									{' '}
									than yesterday
								</span>
							</div>
						</div>
					)}
					{payablesLoading ? (
						<div style={{ alignItems: 'center' }}>
							<Placeholder height="30px" width="250px" margin="16px 20px 50px 0px" />
						</div>
					) : (
						<div style={{ marginTop: '20px' }}>
							<div style={{ display: 'flex' }}>
								<span>
									{showInTooltop(
										getFormattedPrice(outstandingPayable, 'INR'),
										getAmountInLakhCrK(outstandingPayable, 'INR'),
									)}
								</span>
								<div className={styles.on_account}>Outstanding</div>
							</div>

							<div className={styles.accounts_text_style}>
								<div style={{ marginRight: '2px' }}>

									<div className={styles.account_change_text_style}>
										<div className={styles.color_box_outstanding} />
										<div className={outstandingChangeYesterday >= 0
											? styles.icon_plus_styles : styles.icon_minus_styles}
										>
											<IcMArrowNext height={20} width={20} />

										</div>
										<div>
											{outstandingChangeYesterday.toFixed(2)}
										</div>
									</div>

								</div>
								%
								<span className={styles.yesterday_text_style}>
									{outstandingChangeYesterday >= 0 ? 'more' : 'less'}
									{' '}
									than yesterday
								</span>
							</div>
						</div>
					)}
				</div>
			</div>

		</div>
	);
}

export default TotalPayable;
