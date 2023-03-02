import { formatDate } from '../../../../../commons/utils/formatDate';

import styles from './styles.module.css';

interface Data {
	vendorName?: string,
	transactionDate?: Date,
}

interface Props {
	nonRecurringData: Data,
}

function NonRecurringSummary({ nonRecurringData }:Props) {
	const summaryDataFirst = [
		{
			title : 'Vendor Name',
			value : nonRecurringData?.vendorName || 'N/A',
		},
		{
			title : 'Expense Category',
			value : 'N/A',
		},
		{
			title : 'Expense Sub-Category',
			value : 'N/A',
		},
		{
			title : 'Entity',
			value : 'N/A',
		},
		{
			title : 'Branch ',
			value : 'N/A',
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
			value : <div>{formatDate(nonRecurringData?.transactionDate, 'dd/MMM/yy', {}, false) || 'N/A'}</div>,

		},
		{
			title : 'Period',
			value : <div>N/A</div>,
		},
		{
			title : 'Payment Mode ',
			value : <div>N/A</div>,
		},
	];
	const summaryDataThird = [
		{
			title : 'To be Approved by',
			value : 'N/A',
		},
		{
			title : 'Proof of Approval',
			value : 'N/A',
		},
		{
			title : 'Uploaded Documents',
			value : 'N/A',
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
