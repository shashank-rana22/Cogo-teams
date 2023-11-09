import { Button, Pagination } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMProvision } from '@cogoport/icons-react';
import React from 'react';

import ViewRecurringSummery from '../CreateExpenseModal/ViewRecurringSummery';

import styles from './styles.module.css';

function BillList({
	billList = [],
	mailLoading,
	sendMail = () => {},
	incidentId,
	sendOverheadExpense = () => {},
	currentPage,
	totalRecords,
	handlePageChange,
}) {
	return (
		<div>
			{billList?.map((bill) => {
				const {
					billId,
					billNumber,
					grandTotal,
					paidAmount = 0,
					payableTds = 0,
					dueDate,
					billDate,
					createdDate,
					status,
					approvedByName,
					updatedAt,
					billDocumentUrl = '',
					billCurrency = '',
				} = bill || {};

				return (
					<div className={styles.data_div} key={bill}>
						<div className={styles.section}>
							<div>Invoice No.</div>
							<div className={`${styles.element} ${styles.link}`}>
								<a
									href={billDocumentUrl}
									style={{
										color: '#f68b21',
									}}
									target="_blank"
									rel="noreferrer"
								>
									{billNumber || '-'}
								</a>
							</div>
						</div>

						<div className={styles.section}>
							<div>Payable</div>
							<div className={styles.element}>
								{formatAmount({
									amount: (grandTotal
															- payableTds),
									currency : billCurrency,
									options  : {
										style: 'currency',
										currencyDisplay:
																'code',
									},
								})}
							</div>
						</div>

						<div className={styles.section}>
							<div>TDS</div>
							<div className={styles.element}>
								{formatAmount({
									amount   : payableTds,
									currency : billCurrency,
									options  : {
										style           : 'currency',
										currencyDisplay : 'code',
									},
								})}
							</div>
						</div>

						<div className={styles.section}>
							<div>Paid</div>
							<div className={styles.element}>
								{formatAmount({
									amount   : paidAmount,
									currency : billCurrency,
									options  : {
										style           : 'currency',
										currencyDisplay : 'code',
									},
								})}
							</div>
						</div>

						<div className={styles.section}>
							<div>Due Date</div>
							<div className={styles.element}>
								{formatDate({
									date       : dueDate,
									formatType : 'date',
									dateFormat:
                                        GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
								})}
							</div>
						</div>

						<div className={styles.section}>
							<div>Invoice Date</div>
							<div className={styles.element}>
								{formatDate({
									date       : billDate,
									formatType : 'date',
									dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
								})}
							</div>
						</div>
						<div className={styles.section}>
							<div>Upload Date</div>
							<div className={styles.element}>
								{formatDate({
									date       : createdDate,
									formatType : 'date',
									dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
								})}
							</div>
						</div>
						<div className={styles.section}>
							<div>Approved By</div>
							<div className={`${styles.element} `}>
								<div>
									{status !== 'LOCKED' ? (
										<div style={{ fontSize: '12px' }}>
											<div>
												{approvedByName}
											</div>
											<div>
												{formatDate(
													{
														date       : updatedAt,
														formatType : 'date',
														dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
													},
												)}
											</div>
										</div>
									) : (
										<>
											<div className={styles.pending_approval}>
												Pending
												Approval
											</div>
											<div className={styles.link}>
												<Button
													style={{
														background : 'none',
														color      : '#F68B21',
														fontSize   :	'12px',
														padding    :	'0px 4px',
													}}
													disabled={mailLoading}
													onClick={() => {
														sendMail({ incidentId });
													}}
												>
													Re-send
													Email
												</Button>
											</div>
										</>
									)}
								</div>
							</div>
						</div>
						<div className={styles.view}>
							<ViewRecurringSummery itemData={bill} />
						</div>
						<div className={styles.section}>
							<div className={styles.element}>
								<IcMProvision
									onClick={() => { sendOverheadExpense(billId); }}
									style={{ cursor: 'pointer' }}
									height={24}
									width={24}
									color="#F68B21"
								/>

							</div>
						</div>
					</div>
				);
			})}
			<div className={styles.pagination}>
				<Pagination
					type="table"
					currentPage={currentPage}
					totalItems={totalRecords}
					pageSize={5}
					onPageChange={handlePageChange}
				/>
			</div>
		</div>
	);
}

export default BillList;
