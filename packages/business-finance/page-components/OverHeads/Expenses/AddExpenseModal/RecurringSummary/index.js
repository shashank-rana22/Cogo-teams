import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { startCase, isEmpty } from '@cogoport/utils';
import { useEffect } from 'react';

import showOverflowingNumber from '../../../../commons/showOverflowingNumber';
import { DURATION_MAPPING } from '../../../constants/DURATION_MAPPING';
import { officeLocations } from '../../../utils/officeLocations';
import useGetTradePartyDetails from '../../hooks/useGetTradePartyDetails';

import styles from './styles.module.css';

function RenderSummary({ summary = [] }) {
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

const summaryDataOne = ({ businessName, categoryName, entityCode }) => [
	{
		title : 'Vendor Name',
		value : businessName ? showOverflowingNumber(businessName, 18) : '-',
	},
	{
		title : 'Expense Category',
		value : startCase(categoryName),
	},
	{
		title : 'Entity',
		value : entityCode || '-',
	},
];

const summaryDataTwo = ({
	branchName,
	currency,
	payableAmount,
	startDate,
	endDate,
}) => [
	{
		title : 'Branch ',
		value : branchName || '-',
	},
	{
		title: 'Payable Amount',
		value:
			currency && payableAmount ? (
				<div>
					{formatAmount({
						amount  : payableAmount,
						currency,
						options : {
							style           : 'currency',
							currencyDisplay : 'code',
						},
					})}
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
						date: startDate,
						dateFormat:
								GLOBAL_CONSTANTS.formats.date['dd/MMM/yy'],
						formatType: 'date',
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
						date: endDate,
						dateFormat:
								GLOBAL_CONSTANTS.formats.date['dd/MMM/yy'],
						formatType: 'date',
					})
					: '-'}
			</div>
		),
	},
];

const summaryDataThree = ({
	agreementNumber,
	uploadedInvoice,
	filename,
	repeatFrequency,
}) => [
	{
		title : 'Agreement Number',
		value : agreementNumber || '-',
	},
	{
		title : 'Duration',
		value : DURATION_MAPPING[repeatFrequency] || '-',
	},
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

function Summary({ expenseData, setExpenseData, rowData }) {
	const { entityObject, branch } = expenseData || {};
	const { entity_code: entityCode } = entityObject || {};
	const { name: branchName } = branch || {};

	const {
		categoryName,
		startDate,
		endDate,
		repeatFrequency,
		businessName,
		agreementNumber,
		branchId,
	} = rowData || {};

	const {
		uploadedInvoice,
		vendorID,
		payableAmount,
		invoiceCurrency: currency,
	} = expenseData || {};

	const { tradePartyData } = useGetTradePartyDetails(vendorID);

	const splitArray = (uploadedInvoice || '').toString().split('/') || [];
	const filename = splitArray[splitArray.length - 1];

	useEffect(() => {
		if (!isEmpty(tradePartyData)) {
			setExpenseData((prev) => ({
				...prev,
				tradeParty: tradePartyData?.[GLOBAL_CONSTANTS.zeroth_index],
			}));
		}
	}, [tradePartyData, setExpenseData]);

	useEffect(() => {
		if (branchId) {
			const branchData = officeLocations?.filter(
				(location) => JSON.parse(location?.value)?.branchId === branchId,
			);
			if (!isEmpty(branchData)) {
				setExpenseData((p) => ({
					...p,
					branch: JSON.parse(
						branchData[GLOBAL_CONSTANTS.zeroth_index]?.value || '{}',
					),
				}));
			}
		}
	}, [branchId, setExpenseData]);

	const summaryDataFirst = summaryDataOne({
		businessName,
		categoryName,
		entityCode,
	});

	const summaryDataSecond = summaryDataTwo({
		branchName,
		currency,
		payableAmount,
		startDate,
		endDate,
	});

	const summaryDataThird = summaryDataThree({
		agreementNumber,
		repeatFrequency,
		uploadedInvoice,
		filename,
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
				<RenderSummary key={key} summary={val} />
			))}
		</div>
	);
}

export default Summary;
