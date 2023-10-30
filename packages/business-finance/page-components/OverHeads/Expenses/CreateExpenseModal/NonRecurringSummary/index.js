import { Textarea } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { isEmpty, startCase } from '@cogoport/utils';
import { useEffect } from 'react';

import showOverflowingNumber from '../../../../commons/showOverflowingNumber';

import styles from './styles.module.css';

function RenderSummaryData({ summary = [] }) {
	return (
		<div style={{ display: 'flex' }}>
			{summary?.map((item) => (
				<div key={item.title} className={styles.section}>
					<div className={styles.title}>{item.title}</div>
					<div className={styles.value}>{item.value}</div>
				</div>
			))}
		</div>
	);
}

const MAX_LENGTH = 18;

const summaryDataOne = ({ vendorName, categoryName, entityObject, branch }) => [
	{
		title : 'Vendor Name',
		value : vendorName ? showOverflowingNumber(vendorName, MAX_LENGTH) : '-',
	},
	{
		title : 'Expense Category',
		value : categoryName
			? showOverflowingNumber(startCase(categoryName), MAX_LENGTH)
			: '-',
	},
	{
		title : 'Entity',
		value : entityObject?.entity_code || '-',
	},
	{
		title : 'Branch ',
		value : branch
			? showOverflowingNumber(JSON.parse(branch)?.name, MAX_LENGTH)
			: '-',
	},
];
const summaryDataTwo = ({
	payableAmount,
	invoiceCurrency,
	invoiceDate,
	transactionDate,
	periodOfTransaction,
}) => [
	{
		title : 'Payable Amount',
		value : (
			<div>
				{formatAmount({
					amount   : payableAmount,
					currency : invoiceCurrency,
					options  : {
						style           : 'currency',
						currencyDisplay : 'code',
					},
				}) || '-'}
			</div>
		),
	},
	{
		title : 'Expense Date',
		value : (
			<div>
				{invoiceDate
					? formatDate({
						date: invoiceDate,
						dateFormat:
								GLOBAL_CONSTANTS.formats.date['dd/MMM/yy'],
						formatType: 'date',
					})
					: '-'}
			</div>
		),
	},
	{
		title : 'Transaction Date',
		value : (
			<div>
				{transactionDate
					? formatDate({
						date: transactionDate,
						dateFormat:
								GLOBAL_CONSTANTS.formats.date['dd/MMM/yy'],
						formatType: 'date',
					})
					: '-'}
			</div>
		),
	},
	{
		title : 'Period',
		value : (
			<div>
				{periodOfTransaction ? startCase(periodOfTransaction) : '-'}
				{' '}
			</div>
		),
	},
];
const summaryDataThree = ({ uploadedInvoice, filename, paymentMode, dueDate }) => [
	{
		title : 'Uploaded Documents',
		value : (
			<div>
				{uploadedInvoice ? (
					<a
						href={uploadedInvoice}
						style={{
							color          : 'blue',
							textDecoration : 'underline',
							fontSize       : '16px',
						}}
						target="_blank"
						rel="noreferrer"
					>
						{showOverflowingNumber(filename, 20)}
					</a>
				) : (
					'-'
				)}
			</div>
		),
	},
	{
		title : 'Payment Mode ',
		value : startCase(paymentMode || '') || '-',
	},
	{
		title : 'Due Date ',
		value : formatDate({
			date: dueDate,
			dateFormat:
					GLOBAL_CONSTANTS.formats.date['dd/MMM/yy'],
			formatType: 'date',
		}) || '-',
	},
];

const summeryMappings = ({
	summaryDataFirst,
	summaryDataSecond,
	summaryDataThird,
}) => [
	{ key: '1', val: summaryDataFirst },
	{ key: '2', val: summaryDataSecond },
	{ key: '3', val: summaryDataThird },
];

function NonRecurringSummary({
	nonRecurringData = {},
	setNonRecurringData = () => {},
	tradePartyData = {},
}) {
	const {
		periodOfTransaction,
		vendorName,
		branch,
		paymentMode,
		entityObject,
		invoiceDate,
		transactionDate,
		uploadedInvoice,
		payableAmount,
		invoiceCurrency,
		categoryName,
		dueDate,
	} = nonRecurringData || {};

	const splitArray = (uploadedInvoice || '').toString().split('/') || [];
	const filename = splitArray[splitArray.length - 1];

	useEffect(() => {
		if (!isEmpty(tradePartyData)) {
			setNonRecurringData((prev) => ({
				...prev,
				tradeParty: tradePartyData?.[GLOBAL_CONSTANTS.zeroth_index],
			}));
		}
	}, [tradePartyData, setNonRecurringData]);

	const summaryDataFirst = summaryDataOne({
		vendorName,
		categoryName,
		entityObject,
		branch,
	});
	const summaryDataSecond = summaryDataTwo({
		payableAmount,
		invoiceCurrency,
		invoiceDate,
		transactionDate,
		periodOfTransaction,
	});

	const summaryDataThird = summaryDataThree({
		uploadedInvoice,
		filename,
		paymentMode,
		dueDate,
	});

	const summeryMapping = summeryMappings({
		summaryDataFirst,
		summaryDataSecond,
		summaryDataThird,
	});
	return (
		<div className={styles.container}>
			<div>Confirm Expense Details</div>
			<div className={styles.header} />
			{summeryMapping.map(({ key, val }) => (
				<RenderSummaryData key={key} summary={val} />
			))}
			<div className={styles.textarea}>
				<Textarea
					value={nonRecurringData?.remarks}
					onChange={(e) => setNonRecurringData({ ...nonRecurringData, remarks: e })}
					size="lg"
					placeholder="Reason..."
				/>
			</div>
		</div>
	);
}

export default NonRecurringSummary;
