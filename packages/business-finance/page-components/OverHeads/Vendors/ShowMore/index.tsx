import { Placeholder } from '@cogoport/components';
import { IcMArrowDown, IcMArrowUp } from '@cogoport/icons-react';
import React, { useEffect, useState } from 'react';

import SegmentedControl from '../../../commons/SegmentedControl';
import showOverflowingNumber from '../../../commons/showOverflowingNumber';
import { formatDate } from '../../../commons/utils/formatDate';
import List from '../../commons/List';
import useListExpense from '../hooks/useListExpense';
import { expenseConfig } from '../utils/config';

import styles from './styles.module.css';

interface Props {
	vendorId?:number | string,
}

function ShowMore({ vendorId }:Props) {
	const [moreData, setMoreData] = useState(false);
	const [pageIndex, setPageIndex] = useState(1);
	const [expenseType, setExpenseType] = useState('RECURRING');

	const { getList, listData, listLoading } = useListExpense();

	const handlePageChange = (pageValue:number) => {
		setPageIndex(pageValue);
	};

	const OPTIONS = [
		{
			label : 'Recurring',
			value : 'RECURRING',
		},
		{
			label : 'Non-Recurring',
			value : 'NON_RECURRING',
		},
	];

	useEffect(() => {
		if (moreData) getList({ vendorId, expenseType, pageIndex, pageSize: 5 });
	}, [expenseType, getList, moreData, pageIndex, vendorId]);

	useEffect(() => {
		setPageIndex(1);
	}, [expenseType]);

	const functions = {
		renderCategory: (itemData:any) => {
			const { category = '' } = itemData || {};
			return (
				<div style={{ fontSize: '14px' }}>
					{category.replaceAll('_', ' ')}
				</div>
			);
		},
		getPayable: (itemData:any) => {
			const { grandTotal, paidAmount, billCurrency = '' } = itemData || {};
			return (
				<div>
					{billCurrency}
					{' '}
					{(grandTotal >= 0 && paidAmount >= 0) ? (grandTotal - paidAmount) : '-'}
				</div>
			);
		},
		getInvoiceDates: (itemData:any) => {
			const { dueDate, billDate, createdDate } = itemData || {};
			return (
				<div style={{ fontSize: '10px' }}>
					{dueDate && billDate && createdDate && (
						<div>
							<div>
								Due Date:
								{' '}
								{formatDate(dueDate, 'dd MMM yyyy', {}, false) }
							</div>
							<div>
								Invoice Date:
								{' '}
								{ formatDate(billDate, 'dd MMM yyyy', {}, false) }
							</div>
							<div>
								Upload Date:
								{' '}
								{formatDate(createdDate, 'dd MMM yyyy', {}, false) }
							</div>

						</div>
					)}
				</div>

			);
		},
		getApprovedByRecurring: (itemData:any) => {
			const { updatedAt, approvedByUser, status } = itemData || {};
			const { name = '' } = approvedByUser || {};
			return (
				<div>
					{status !== 'INITIATED' ? (
						<div style={{ fontSize: '12px' }}>
							<div>{name}</div>
							<div>{formatDate(updatedAt, 'dd MMM yyyy', {}, false) || '-' }</div>
						</div>
					) : (
						<>
							<div className={styles.pending_approval}>Pending Approval</div>
							{/* <div className={styles.link}>
								<Button
									style={{
										background : 'none',
										color      : mailLoading ? '#b0b0b0' : '#F68B21',
										fontSize   : '11px',
										padding    : '0px 4px',
									}}
									disabled={mailLoading}
									onClick={() => { sendMail({ rowData: itemData, recurringState }); }}
								>
									Re-send Email
								</Button>
							</div> */}
						</>
					)}
				</div>
			);
		},
		getInvoiceNumber: (itemData:any) => {
			const { billNumber, billDocumentUrl = '' } = itemData || {};
			return (
				<div>
					{ billNumber ? (
						<div className={styles.link}>
							<a
								href={billDocumentUrl}
								target="_blank"
								rel="noreferrer"
								style={{ color: '#F68B21' }}
							>
								{showOverflowingNumber(billNumber, 12)}

							</a>
						</div>
					) : '-' }
				</div>
			);
		},
		renderInvoiceAmount: (itemData:any) => {
			const { grandTotal, billCurrency = '' } = itemData || {};
			const amount = `${billCurrency} ${grandTotal}`;
			return (
				<div>
					{showOverflowingNumber(amount || '', 12)}
				</div>
			);
		},
		renderTds: (itemData:any) => {
			const { payableTds, billCurrency = '' } = itemData || {};
			const amount = `${billCurrency} ${payableTds}`;
			return (
				<div>
					{showOverflowingNumber(amount || '', 12)}
				</div>
			);
		},
		renderPaid: (itemData:any) => {
			const { paidAmount, billCurrency = '' } = itemData || {};
			const amount = `${billCurrency} ${paidAmount}`;
			return (
				<div>
					{showOverflowingNumber(amount || '', 12)}
				</div>
			);
		},
	};

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
					<div>
						<div style={{ display: 'flex' }}>
							{[1, 2, 3].map(() => (
								<Placeholder height="50px" width="32%" margin="8px" />
							))}
						</div>
						<div style={{ display: 'flex' }}>
							{[1, 2, 3].map(() => (
								<Placeholder height="50px" width="32%" margin="8px" />
							))}
						</div>
						<div style={{ display: 'flex' }}>
							{[1, 2, 3].map(() => (
								<Placeholder height="50px" width="32%" margin="8px" />
							))}
						</div>
					</div>
				) : (
					<div style={{ padding: '20px' }}>
						<div className={styles.segmented_control}>
							<SegmentedControl
								options={OPTIONS}
								activeTab={expenseType}
								setActiveTab={setExpenseType}
								color="#ED3726"
								background="#FFFAEB"
							/>
						</div>
						{(listData && listData?.list?.length > 0) ? (
							<List
								config={expenseConfig()}
								itemData={listData}
								loading={listLoading}
								functions={functions}
								page={pageIndex}
								pageSize={5}
								handlePageChange={handlePageChange}
								showPagination
							/>
						) : (
							<div className={styles.no_data}>
								<div>No data found</div>
								<img
									src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/empty_no_data.svg"
									alt="no data"
								/>
							</div>
						)}
					</div>
				)}

				{moreData && (
					<div className={styles.button_container}>
						<button
							className={styles.button_style}
							onClick={() => {
								setMoreData(false);
								setExpenseType('RECURRING');
							}}
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
