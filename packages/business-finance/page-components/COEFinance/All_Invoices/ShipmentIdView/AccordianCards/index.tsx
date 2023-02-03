import { Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import getFormattedPrice from '../../../../commons/utils/getFormattedPrice';
// eslint-disable-next-line import/no-cycle
import { ItemDataProps } from '../index';

import CardItem from './CardItem/index';
import styles from './styles.module.css';

interface ListData {
	itemData: ItemDataProps;
	currentOpenSID: string;
	setCurrentOpenSID: Function;
}
function AccordianCards({
	itemData,
	currentOpenSID,
	setCurrentOpenSID,
}: ListData) {
	const {
		serial_id:serialId, pending_approvals:pendingApproval, shipment_type:shipmentType,
		expense_count:expenseCount, expense_total_price:expenceTotalPrice,
		expense_total_currency:expenseTotalCurrency, urgency_expense_count:urgentExpenseCount,
		urgency_total_price:urgencyTotalPrice, urgency_total_currency:urgencyTotalCurrency,
		income_count:incomeCount, income_total_price:incomeTotalPrice, income_total_currency:incomeTotalCurrency,
		credit_expense_count:creditExpanseCount, credit_total_price:creditTotalPrice, quotation_profit:quotationProfit,
		tentative_profit:tentativeProfit, id,
	} = itemData || {};
	const [amountTab, setAmountTab] = useState('expense');
	const [dataCard, setDataCard] = useState({
		jobNumber      : '',
		jobSource      : '',
		jobType        : '',
		organizationId : '',
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
									{' '}
								</div>
								<div className={styles.sid_value_text}>
									{serialId}
								</div>
							</div>
							{itemData.pending_approvals === 0 ? null : (
								<div className={styles.pending_text}>
									Pending Approval -
									{' '}
									{pendingApproval}
								</div>
							)}
						</div>
						<div className={styles.freight_width}>
							<div className={styles.freight}>
								{startCase(shipmentType!)}
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
									{getFormattedPrice(
										expenceTotalPrice!,
										expenseTotalCurrency!,
									)}
								</div>
							</div>
							<div className={styles.urgent}>
								<div className={styles.urgent_label_text}>
									Urgent (
									{urgentExpenseCount}
									)
								</div>
								<div className={styles.small_right_border}>
									<div className={styles.urgent_vr} />
								</div>
								<div className={styles.urgent_value_text}>
									{getFormattedPrice(
										urgencyTotalPrice!,
										urgencyTotalCurrency || 'INR',
									)}
								</div>
							</div>
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
									{getFormattedPrice(
										incomeTotalPrice!,
										incomeTotalCurrency || 'INR',
									)}
								</div>
							</div>
							<div className={styles.expense}>
								<div className={styles.expense_label_text}>
									Credit Note (
									{creditExpanseCount}
									)
								</div>
								<div className={styles.small_right_border}>
									<div className={styles.small_vr} />
								</div>
								<div className={styles.expense_value_text}>
									{getFormattedPrice(
										creditTotalPrice!,
										'INR',
									)}
								</div>
							</div>
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
									{quotationProfit}
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
									{tentativeProfit}
									{' '}
									%
								</div>
							</div>
						</div>
						<div className={styles.button_style}>
							{currentOpenSID !== id ? (
								<Button
									style={{ height: '30px', fontSize: '12px' }}
									onClick={() => {
										setCurrentOpenSID(id);
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
										setCurrentOpenSID(id);
										router.push(
											`/business-finance/coe-finance/cost-sheet?shipmentId=${id}
										&jobNumber=${dataCard.jobNumber}&jobSource=${dataCard.jobSource}
										&jobType=${dataCard.jobType}&orgId=${dataCard.organizationId}`,
										);
									}}
								>
									Cost View
								</Button>
							)}
						</div>
					</div>
					{itemData.is_job_closed === false ? (
						<div className={styles.ribbon}>Open</div>
					) : (
						<div className={styles.ribbon_closed}>Closed</div>
					)}
				</div>
				<div>
					{currentOpenSID === id ? (
						<CardItem
							cardData={itemData}
							currentOpenSID={currentOpenSID}
							setCurrentOpenSID={setCurrentOpenSID}
							setDataCard={setDataCard}
							amountTab={amountTab}
							setAmountTab={setAmountTab}
						/>
					) : null}
				</div>
			</div>
		</div>
	);
}

export default AccordianCards;
