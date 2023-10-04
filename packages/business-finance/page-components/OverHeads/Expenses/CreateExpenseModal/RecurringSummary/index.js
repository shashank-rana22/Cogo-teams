/* eslint-disable react/jsx-indent */
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { isEmpty, startCase } from '@cogoport/utils';
import { useEffect } from 'react';

import showOverflowingNumber from '../../../../commons/showOverflowingNumber';
import useGetTradePartyDetails from '../../hooks/useGetTradePartyDetails';

import styles from './styles.module.css';

const MAX_LENGTH = 18;

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

const summaryDataOne = ({ vendorName, categoryName, entityObject, branch }) => [
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

const summaryDataTwo = ({ currency, payableAmount, startDate, endDate, agreementNumber }) => [
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
					? formatDate({
						date       : startDate,
						dateFormat : GLOBAL_CONSTANTS.formats.date['dd/MMM/yy'],
						formatType : 'date',
					})
					: '-'}
			</div>
		),
	},
	{
		title : 'End Date',
		value : (
			<div>
				{endDate
					? formatDate({
						date       : endDate,
						dateFormat : GLOBAL_CONSTANTS.formats.date['dd/MMM/yy'],
						formatType : 'date',
					})
					: '-'}
			</div>
		),
	},
	{
		title : 'Agreement Number',
		value : agreementNumber || '-',
	},
];

const summaryDataThree = ({ repeatEvery, uploadedInvoice, filename }) => [
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

const summeryMappings = ({ summaryDataFirst, summaryDataSecond, summaryDataThird }) => [
	{ key: '1', val: summaryDataFirst },
	{ key: '2', val: summaryDataSecond },
	{ key: '3', val: summaryDataThird },
];

function RecurringSummary({
	recurringData = {},
	setRecurringData = () => {},
}) {
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
			setRecurringData((prev) => ({
				...prev,
				tradeParty: tradePartyData?.[GLOBAL_CONSTANTS.zeroth_index],
			}));
		}
	}, [tradePartyData, setRecurringData]);

	const summaryDataFirst = summaryDataOne({ vendorName, categoryName, entityObject, branch });
	const summaryDataSecond = summaryDataTwo({ currency, payableAmount, startDate, endDate, agreementNumber });
	const summaryDataThird = summaryDataThree({ repeatEvery, uploadedInvoice, filename });

	const summeryMapping = summeryMappings({ summaryDataFirst, summaryDataSecond, summaryDataThird });
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
