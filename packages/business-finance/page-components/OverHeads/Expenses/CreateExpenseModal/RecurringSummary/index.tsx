/* eslint-disable react/jsx-indent */
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty, startCase } from '@cogoport/utils';
import { useEffect } from 'react';

import showOverflowingNumber from '../../../../commons/showOverflowingNumber';
import { formatDate } from '../../../../commons/utils/formatDate';
import useGetTradePartyDetails from '../../hooks/useGetTradePartyDetails';

import styles from './styles.module.css';

interface Summary {
	title?: string;
	value?: any;
}

interface Entity {
	entity_code?: number | string;
	id?: string;
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
	stakeholderName?: string;
	invoiceCurrency?: string;
	vendorID?: number | string;
	payableAmount?: number | string;
	startDate?: Date;
	endDate?: Date;
	repeatEvery?: string;
	agreementNumber?: number;
	currency?: string;
	categoryName?: string;
}

interface Props {
	recurringData?: Data;
	setRecurringData?: (p: any) => void;
}

const MAX_LENGTH = 18;

function RenderSummaryData({ summary = [] }) {
	return (
		<div style={{ display: 'flex' }}>
			{summary?.map((item: Summary) => (
				<div key={item.title} className={styles.section}>
					<div className={styles.title}>{item.title}</div>
					<div className={styles.value}>{item.value}</div>
				</div>
			))}
		</div>
	);
}

function RecurringSummary({
	recurringData = {},
	setRecurringData = () => {},
}: Props) {
	const {
		vendorName,
		branch,
		entityObject,
		uploadedInvoice,
		vendorID,
		payableAmount,
		currency,
		startDate,
		endDate,
		repeatEvery,
		agreementNumber,
		categoryName,
	} = recurringData || {};

	const { tradePartyData } = useGetTradePartyDetails(vendorID);

	const splitArray = (uploadedInvoice || '').toString().split('/') || [];
	const filename = splitArray[splitArray.length - 1];

	useEffect(() => {
		if (!isEmpty(tradePartyData)) {
			setRecurringData((prev: object) => ({
				...prev,
				tradeParty: tradePartyData?.[GLOBAL_CONSTANTS.zeroth_index],
			}));
		}
	}, [tradePartyData, setRecurringData]);

	const summaryDataFirst = [
		{
			title : 'Vendor Name',
			value : vendorName
				? showOverflowingNumber(vendorName, MAX_LENGTH)
				: '-',
		},
		{
			title : 'Expense Category',
			value : startCase(categoryName),
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
			title: 'Payable Amount',
			value:
				currency && payableAmount ? (
					<div>
						{currency}
{' '}
{payableAmount}
					</div>
				) : (
					'-'
				),
		},
		{
			title : 'Start Date',
			value : (
				<div>
					{startDate
						? formatDate(startDate, 'dd/MMM/yy', {}, false)
						: '-'}
				</div>
			),
		},
		{
			title : 'End Date',
			value : (
				<div>
					{endDate
						? formatDate(endDate, 'dd/MMM/yy', {}, false)
						: '-'}
				</div>
			),
		},
		{
			title : 'Agreement Number',
			value : agreementNumber || '-',
		},
	];
	const summaryDataThird = [
		{
			title : 'Duration',
			value : (repeatEvery || '').replaceAll('_', ' ') || '-',
		},

		{
			title : 'Uploaded Documents',
			value : (
				<div>
					{uploadedInvoice ? (
						<a
							href={uploadedInvoice}
							className={styles.upload_invoice}
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
	];

	const summeryMapping = [
		{ key: '1', val: summaryDataFirst },
		{ key: '2', val: summaryDataSecond },
		{ key: '3', val: summaryDataThird },
	];

	return (
		<div className={styles.container}>
			<div>Confirm Expense Details</div>
			<div className={styles.header} />
			{summeryMapping.map(({ key, val }) => (
				<RenderSummaryData key={key} summary={val} />
			))}
		</div>
	);
}

export default RecurringSummary;
