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
		jobId,
		jobNumber,
		jobStatus,
		quotationProfitability,
		tentativeProfitability,
		incomeCount,
		incomeTotalAmount,
		expenseCount,
		expenseTotalAmount,
		serviceType,
		pendingApprovalCount,
		urgentCount,
		urgentTotalAmount,
		creditNoteCount,
		creditNoteTotalAmount,
	} = itemData || {};
	const [amountTab, setAmountTab] = useState('expense');
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
									{getFormattedPrice(
										expenseTotalAmount,
										'INR',
									)}
								</div>
							</div>
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
									{getFormattedPrice(
										urgentTotalAmount!,
										'INR',
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
										incomeTotalAmount,
										'INR',
									)}
								</div>
							</div>
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
									{getFormattedPrice(
										creditNoteTotalAmount,
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
							{currentOpenSID !== jobId ? (
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
									disabled={!dataCard?.jobNumber}
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
					</div>
					{jobStatus === 'OPEN' ? (
						<div className={styles.ribbon}>{jobStatus}</div>
					) : (
						<div className={styles.ribbon_closed}>{jobStatus}</div>
					)}
				</div>
				<div>
					{currentOpenSID === jobId ? (
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
