import { Placeholder } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcMProvision } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useEffect, useState } from 'react';

import showOverflowingNumber from '../../../../commons/showOverflowingNumber';
import { formatDate } from '../../../../commons/utils/formatDate';
import List from '../../../commons/List';
import ViewRecurringSummery from '../../../Expenses/CreateExpenseModal/ViewRecurringSummery';
import useListExpense from '../../hooks/useListExpense';
import useSendSyncOverHeadsVendorExpense from '../../hooks/useSendSyncOverHeadsVendorExpense';
import configs from '../../utils/config';

import styles from './styles.module.css';

const MAX_LOADERS = 3;

function VendorList(props) {
	const {
		filters = {}, moreData = false, vendorId = '', expenseType = '',
	} = props || {};

	const [pageIndex, setPageIndex] = useState(1);

	const { EXPENSE_CONFIG } = configs();

	const { getList = () => {}, listData = {}, listLoading = false } = useListExpense({ filters });

	const handlePageChange = (pageValue) => {
		setPageIndex(pageValue);
	};

	const { sendSyncOverHeadsVendorExpense } = useSendSyncOverHeadsVendorExpense();
	const functions = {
		renderopensearch: (itemData = {}) => (
			<IcMProvision
				onClick={() => { sendSyncOverHeadsVendorExpense(itemData?.billId); }}
				style={{ cursor: 'pointer' }}
				height={24}
				width={24}
				color="#F68B21"
			/>
		),
		renderCategory: (itemData = {}) => {
			const { category = '' } = itemData || {};
			return (
				<div style={{ fontSize: '14px' }}>
					{category.replaceAll('_', ' ')}
				</div>
			);
		},
		getPayable: (itemData = {}) => {
			const {
				grandTotal = 0,
				paidAmount = 0,
				billCurrency = '',
				payableAmount = 0,
			} = itemData || {};
			return (
				<div>
					{grandTotal >= 0 && paidAmount >= 0
						? formatAmount({
							amount   : payableAmount,
							currency : billCurrency,
							options  : {
								style           : 'currency',
								currencyDisplay : 'code',
							},
						})
						: '-'}
				</div>
			);
		},
		getInvoiceDates: (itemData = {}) => {
			const { dueDate, billDate, createdDate } = itemData || {};
			return (
				<div style={{ fontSize: '10px' }}>
					{dueDate && billDate && createdDate && (
						<div>
							<div>
								Due Date:
								{' '}
								{formatDate(dueDate, 'dd MMM yyyy', {}, false)}
							</div>
							<div>
								Invoice Date:
								{' '}
								{formatDate(billDate, 'dd MMM yyyy', {}, false)}
							</div>
							<div>
								Upload Date:
								{' '}
								{formatDate(
									createdDate,
									'dd MMM yyyy',
									{},
									false,
								)}
							</div>
						</div>
					)}
				</div>
			);
		},
		getApprovedByRecurring: (itemData = {}) => {
			const { updatedAt, approvedByUser, status } = itemData || {};
			const { name = '' } = approvedByUser || {};
			return (
				<div>
					{status !== 'LOCKED' ? (
						<div style={{ fontSize: '12px' }}>
							<div>{name}</div>
							<div>
								{formatDate(
									updatedAt,
									'dd MMM yyyy',
									{},
									false,
								) || '-'}
							</div>
						</div>
					) : (
						<div className={styles.pending_approval}>
							Pending Approval
						</div>
					)}
				</div>
			);
		},
		getInvoiceNumber: (itemData = {}) => {
			const { billNumber, billDocumentUrl = '' } = itemData || {};
			return (
				<div>
					{billNumber ? (
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
					) : (
						'-'
					)}
				</div>
			);
		},
		renderInvoiceAmount: (itemData = {}) => {
			const { grandTotal = 0, billCurrency = '' } = itemData || {};
			const amount = formatAmount({
				amount   : grandTotal,
				currency : billCurrency,
				options  : {
					style           : 'currency',
					currencyDisplay : 'code',
				},
			});
			return <div>{showOverflowingNumber(amount || '', 12)}</div>;
		},
		renderTds: (itemData = {}) => {
			const { tdsAmount, billCurrency = '' } = itemData || {};
			const amount = formatAmount({
				amount   : tdsAmount,
				currency : billCurrency,
				options  : {
					style           : 'currency',
					currencyDisplay : 'code',
				},
			});
			return <div>{showOverflowingNumber(amount || '', 12)}</div>;
		},
		renderPaid: (itemData = {}) => {
			const { paidAmount = 0, billCurrency = '' } = itemData || {};
			const amount = formatAmount({
				amount   : paidAmount,
				currency : billCurrency,
				options  : {
					style           : 'currency',
					currencyDisplay : 'code',
				},
			});
			return <div>{showOverflowingNumber(amount || '', 12)}</div>;
		},
		renderView: (itemData = {}) => (
			<div>
				<ViewRecurringSummery itemData={itemData} />
			</div>
		),
	};

	useEffect(() => {
		if (moreData) {
			getList({ vendorId, expenseType, pageIndex, pageSize: 5 });
		}
	}, [expenseType, getList, moreData, pageIndex, vendorId]);

	useEffect(() => {
		setPageIndex(1);
	}, [expenseType]);

	if (listLoading) {
		return (
			<div>
				{[...Array(MAX_LOADERS).keys()].map((key) => (
					<div key={key} className={styles.flex}>
						{[...Array(MAX_LOADERS).keys()].map((val) => (
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
		);
	}

	if (isEmpty(listData?.list)) {
		return (
			<div className={styles.no_data}>
				<div>No data found</div>
				<img
					src={GLOBAL_CONSTANTS.image_url.no_data_found}
					alt="no data"
				/>
			</div>
		);
	}

	return (
		<List
			config={EXPENSE_CONFIG}
			itemData={listData}
			loading={listLoading}
			functions={functions}
			page={pageIndex}
			pageSize={5}
			handlePageChange={handlePageChange}
			showPagination
		/>
	);
}

export default VendorList;
