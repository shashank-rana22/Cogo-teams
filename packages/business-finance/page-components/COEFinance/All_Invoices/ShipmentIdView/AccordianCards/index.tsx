import { Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcMArrowRotateDown,	IcMArrowRotateUp } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { startCase } from '@cogoport/utils';
import React, { useState } from 'react';

// eslint-disable-next-line import/no-cycle
import { ItemDataProps } from '../index';

import CardItem from './CardItem/index';
import styles from './styles.module.css';

interface ListData {
	itemData: ItemDataProps;
	currentOpenSID: string;
	setCurrentOpenSID: Function;
	shipmentIdView?: boolean;
	onTabClick?: Function;
	onAccept?: Function;
	showTab?: boolean;
	sidDataChecked?: boolean;
}

const PRESENT_TAB = 'sidDataTab';

function AccordianCards({
	itemData,
	currentOpenSID,
	setCurrentOpenSID,
	shipmentIdView = true,
	onTabClick = (prop) => (prop),
	onAccept = (prop) => (prop),
	showTab = false,
	sidDataChecked = false,
}: ListData) {
	const {
		jobId,
		jobNumber,
		jobStatus,
		quotationProfitability,
		tentativeProfitability,
		incomeCount,
		incomeTotalAmount,
		expenseCount,
		expenseTotalAmount,
		buyQuotationCount = 0,
		buyQuotationTotalAmount = 0,
		sellQuotationCount = 0,
		sellQuotationTotalAmount = 0,
		serviceType,
		pendingApprovalCount,
		urgentCount,
		urgentTotalAmount,
		creditNoteCount,
		creditNoteTotalAmount,
	} = itemData || {};

	const [amountTab, setAmountTab] = useState('sellQuote');
	const [dataCard, setDataCard] = useState({
		jobNumber      : '',
		jobSource      : '',
		jobType        : '',
		organizationId : '',
		referenceId    : '',
		shipmentId     : '',
	});
	const router = useRouter();

	return (
		<div>
			<div className={styles.container}>
				<div className={styles.sub_container}>
					<div className={styles.column1}>
						<div className={styles.sid}>
							<div className={styles.sid_container}>
								<div className={styles.sid_label_text}>
									SID -
								</div>
								<div className={styles.sid_value_text}>
									{jobNumber}
								</div>
							</div>

							{pendingApprovalCount === 0 ? null : (
								<div className={styles.pending_text}>
									Pending Approval -
									{pendingApprovalCount}
								</div>
							)}
						</div>
						<div className={styles.freight_width}>
							<div className={styles.freight}>
								{startCase(serviceType)}
							</div>
						</div>
					</div>
					<div className={styles.right_border}>
						<div className={styles.vr} />
					</div>

					<div className={styles.column2}>
						<div className={styles.expense_amount}>
							<div className={styles.expense}>
								<div className={styles.expense_label_text}>
									Expense (
									{expenseCount || 0}
									)
								</div>
								<div className={styles.small_right_border}>
									<div className={styles.small_vr} />
								</div>
								<div className={styles.expense_value_text}>
									{formatAmount({
										amount   :	expenseTotalAmount as string,
										currency :	GLOBAL_CONSTANTS.currency_code.INR,
										options  : {
											style           : 'currency',
											currencyDisplay : 'code',
										},
									})}
								</div>
							</div>
							{shipmentIdView ? (
								<div className={styles.urgent}>
									<div className={styles.urgent_label_text}>
										Urgent (
										{urgentCount}
										)
									</div>
									<div className={styles.small_right_border}>
										<div className={styles.urgent_vr} />
									</div>
									<div className={styles.urgent_value_text}>
										{formatAmount({
											amount   : urgentTotalAmount! as any,
											currency : GLOBAL_CONSTANTS.currency_code.INR,
											options  : {
												style           : 'currency',
												currencyDisplay : 'code',
											},
										})}
									</div>
								</div>
							) : (
								<div className={styles.expense}>
									<div className={styles.expense_label_text}>
										Buy Quote (
										{buyQuotationCount}
										)
									</div>
									<div className={styles.small_right_border}>
										<div className={styles.small_vr} />
									</div>
									<div className={styles.expense_value_text}>
										{formatAmount({
											amount   :	String(buyQuotationTotalAmount),
											currency :	GLOBAL_CONSTANTS.currency_code.INR,
											options  : {
												style           : 'currency',
												currencyDisplay : 'code',
											},
										})}
									</div>
								</div>
							)}

						</div>
						<div className={styles.expense_amount}>
							<div className={styles.expense}>
								<div className={styles.expense_label_text}>
									Income (
									{incomeCount}
									)
								</div>
								<div className={styles.small_right_border}>
									<div className={styles.small_vr} />
								</div>
								<div className={styles.expense_value_text}>
									{formatAmount(
										{
											amount   :	incomeTotalAmount as any,
											currency :	GLOBAL_CONSTANTS.currency_code.INR,
											options  : {
												style           : 'currency',
												currencyDisplay : 'code',
											},
										},
									)}
								</div>
							</div>
							{shipmentIdView ? (
								<div className={styles.expense}>
									<div className={styles.expense_label_text}>
										Credit Note (
										{creditNoteCount}
										)
									</div>
									<div className={styles.small_right_border}>
										<div className={styles.small_vr} />
									</div>
									<div className={styles.expense_value_text}>
										{formatAmount({
											amount   :	creditNoteTotalAmount as any,
											currency :	GLOBAL_CONSTANTS.currency_code.INR,
											options  : {
												style           : 'currency',
												currencyDisplay : 'code',
											},
										})}
									</div>
								</div>
							) : (
								<div className={styles.expense}>
									<div className={styles.expense_label_text}>
										Sell Quote (
										{sellQuotationCount}
										)
									</div>
									<div className={styles.small_right_border}>
										<div className={styles.small_vr} />
									</div>
									<div className={styles.expense_value_text}>
										{formatAmount({
											amount   :	String(sellQuotationTotalAmount),
											currency :	GLOBAL_CONSTANTS.currency_code.INR,
											options  : {
												style           : 'currency',
												currencyDisplay : 'code',
											},
										})}
									</div>
								</div>
							) }

						</div>
					</div>
					<div className={styles.right_border}>
						<div className={styles.vr} />
					</div>

					<div className={styles.column3}>
						<div className={styles.expense_amount}>
							<div className={styles.expense}>
								<div className={styles.profitibility}>
									Quotation Profitability
								</div>
								<div className={styles.small_right_border}>
									<div
										className={styles.profitibility_border}
									/>
								</div>
								<div className={styles.profitibility_value}>
									{(quotationProfitability || 0.0)?.toFixed(2)}
									%
								</div>
							</div>

							<div className={styles.expense}>
								<div className={styles.profitibility}>
									Actual Profitability
								</div>
								<div className={styles.small_right_border}>
									<div
										className={styles.profitibility_border}
									/>
								</div>
								<div className={styles.profitibility_value}>
									{(tentativeProfitability || 0.0)?.toFixed(2)}
									{' '}
									%
								</div>
							</div>
						</div>
						<div className={styles.button_style}>
							{currentOpenSID !== jobId && shipmentIdView ? (
								<Button
									style={{ height: '30px', fontSize: '12px' }}
									onClick={() => {
										setCurrentOpenSID(jobId);
									}}
									themeType="secondary"
								>
									View More
								</Button>
							) : (
								<Button
									themeType="secondary"
									style={{ height: '30px', fontSize: '12px' }}
									onClick={() => {
										setCurrentOpenSID(jobId);
										router.push(
											`/business-finance/coe-finance/cost-sheet?shipmentId=
											${dataCard?.shipmentId || dataCard?.referenceId}
										&jobNumber=${dataCard?.jobNumber}&jobSource=${dataCard?.jobSource}
										&jobType=${dataCard?.jobType}&orgId=${dataCard?.organizationId}
										&IsJobClose=${jobStatus}`,
										);
									}}
								>
									Cost View
								</Button>
							)}
						</div>
						{!shipmentIdView && (
							<div
								className={styles.ic_arrow}
								onClick={() => onTabClick({ tabName: PRESENT_TAB })}
								role="presentation"
							>
								{showTab ? (
									<IcMArrowRotateUp height="17px" width="17px" />
								) : (
									<IcMArrowRotateDown height="17px" width="17px" />
								)}
							</div>
						) }
					</div>
					{jobStatus === 'OPEN' ? (
						<div className={styles.ribbon}>{jobStatus}</div>
					) : (
						<div className={styles.ribbon_closed}>{jobStatus}</div>
					)}
				</div>
				<div>
					{(showTab || currentOpenSID === jobId) && (
						<CardItem
							cardData={itemData}
							currentOpenSID={currentOpenSID}
							setCurrentOpenSID={setCurrentOpenSID}
							setDataCard={setDataCard}
							amountTab={amountTab}
							setAmountTab={setAmountTab}
							onAccept={onAccept}
							showTab={showTab}
							sidDataChecked={sidDataChecked}
						/>
					)}

				</div>
			</div>
		</div>
	);
}

export default AccordianCards;
