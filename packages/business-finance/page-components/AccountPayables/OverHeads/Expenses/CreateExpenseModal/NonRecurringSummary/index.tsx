/* eslint-disable react/jsx-indent */
import { startCase } from '@cogoport/utils';

import showOverflowingNumber from '../../../../../commons/showOverflowingNumber';
import { formatDate } from '../../../../../commons/utils/formatDate';
import useGetStakeholders from '../../hooks/useGetStakeholders';

import styles from './styles.module.css';

interface Entity {
	entity_code?:number | string,
}

interface Data {
	vendorName?: string,
	transactionDate?: Date,
	paymentMode?:string,
	uploadedInvoice?:string,
	periodOfTransaction?:string,
	expenseCategory?:string,
	expenseSubCategory?:string,
	branch?:string,
	entityObject?:Entity,
	invoiceDate?:Date,
	totalPayable?:number | string,
}

interface Props {
	nonRecurringData?: Data,
}

function NonRecurringSummary({ nonRecurringData }:Props) {
	const {
		periodOfTransaction,
		vendorName,
		expenseCategory,
		expenseSubCategory,
		branch,
		paymentMode,
		entityObject,
		invoiceDate,
		transactionDate,
		uploadedInvoice,
		totalPayable,
	} = nonRecurringData || {};

	const stakeholders = useGetStakeholders(expenseCategory);
	console.log('stakeholders-', stakeholders);

	const summaryDataFirst = [
		{
			title : 'Vendor Name',
			value : vendorName ? showOverflowingNumber(vendorName, 18) : 'N/A',
		},
		{
			title : 'Expense Category',
			value : expenseCategory ? (showOverflowingNumber(startCase(expenseCategory), 18)) : 'N/A',
		},
		{
			title : 'Expense Sub-Category',
			value : expenseSubCategory ? showOverflowingNumber(
				startCase(expenseSubCategory.replaceAll('_', ' ')),
				18,
			) : 'N/A',
		},
		{
			title : 'Entity',
			value : entityObject?.entity_code || 'N/A',
		},
		{
			title : 'Branch ',
			value : branch ? showOverflowingNumber(JSON.parse(branch)?.name, 18) : 'N/A',
		},
	];
	const summaryDataSecond = [
		{
			title : 'Payable Amount',
			value : <div>{totalPayable || 'N/A'}</div>,
		},
		{
			title : 'Expense Date',
			value : <div>
{invoiceDate
	? formatDate(invoiceDate, 'dd/MMM/yy', {}, false) : 'N/A'}
           </div>,
		},
		{
			title : 'Transaction Date',
			value : <div>
				{transactionDate
					? formatDate(transactionDate, 'dd/MMM/yy', {}, false) : 'N/A'}

           </div>,
		},
		{
			title : 'Period',
			value : <div>
				{periodOfTransaction ? startCase(periodOfTransaction) : 'N/A'}
				{' '}
           </div>,
		},
		{
			title : 'Payment Mode ',
			value : startCase(paymentMode || '') || 'N/A',
		},
	];
	const summaryDataThird = [
		{
			title : 'To be Approved by',
			value : 'N/A',
		},
		{
			title : 'Uploaded Documents',
			value : <div>
				{uploadedInvoice
					? (
						<a
							href={uploadedInvoice}
							style={{ color: 'blue', textDecoration: 'underline', fontSize: '16px' }}
							target="_blank"
							rel="noreferrer"
						>
							{showOverflowingNumber(uploadedInvoice, 20)}
						</a>
					)
					: 'N/A'}
           </div>,
		},
	];
	return (
		<div className={styles.container}>
			<div>Confirm Expense Details</div>
			<div className={styles.header} />
			<div style={{ display: 'flex' }}>
				{summaryDataFirst.map((item) => (
					<div key={item.title} className={styles.section}>
						<div className={styles.title}>{item.title}</div>
						<div className={styles.value}>{item.value}</div>
					</div>
				))}
			</div>
			<div style={{ display: 'flex' }}>
				{summaryDataSecond.map((item) => (
					<div key={item.title} className={styles.section}>
						<div className={styles.title}>{item.title}</div>
						<div className={styles.value}><div>{item.value}</div></div>
					</div>
				))}
			</div>
			<div style={{ display: 'flex' }}>
				{summaryDataThird.map((item) => (
					<div key={item.title} className={styles.section}>
						<div className={styles.title}>{item.title}</div>
						<div className={styles.value}>{item.value}</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default NonRecurringSummary;
