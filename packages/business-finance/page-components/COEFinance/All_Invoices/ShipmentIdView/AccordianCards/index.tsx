import { Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import getFormattedPrice from '../../../../commons/utils/getFormattedPrice';
import { ItemDataProps } from '../index';

import CardItem from './CardItem/index';
import styles from './styles.module.css';

interface listData {
	itemData: ItemDataProps;
	currentOpenSID: string;
	setCurrentOpenSID: Function;
	refetch: any;
}
function AccordianCards({
	itemData,
	currentOpenSID,
	setCurrentOpenSID,
	refetch,
}: listData) {
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
				<div className={styles.subContainer}>
					<div className={styles.column1}>
						<div className={styles.sid}>
							<div className={styles.sidContainer}>
								<div className={styles.sidLabelText}>
									SID -
									{' '}
								</div>
								<div className={styles.sidValueText}>
									{itemData.serial_id}
								</div>
							</div>
							{itemData.pending_approvals === 0 ? null : (
								<div className={styles.pendingText}>
									Pending Approval -
									{' '}
									{itemData.pending_approvals}
								</div>
							)}
						</div>
						<div className={styles.freightWidth}>
							<div className={styles.freight}>
								{startCase(itemData.shipment_type!)}
							</div>
						</div>
					</div>
					<div className={styles.rightBorder}>
						<div className={styles.vr} />
					</div>

					<div className={styles.column2}>
						<div className={styles.expenseAmount}>
							<div className={styles.expense}>
								<div className={styles.expenseLabelText}>
									Expense (
									{itemData.expense_count || 0}
									)
								</div>
								<div className={styles.smallRightBorder}>
									<div className={styles.smallVr} />
								</div>
								<div className={styles.expenseValueText}>
									{getFormattedPrice(
                                    	itemData.expense_total_price!,
                                    	itemData.expense_total_currency!,
									)}
								</div>
							</div>
							<div className={styles.urgent}>
								<div className={styles.urgentLabelText}>
									Urgent (
									{itemData.urgency_expense_count}
									)
								</div>
								<div className={styles.smallRightBorder}>
									<div className={styles.urgentVr} />
								</div>
								<div className={styles.urgentValueText}>
									{getFormattedPrice(
                                    	itemData.urgency_total_price!,
                                    	itemData.urgency_total_currency || 'INR',
									)}
								</div>
							</div>
						</div>
						<div className={styles.expenseAmount}>
							<div className={styles.expense}>
								<div className={styles.expenseLabelText}>
									Income (
									{itemData.income_count}
									)
								</div>
								<div className={styles.smallRightBorder}>
									<div className={styles.smallVr} />
								</div>
								<div className={styles.expenseValueText}>
									{getFormattedPrice(
                                    	itemData.income_total_price!,
                                    	itemData.income_total_currency || 'INR',
									)}
								</div>
							</div>
							<div className={styles.expense}>
								<div className={styles.expenseLabelText}>
									Credit Note (
									{itemData.credit_expense_count}
									)
								</div>
								<div className={styles.smallRightBorder}>
									<div className={styles.smallVr} />
								</div>
								<div className={styles.expenseValueText}>
									{getFormattedPrice(
                                    	itemData.credit_total_price!,
                                    	'INR',
									)}
								</div>
							</div>
						</div>
					</div>
					<div className={styles.rightBorder}>
						<div className={styles.vr} />
					</div>

					<div className={styles.column3}>
						<div className={styles.expenseAmount}>
							<div className={styles.expense}>
								<div className={styles.profitibility}>
									Quotation Profitability
								</div>
								<div className={styles.smallRightBorder}>
									<div
										className={styles.profitibilityBorder}
									/>
								</div>
								<div className={styles.profitibilityValue}>
									{itemData.quotation_profit}
									%
								</div>
							</div>

							<div className={styles.expense}>
								<div className={styles.profitibility}>
									Actual Profitability
								</div>
								<div className={styles.smallRightBorder}>
									<div
										className={styles.profitibilityBorder}
									/>
								</div>
								<div className={styles.profitibilityValue}>
									{itemData.tentative_profit}
									{' '}
									%
								</div>
							</div>
						</div>
						<div className={styles.buttonStyle}>
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
                                    		`/business-finance/coe-finance/cost-sheet?shipmentId=${itemData.id}&jobNumber=${dataCard.jobNumber}&jobSource=${dataCard.jobSource}&jobType=${dataCard.jobType}&orgId=${dataCard.organizationId}`,
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
						<div className={styles.ribbonClosed}>Closed</div>
					)}
				</div>
				<div>
					{currentOpenSID === itemData?.id ? (
						<CardItem
							cardData={itemData}
							currentOpenSID={currentOpenSID}
							setCurrentOpenSID={setCurrentOpenSID}
							refetch={refetch}
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
