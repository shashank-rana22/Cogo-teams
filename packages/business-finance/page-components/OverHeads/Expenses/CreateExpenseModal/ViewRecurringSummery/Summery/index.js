import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { isEmpty, startCase } from '@cogoport/utils';

import showOverflowingNumber from '../../../../../commons/showOverflowingNumber';
import stakeHolderTimeLineData from '../../../../../IncidentManagement/utils/formatStakeHolderData';
import useGetStakeholder from '../../../hooks/useGetStakeholder';
import StakeHolderTimeline from '../../StakeHolderTimeline';

import styles from './styles.module.css';

const MAX_LENGTH = 18;

const FIRST_INDEX = 1;

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

const summaryDataTwo = ({ billDocumentUrl, filename, billDate, createdDate, billNumber }) => [

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

const summaryDataThree = ({ ledgerTotal, grandTotal, paidAmount, ledgerCurrency, payableAmount, billCurrency }) => [
	{
		title : 'Invoice Amount',
		value : formatAmount({
			amount   : grandTotal,
			currency : billCurrency,
			options  : {
				style           : 'currency',
				currencyDisplay : 'code',
			},
		}),

	},

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
		title : 'Paid Amount',
		value : formatAmount({
			amount   : paidAmount,
			currency : billCurrency,
			options  : {
				style           : 'currency',
				currencyDisplay : 'code',
			},
		}),

	},

];

const summaryDataFourth = ({ paidTds, payableTds, billCurrency, tdsAmount, paymentStatus }) => [
	{
		title : 'Tds Amount',
		value : formatAmount({
			amount   : tdsAmount,
			currency : billCurrency,
			options  : {
				style           : 'currency',
				currencyDisplay : 'code',
			},
		}),
	},
	{
		title : 'Paid Tds Amount',
		value : formatAmount({
			amount   : paidTds,
			currency : billCurrency,
			options  : {
				style           : 'currency',
				currencyDisplay : 'code',
			},
		}),
	},
	{
		title : 'Payable Tds Amount',
		value : formatAmount({
			amount   : payableTds,
			currency : billCurrency,
			options  : {
				style           : 'currency',
				currencyDisplay : 'code',
			},
		}),
	},
	{
		title : 'Payment Status',
		value : paymentStatus,
	},
];

const summaryDataFifth = ({
	billCurrency = '', subTotal = GLOBAL_CONSTANTS.zeroth_index,
	grandTotal = GLOBAL_CONSTANTS.zeroth_index,
}) => [
	{
		title : 'Sub Total Amount',
		value : formatAmount({
			amount   : subTotal,
			currency : billCurrency,
			options  : {
				style           : 'currency',
				currencyDisplay : 'code',
			},
		}),
	},
	{
		title : 'Tax Total Amount',
		value : formatAmount({
			amount   : (grandTotal - subTotal).toFixed(2),
			currency : billCurrency,
			options  : {
				style           : 'currency',
				currencyDisplay : 'code',
			},
		}),
	},
];

const summeryMappings = ({
	summaryDataFirst,
	summaryDataSecond,
	summaryDataThird,
	summaryDataFour,
	summaryDataFive,
}) => [
	{ key: '1', val: summaryDataFirst },
	{ key: '2', val: summaryDataSecond },
	{ key: '3', val: summaryDataThird },
	{ key: '4', val: summaryDataFour },
	{ key: '5', val: summaryDataFive },
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
		grandTotal,
		paidAmount,
		paidTds = 0,
		payableTds,
		tdsAmount,
		paymentStatus,
		subTotal,
	} = itemData || {};
	const { stakeholders } = useGetStakeholder({ billId });

	const { level3, level2, level1 } = stakeholders || {};

	const { organizationName } = sellerDetails || {};

	const splitArray = (billDocumentUrl || '').toString().split('/') || [];
	const filename = splitArray[splitArray.length - FIRST_INDEX];

	const summaryDataFirst = summaryDataOne({ organizationName, category, entityCode, branchName });
	const summaryDataSecond = summaryDataTwo({
		billDate,
		createdDate,
		billDocumentUrl,
		filename,
		billNumber,
	});
	const summaryDataThird = summaryDataThree({
		payableAmount,
		billCurrency,
		ledgerTotal,
		ledgerCurrency,
		paidAmount,
		grandTotal,
	});
	const summaryDataFour = summaryDataFourth({ paidTds, payableTds, billCurrency, tdsAmount, paymentStatus });
	const summaryDataFive = summaryDataFifth({
		subTotal,
		grandTotal,
	});
	const summeryMapping = summeryMappings({
		summaryDataFirst,
		summaryDataSecond,
		summaryDataThird,
		summaryDataFour,
		summaryDataFive,
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
				<div className={styles.timeline}>
					<StakeHolderTimeline
						timeline={stakeHolderTimeLineData({ level1, level2, level3 })}
					/>
				</div>
			)}
		</div>
	);
}

export default Summery;
