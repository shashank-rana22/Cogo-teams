/* eslint-disable react/jsx-indent */
import { startCase } from '@cogoport/utils';

import showOverflowingNumber from '../../../../../commons/showOverflowingNumber';
import { formatDate } from '../../../../../commons/utils/formatDate';

import styles from './styles.module.css';

interface Data {
	vendorName?: string,
	transactionDate?: Date,
	paymentMode?:string,
	uploadedInvoice?:string,
	periodOfTransaction?:string,
	expenseCategory?:string,
	expenseSubCategory?:string,
	branch?:string,
}

interface Props {
	nonRecurringData?: Data,
}

function NonRecurringSummary({ nonRecurringData }:Props) {
	const {
		periodOfTransaction,
		vendorName, expenseCategory,
		expenseSubCategory, branch, paymentMode,
	} = nonRecurringData || {};

	const summaryDataFirst = [
		{
			title : 'Vendor Name',
			value : vendorName || 'N/A',
		},
		{
			title : 'Expense Category',
			value : expenseCategory || 'N/A',
		},
		{
			title : 'Expense Sub-Category',
			value : expenseSubCategory || 'N/A',
		},
		{
			title : 'Entity',
			value : 'N/A',
		},
		{
			title : 'Branch ',
			value : branch || 'N/A',
		},
	];
	const summaryDataSecond = [
		{
			title : 'Payable Amount',
			value : <div>N/A</div>,
		},
		{
			title : 'Expense Date',
			value : <div>N/A</div>,
		},
		{
			title : 'Transaction Date',
			value : <div>
				{nonRecurringData?.transactionDate
					? formatDate(nonRecurringData?.transactionDate, 'dd/MMM/yy', {}, false) : 'N/A'}

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
				{nonRecurringData?.uploadedInvoice
					? (
						<a
							href={nonRecurringData?.uploadedInvoice}
							style={{ color: 'blue', textDecoration: 'underline', fontSize: '16px' }}
						>
							{showOverflowingNumber(nonRecurringData?.uploadedInvoice, 20)}
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
