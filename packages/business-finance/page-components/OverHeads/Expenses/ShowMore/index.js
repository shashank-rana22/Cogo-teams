/* eslint-disable max-lines-per-function */
/* eslint-disable max-len */
import { Button, Placeholder, Pagination } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMArrowDown, IcMArrowUp, IcMProvision } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useEffect, useState } from 'react';

import Filter from '../../../commons/Filters';
import filtersconfig from '../../Vendors/filtersconfig';
import ViewRecurringSummery from '../CreateExpenseModal/ViewRecurringSummery';
import useListExpense from '../hooks/useListExpense';
import useSendEmail from '../hooks/useSendEmail';
import useSendOverheadExpense from '../hooks/useSendOverheadExpense';

import styles from './styles.module.css';

function ShowMore({ id, showExpenseModal, incidentId }) {
	const [moreData, setMoreData] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [expenseFilters, setExpenseFilters] = useState({});
	const { getList, listData, listLoading } = useListExpense({
		expenseFilters,
		id,
		expenseType  : 'RECURRING',
		pageIndexVal : currentPage,
		pageSizeVal  : 5,
	});
	const totalRecords = listData?.totalRecords || 0;
	const billList = listData?.list;

	const { sendMail, loading: mailLoading } = useSendEmail();

	useEffect(() => {
		if (moreData) {
			getList();
		} else {
			setCurrentPage(1);
		}
	}, [getList, moreData, expenseFilters]);

	useEffect(() => {
		if (showExpenseModal === true) {
			setMoreData(false);
		}
	}, [showExpenseModal]);

	const handlePageChange = (pageValue) => {
		setCurrentPage(pageValue);
	};
	const { sendOverheadExpense } = useSendOverheadExpense();

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
						<div style={{ marginBottom: '-4px' }}>
							<IcMArrowDown />
						</div>
					</button>
				</div>
			)}

			<div
				className={
					moreData
						? styles.more_data_container
						: `${styles.more_data_container} ${styles.more_data_container_close}`
				}
			>
				{listLoading ? (
					<div>
						{Array(3)
							.fill(null)
							.map((valu) => (
								<div style={{ display: 'flex' }} key={valu}>
									{Array(3)
										.fill(null)
										.map((val) => (
											<Placeholder
												key={val}
												height="50px"
												width="32%"
												margin="8px"
											/>
										))}
								</div>
							))}
					</div>
				) : (
					<div className={styles.list_container}>
						{!isEmpty(billList) ? (
							<div>
								<div className={styles.segmented_control}>
									<div className={styles.filtercont}>
										<Filter
											controls={filtersconfig}
											filters={expenseFilters}
											setFilters={setExpenseFilters}
										/>
									</div>
								</div>
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
										<div
											className={styles.data_div}
											key={bill}
										>
											<div className={styles.section}>
												<div>Invoice No.</div>
												<div
													className={`${styles.element} ${styles.link}`}
												>
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
															style: 'currency',
															currencyDisplay:
																'code',
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
															style: 'currency',
															currencyDisplay:
																'code',
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
															GLOBAL_CONSTANTS
																.formats.date[
																	'dd MMM yyyy'
																],
													})}
												</div>
											</div>
											<div className={styles.section}>
												<div>Invoice Date</div>
												<div className={styles.element}>
													{formatDate({
														date       : billDate,
														formatType : 'date',
														dateFormat:
															GLOBAL_CONSTANTS
																.formats.date[
																	'dd MMM yyyy'
																],
													})}
												</div>
											</div>
											<div className={styles.section}>
												<div>Upload Date</div>
												<div className={styles.element}>
													{formatDate({
														date       : createdDate,
														formatType : 'date',
														dateFormat:
															GLOBAL_CONSTANTS
																.formats.date[
																	'dd MMM yyyy'
																],
													})}
												</div>
											</div>
											<div className={styles.section}>
												<div>Approved By</div>
												<div
													className={`${styles.element} `}
												>
													<div>
														{status !== 'LOCKED' ? (
															<div
																style={{
																	fontSize:
																		'12px',
																}}
															>
																<div>
																	{
																		approvedByName
																	}
																</div>
																<div>
																	{formatDate(
																		{
																			date: updatedAt,
																			formatType:
																				'date',
																			dateFormat:
																				GLOBAL_CONSTANTS
																					.formats
																					.date[
																						'dd MMM yyyy'
																					],
																		},
																	)}
																</div>
															</div>
														) : (
															<>
																<div
																	className={
																		styles.pending_approval
																	}
																>
																	Pending
																	Approval
																</div>
																<div
																	className={
																		styles.link
																	}
																>
																	<Button
																		style={{
																			background:
																				'none',
																			color: '#F68B21',
																			fontSize:
																				'12px',
																			padding:
																				'0px 4px',
																		}}
																		disabled={
																		mailLoading
																		}
																		onClick={() => {
																			sendMail(
																				{
																					incidentId,
																				},
																			);
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
						) : (
							<div
								style={{
									display       : 'flex',
									alignItems    : 'center',
									flexDirection : 'column',
									padding       : '8px',
								}}
							>
								<div
									style={{
										fontWeight : '500',
										margin     : '12px',
									}}
								>
									No data available
								</div>
								<img
									alt="no data"
									src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/empty_no_data.svg"
								/>
							</div>
						)}
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
							<div style={{ marginBottom: '-4px' }}>
								<IcMArrowUp />
							</div>
						</button>
					</div>
				)}
			</div>
		</div>
	);
}

export default ShowMore;
