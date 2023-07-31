import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { isEmpty, startCase } from '@cogoport/utils';

import showOverflowingNumber from '../../../../../commons/showOverflowingNumber.tsx';
import stakeHolderTimeLineData from '../../../../../IncidentManagement/utils/formatStakeHolderData';
import useGetStakeholder from '../../../hooks/useGetStakeholder';
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

const summaryDataOne = ({ organizationName, category, entityCode, branchName }) => [
	{
		title : 'Vendor Name',
		value : organizationName ? showOverflowingNumber(organizationName, MAX_LENGTH) : '-',
	},
	{
		title : 'Expense Category',
		value : startCase(category),
	},
	{
		title : 'Entity',
		value : entityCode || '-',
	},
	{
		title : 'Branch ',
		value : branchName || '-',
	},
];

const summaryDataTwo = ({ payableAmount, billCurrency, billDate, createdDate, billNumber }) => [
	{
		title : 'Payable Amount',
		value : formatAmount({
			amount   : payableAmount,
			currency : billCurrency,
			options  : {
				style           : 'currency',
				currencyDisplay : 'code',
			},
		}),

	},
	{
		title : 'Expense Date',
		value : (
			<div>
				{billDate
					? formatDate({
						date       : billDate,
						dateFormat : GLOBAL_CONSTANTS.formats.date['dd/MMM/yy'],
						formatType : 'date',
					})
					: '-'}
			</div>
		),
	},
	{
		title : 'Transaction Date',
		value : (
			<div>
				{createdDate
					? formatDate({
						date       : createdDate,
						dateFormat : GLOBAL_CONSTANTS.formats.date['dd/MMM/yy'],
						formatType : 'date',
					})
					: '-'}
			</div>
		),
	},
	{
		title : 'Invoice Number',
		value : billNumber || '-',
	},
];

const summaryDataThree = ({ ledgerTotal, ledgerCurrency, billDocumentUrl, filename }) => [
	{
		title : 'Ledger Amount',
		value : formatAmount({
			amount   : ledgerTotal,
			currency : ledgerCurrency,
			options  : {
				style           : 'currency',
				currencyDisplay : 'code',
			},
		})
			|| '-',
	},

	{
		title : 'Uploaded Documents',
		value : (
			<div>
				{billDocumentUrl ? (
					<a
						href={billDocumentUrl}
						style={{
							color          : '#0000FF',
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

function Summery({
	itemData = {},
}) {
	const {
		branchName,
		entityCode,
		billDocumentUrl,
		payableAmount,
		billCurrency,
		createdDate,
		billDate,
		billNumber,
		category,
		sellerDetails,
		ledgerTotal,
		ledgerCurrency,
		billId,
	} = itemData || {};
	const { stakeholders } = useGetStakeholder({ billId });

	const { level3, level2, level1 } = stakeholders || {};

	const { organizationName } = sellerDetails || {};

	const splitArray = (billDocumentUrl || '').toString().split('/') || [];
	const filename = splitArray[splitArray.length - FIRST_INDEX];

	const summaryDataFirst = summaryDataOne({ organizationName, category, entityCode, branchName });
	const summaryDataSecond = summaryDataTwo({ payableAmount, billCurrency, billDate, createdDate, billNumber });
	const summaryDataThird = summaryDataThree({ ledgerTotal, ledgerCurrency, billDocumentUrl, filename });
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
						/>
					</div>
				</div>
			)}
		</div>
	);
}

export default Summery;
