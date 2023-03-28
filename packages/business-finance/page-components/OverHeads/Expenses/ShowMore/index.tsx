/* eslint-disable max-len */
import { Button, Placeholder } from '@cogoport/components';
import { IcMArrowDown, IcMArrowUp } from '@cogoport/icons-react';
import React, { useEffect, useState } from 'react';

import { formatDate } from '../../../commons/utils/formatDate';
import useListExpense from '../hooks/useListExpense';
import useSendEmail from '../hooks/useSendEmail';

import styles from './styles.module.css';

interface BillInterface {
	billNumber?:string | number,
	paidTds ?: number,
	grandTotal?:number,
	paidAmount?:number | string,
	dueDate?:Date,
	billDate?:Date,
	createdDate?:Date,
	status?:string,
	updatedAt?:any,
	payableTds?:any,
	billDocumentUrl?:string,
	approvedByName?:string,
	approvedByUser?:{ id?:string | number },
}

interface Props {
	id?:number | string,
	recurringState?:string,
	showExpenseModal?:boolean,
}

function ShowMore({ id, recurringState, showExpenseModal }:Props) {
	const [moreData, setMoreData] = useState(false);
	const { getList, listData, listLoading } = useListExpense({ id, expenseType: 'RECURRING' });
	const billList = listData?.list;

	const { sendMail, loading:mailLoading } = useSendEmail();

	useEffect(() => {
		if (moreData) { getList(); }
	}, [getList, moreData]);

	useEffect(() => {
		if (showExpenseModal === true) { setMoreData(false); }
	}, [showExpenseModal]);

	return (
		<div className={styles.container}>
			{!moreData && (
				<div className={styles.button_container}>
					<button
						className={styles.button_style}
						onClick={() => setMoreData(true)}
					>
						<div>Show more</div>
						{' '}
						<div style={{ marginBottom: '-4px' }}><IcMArrowDown /></div>
					</button>
				</div>
			)}

			<div className={moreData
				? styles.more_data_container : `${styles.more_data_container} ${styles.more_data_container_close}`}
			>
				{listLoading ? (
					<div style={{ display: 'flex' }}>
						<Placeholder height="50px" width="32%" margin="8px" />
						<Placeholder height="50px" width="32%" margin="8px" />
						<Placeholder height="50px" width="32%" margin="8px" />
					</div>
				) :	(
					<div className={styles.list_container}>
						{
							billList?.length > 0 ? (
								<div>
									{billList?.map((bill:BillInterface) => {
										const {
											billNumber, grandTotal, paidAmount = 0, payableTds = 0,
											dueDate, billDate, createdDate, status, approvedByName, updatedAt,
											billDocumentUrl = '',
										} = bill || {};
										// const { name = '' } = approvedByName || {};

										return (
											<div className={styles.data_div}>
												<div className={styles.section}>
													<div>Invoice No.</div>
													<div className={`${styles.element} ${styles.link}`}>
														<a
															href={billDocumentUrl}
															style={{ color: '#f68b21' }}
															target="_blank"
															rel="noreferrer"
														>
															{billNumber || '-'}

														</a>
													</div>
												</div>
												<div className={styles.section}>
													<div>TDS</div>
													<div className={styles.element}>{payableTds}</div>
												</div>
												<div className={styles.section}>
													<div>Payable</div>
													<div className={styles.element}>{grandTotal - payableTds}</div>
												</div>
												<div className={styles.section}>
													<div>Paid</div>
													<div className={styles.element}>{paidAmount }</div>
												</div>
												<div className={styles.section}>
													<div>Due Date</div>
													<div className={styles.element}>
														{formatDate(
															dueDate,
															'dd MMM yyyy',
															{},
															false,
														) || '-'}

													</div>
												</div>
												<div className={styles.section}>
													<div>Invoice Date</div>
													<div className={styles.element}>
														{' '}
														{formatDate(
															billDate,
															'dd MMM yyyy',
															{},
															false,
														) || '-'}

													</div>
												</div>
												<div className={styles.section}>
													<div>Upload Date</div>
													<div className={styles.element}>
														{' '}
														{formatDate(
															createdDate,
															'dd MMM yyyy',
															{},
															false,
														) || '-'}

													</div>
												</div>
												<div className={styles.section}>
													<div>Approved By</div>
													<div className={`${styles.element} `}>
														<div>
															{status !== 'INITIATED' ? (
																<div style={{ fontSize: '12px' }}>
																	<div>{approvedByName}</div>
																	<div>{formatDate(updatedAt, 'dd MMM yyyy', {}, false) }</div>
																</div>
															) : (
																<>
																	<div className={styles.pending_approval}>Pending Approval</div>
																	<div className={styles.link}>
																		<Button
																			style={{ background: 'none', color: '#F68B21', fontSize: '12px', padding: '0px 4px' }}
																			disabled={mailLoading}
																			onClick={() => { sendMail({ rowData: bill, recurringState }); }}
																		>
																			Re-send Email
																		</Button>
																	</div>
																</>
															)}
														</div>
													</div>
												</div>
											</div>
										);
									}) }
								</div>
							) : (
								<div style={{
									display       : 'flex',
									alignItems    : 'center',
									flexDirection : 'column',
									padding       : '8px',
								}}
								>
									<div style={{
										fontWeight : '500',
										margin     : '12px',
									}}
									>
										No data available

									</div>
								</div>
							)
						}

					</div>
				)}
				{moreData && (
					<div className={styles.button_container}>
						<button
							className={styles.button_style}
							onClick={() => setMoreData(false)}
						>
							<div>Show less</div>
							{' '}
							<div style={{ marginBottom: '-4px' }}><IcMArrowUp /></div>
						</button>
					</div>
				)}
			</div>
		</div>
	);
}

export default ShowMore;
