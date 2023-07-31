import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { isEmpty, startCase } from '@cogoport/utils';

import showOverflowingNumber from '../../../../../commons/showOverflowingNumber.tsx';
import stakeHolderTimeLineData from '../../../../../IncidentManagement/utils/formatStakeHolderData';
import useGetExpenseConfig from '../../../hooks/useGetExpenseConfig';
import StakeHolderTimeline from '../../StakeHolderTimeline';

import styles from './styles.module.css';

const MAX_LENGTH = 18;

const FIRST_INDEX = 1;

function RenderSummaryData(summary) {
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

const summaryDataOne = ({ businessName, categoryName, entityCode, branchName }) => [
	{
		title : 'Vendor Name',
		value : businessName ? showOverflowingNumber(businessName, MAX_LENGTH) : '-',
	},
	{
		title : 'Expense Category',
		value : startCase(categoryName),
	},
	{
		title : 'Entity',
		value : entityCode || '-',
	},
	{
		title : 'Branch ',
		value : branchName
			? showOverflowingNumber(branchName, MAX_LENGTH)
			: '-',
	},
];

const summaryDataTwo = ({ startDate, endDate, agreementNumber, repeatFrequency }) => [
	{
		title : 'Start Date',
		value : (
			<div>
				{startDate ? formatDate({
					date       : startDate,
					dateFormat : GLOBAL_CONSTANTS.formats.date['dd/MMM/yy'],
					formatType : 'date',
				}) : '-'}
			</div>
		),
	},
	{
		title : 'End Date',
		value : (
			<div>
				{endDate ? formatDate({
					date       : endDate,
					dateFormat : GLOBAL_CONSTANTS.formats.date['dd/MMM/yy'],
					formatType : 'date',
				}) : '-'}
			</div>
		),
	},
	{
		title : 'Agreement Number',
		value : agreementNumber || '-',
	},
	{
		title : 'Duration',
		value : repeatFrequency || '-',
	},
];

const summaryDataThree = ({
	maxPayoutAllowed,
	currency,
	ledgerMaxPayoutAllowed,
	ledgerCurrency,
	proofDocuments,
	filename,
}) => [
	{
		title : 'Payable Amount',
		value : formatAmount({
			amount  : maxPayoutAllowed,
			currency,
			options : {
				style           : 'currency',
				currencyDisplay : 'code',
			},
		}) || '_',
	},
	{
		title : 'Ledger Amount',
		value : formatAmount({
			amount   : ledgerMaxPayoutAllowed,
			currency : ledgerCurrency,
			options  : {
				style           : 'currency',
				currencyDisplay : 'code',
			},
		}) || '-',
	},

	{
		title : 'Uploaded Documents',
		value : (
			<div>
				{proofDocuments?.[GLOBAL_CONSTANTS.zeroth_index] ? (
					<a
						href={proofDocuments?.[GLOBAL_CONSTANTS.zeroth_index]}
						style={{
							color          : 'blue',
							textDecoration : 'underline',
							fontSize       : '16px',
						}}
						className={styles.upload_invoice}
						target="_blank"
						rel="noreferrer"
					>
						{showOverflowingNumber(filename, MAX_LENGTH)}
					</a>
				) : ('-')}
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

function RecurringSummery({
	itemData = {},
}) {
	const {
		branchName,
		entityCode,
		ledgerMaxPayoutAllowed,
		maxPayoutAllowed,
		ledgerCurrency,
		currency,
		endDate,
		startDate,
		agreementNumber,
		repeatFrequency,
		categoryName,
		businessName,
		proofDocuments,
		currentLevel,
		id,
	} = itemData || {};
	const { stakeholders } = useGetExpenseConfig({ id });

	const { level3, level2, level1 } = stakeholders || {};

	const splitArray = (proofDocuments?.[GLOBAL_CONSTANTS.zeroth_index] || '').toString().split('/') || [];
	const filename = splitArray[splitArray.length - FIRST_INDEX];

	const summaryDataFirst = summaryDataOne({ businessName, categoryName, entityCode, branchName });
	const summaryDataSecond = summaryDataTwo({ startDate, endDate, agreementNumber, repeatFrequency });
	const summaryDataThird = summaryDataThree({
		maxPayoutAllowed,
		currency,
		ledgerMaxPayoutAllowed,
		ledgerCurrency,
		proofDocuments,
		filename,
	});

	const summeryMapping = summeryMappings({
		summaryDataFirst,
		summaryDataSecond,
		summaryDataThird,
	});

	return (
		<div className={styles.container}>
			<div>Expense Details</div>
			<div className={styles.header} />
			{summeryMapping.map(({ key, val }) => (
				<RenderSummaryData key={key} summary={val} />
			))}

			{(isEmpty(level1) && isEmpty(level2) && isEmpty(level3)) ? (
				null
			) : (
				<div>
					<div className={styles.title}>To be Approved by</div>
					<div className={styles.steeper}>
						<StakeHolderTimeline
							timeline={stakeHolderTimeLineData({ level1, level2, level3 })}
							currentLevel={currentLevel}
						/>
					</div>
				</div>
			)}
		</div>
	);
}

export default RecurringSummery;
