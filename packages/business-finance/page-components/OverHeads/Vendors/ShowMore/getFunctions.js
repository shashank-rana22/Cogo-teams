import formatAmount from '@cogoport/globalization/utils/formatAmount';

import showOverflowingNumber from '../../../commons/showOverflowingNumber';
import { formatDate } from '../../../commons/utils/formatDate';
import ViewRecurringSummery from '../../Expenses/CreateExpenseModal/ViewRecurringSummery';

import styles from './styles.module.css';

const functions = {
	renderCategory: (itemData) => {
		const { category = '' } = itemData || {};
		return (
			<div style={{ fontSize: '14px' }}>
				{category.replaceAll('_', ' ')}
			</div>
		);
	},
	getPayable: (itemData) => {
		const {
			grandTotal,
			paidAmount,
			billCurrency = '',
			payableAmount,
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
	getInvoiceDates: (itemData) => {
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
	getApprovedByRecurring: (itemData) => {
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
	getInvoiceNumber: (itemData) => {
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
	renderInvoiceAmount: (itemData) => {
		const { grandTotal, billCurrency = '' } = itemData || {};
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
	renderTds: (itemData) => {
		const { payableTds, billCurrency = '' } = itemData || {};
		const amount = formatAmount({
			amount   : payableTds,
			currency : billCurrency,
			options  : {
				style           : 'currency',
				currencyDisplay : 'code',
			},
		});
		return <div>{showOverflowingNumber(amount || '', 12)}</div>;
	},
	renderPaid: (itemData) => {
		const { paidAmount, billCurrency = '' } = itemData || {};
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
	renderView: (itemData) => (
		<div>
			<ViewRecurringSummery itemData={itemData} />
		</div>
	),
};

export default functions;
