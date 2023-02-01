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
									{itemData.serial_id}
								</div>
							</div>
							{itemData.pending_approvals === 0 ? null : (
								<div className={styles.pending_text}>
									Pending Approval -
									{' '}
									{itemData.pending_approvals}
								</div>
							)}
						</div>
						<div className={styles.freight_width}>
							<div className={styles.freight}>
								{startCase(itemData.shipment_type!)}
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
									{itemData.expense_count || 0}
									)
								</div>
								<div className={styles.small_right_border}>
									<div className={styles.smallVr} />
								</div>
								<div className={styles.expense_value_text}>
									{getFormattedPrice(
										itemData.expense_total_price!,
										itemData.expense_total_currency!,
									)}
								</div>
							</div>
							<div className={styles.urgent}>
								<div className={styles.urgent_label_text}>
									Urgent (
									{itemData.urgency_expense_count}
									)
								</div>
								<div className={styles.small_right_border}>
									<div className={styles.urgent_vr} />
								</div>
								<div className={styles.urgent_value_text}>
									{getFormattedPrice(
										itemData.urgency_total_price!,
										itemData.urgency_total_currency || 'INR',
									)}
								</div>
							</div>
						</div>
						<div className={styles.expense_amount}>
							<div className={styles.expense}>
								<div className={styles.expense_label_text}>
									Income (
									{itemData.income_count}
									)
								</div>
								<div className={styles.small_right_border}>
									<div className={styles.small_vr} />
								</div>
								<div className={styles.expense_value_text}>
									{getFormattedPrice(
										itemData.income_total_price!,
										itemData.income_total_currency || 'INR',
									)}
								</div>
							</div>
							<div className={styles.expense}>
								<div className={styles.expense_label_text}>
									Credit Note (
									{itemData.credit_expense_count}
									)
								</div>
								<div className={styles.small_right_border}>
									<div className={styles.smallVr} />
								</div>
								<div className={styles.expense_value_text}>
									{getFormattedPrice(
										itemData.credit_total_price!,
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
									{itemData.quotation_profit}
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
									{itemData.tentative_profit}
									{' '}
									%
								</div>
							</div>
						</div>
						<div className={styles.button_style}>
							{currentOpenSID !== itemData?.id ? (
								<Button
									style={{ height: '30px', fontSize: '12px' }}
									onClick={() => {
										setCurrentOpenSID(itemData?.id);
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
										setCurrentOpenSID(itemData?.id);
										router.push(
											`/business-finance/coe-finance/cost-sheet?shipmentId=${itemData.id}
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
					{currentOpenSID === itemData?.id ? (
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
