/* eslint-disable react/jsx-indent */
import { Textarea } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { isEmpty, startCase } from '@cogoport/utils';
import { useEffect } from 'react';

import showOverflowingNumber from '../../../../commons/showOverflowingNumber';
import { formatDate } from '../../../../commons/utils/formatDate';

import styles from './styles.module.css';

interface Entity {
	entity_code?: number | string;
	id?: string;
}

interface Summary {
	title?: string;
	value?: any;
}

interface Data {
	vendorName?: string;
	transactionDate?: Date;
	paymentMode?: string;
	uploadedInvoice?: string;
	periodOfTransaction?: string;
	expenseCategory?: string;
	expenseSubCategory?: string;
	branch?: string;
	entityObject?: Entity;
	invoiceDate?: Date;
	totalPayable?: number | string;
	stakeholderName?: string;
	invoiceCurrency?: string;
	vendorID?: number | string;
	payableAmount?: number;
	remarks?: string;
	categoryName?: string;
}

interface Props {
	nonRecurringData?: Data;
	setNonRecurringData?: (obj) => void;
	tradePartyData?: object;
}

const MAX_LENGTH = 18;

function NonRecurringSummary({
	nonRecurringData = {},
	setNonRecurringData = () => {},
	tradePartyData = {},
}: Props) {
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
	} = nonRecurringData || {};

	const splitArray = (uploadedInvoice || '').toString().split('/') || [];
	const filename = splitArray[splitArray.length - 1];

	useEffect(() => {
		if (!isEmpty(tradePartyData)) {
			setNonRecurringData((prev: object) => ({
				...prev,
				tradeParty: tradePartyData?.[GLOBAL_CONSTANTS.zeroth_index],
			}));
		}
	}, [tradePartyData, setNonRecurringData]);

	const summaryDataFirst = [
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
	const summaryDataSecond = [
		{
			title : 'Payable Amount',
			value : (
				<div>
					{formatAmount({
						amount   : payableAmount as any,
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
						? formatDate(invoiceDate, 'dd/MMM/yy', {}, false)
						: '-'}
				</div>
			),
		},
		{
			title : 'Transaction Date',
			value : (
				<div>
					{transactionDate
						? formatDate(transactionDate, 'dd/MMM/yy', {}, false)
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
	const summaryDataThird = [
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
	];

	const renderSummaryData = (summary: Summary[]) => (
		<div style={{ display: 'flex' }}>
			{summary?.map((item: Summary) => (
				<div key={item.title} className={styles.section}>
					<div className={styles.title}>{item.title}</div>
					<div className={styles.value}>{item.value}</div>
				</div>
			))}
		</div>
	);

	return (
		<div className={styles.container}>
			<div>Confirm Expense Details</div>
			<div className={styles.header} />
			{renderSummaryData(summaryDataFirst)}
			{renderSummaryData(summaryDataSecond)}
			{renderSummaryData(summaryDataThird)}
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
