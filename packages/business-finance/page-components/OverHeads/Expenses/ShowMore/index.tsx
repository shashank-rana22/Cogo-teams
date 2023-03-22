import { Placeholder } from '@cogoport/components';
import { IcMArrowDown, IcMArrowUp } from '@cogoport/icons-react';
import React, { useEffect, useState } from 'react';

import { formatDate } from '../../../commons/utils/formatDate';
import useListExpense from '../hooks/useListExpense';

import styles from './styles.module.css';

interface BillInterface {
	billNumber?:string | number,
	paidTds ?: number,
	grandTotal?:number,
	paidAmount?:number | string,
	dueDate?:Date,
	billDate?:Date,
	createdDate?:Date,
}

function ShowMore({ id }) {
	const [moreData, setMoreData] = useState(false);
	const { getList, listData, listLoading } = useListExpense({ id, expenseType: 'RECURRING' });
	const billList = listData?.list;

	useEffect(() => {
		if (moreData) { getList(); }
	}, [getList, moreData]);

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
											billNumber, paidTds = 0, grandTotal, paidAmount = 0,
											dueDate, billDate, createdDate,
										} = bill || {};
										return (
											<div className={styles.data_div}>
												<div className={styles.section}>
													<div>Invoice Number</div>
													<div className={`${styles.element} ${styles.link}`}>
														<a href="#">{billNumber || '-'}</a>
													</div>
												</div>
												<div className={styles.section}>
													<div>TDS</div>
													<div className={styles.element}>{paidTds}</div>
												</div>
												<div className={styles.section}>
													<div>Payable</div>
													<div className={styles.element}>{grandTotal - paidTds}</div>
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
