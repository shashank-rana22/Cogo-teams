import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { isEmpty, startCase } from '@cogoport/utils';

import showOverflowingNumber from '../../../../../commons/showOverflowingNumber.tsx';
import { formatDate } from '../../../../../commons/utils/formatDate.ts';
import StakeHolderTimeline from '../../StakeHolderTimeline';

import styles from './styles.module.css';

const MAX_LENGTH = 18;

const FIRST_INDEX = 1;

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
		level3,
		level2,
		level1,
		billNumber,
		category,
		sellerDetails,
		ledgerTotal,
		ledgerCurrency,
	} = itemData || {};

	const { organizationName } = sellerDetails || {};

	const splitArray = (billDocumentUrl || '').toString().split('/') || [];
	const filename = splitArray[splitArray.length - FIRST_INDEX];

	const { stakeholder: stakeholder3, status:status3 } = level3 || {};
	const { stakeholder: stakeholder2, status:status2 } = level2 || {};
	const { stakeholder: stakeholder1, status:status1 } = level1 || {};

	const stakeHolderTimeLine = () => {
		if (!isEmpty(level3)) {
			return [
				{
					...(stakeholder1 ? {
						email   : stakeholder1?.userEmail,
						name    : stakeholder1?.userName,
						remarks : level1?.remarks,
						status  : status1,
					} : {}),
				},
				{
					...(stakeholder2 ? {
						email   : stakeholder2?.userEmail,
						name    : stakeholder2?.userName,
						remarks : level2?.remarks,
						status  : status2,
					} : {}),
				},
				{
					...(stakeholder3 ? {
						email   : stakeholder3?.userEmail,
						name    : stakeholder3?.userName,
						remarks : level3?.remarks,
						status  : status3,
					} : {}),
				},
			];
		}
		if (!isEmpty(level2)) {
			return [
				{
					...(stakeholder1 ? {
						email   : stakeholder1?.userEmail,
						name    : stakeholder1?.userName,
						remarks : level1?.remarks,
						status  : status1,
					} : {}),
				},
				{
					...(stakeholder2 ? {
						email   : stakeholder2?.userEmail,
						name    : stakeholder2?.userName,
						remarks : level2?.remarks,
						status  : status2,
					} : {}),
				},
			];
		}
		return [
			{
				email   : stakeholder1?.userEmail,
				name    : stakeholder1?.userName,
				remarks : level1?.remarks,
				status  : status1,
			},
		];
	};

	const summaryDataFirst = [
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
	const summaryDataSecond = [
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
						? formatDate(billDate, 'dd/MMM/yy', {}, false)
						: '-'}
				</div>
			),
		},
		{
			title : 'Transaction Date',
			value : (
				<div>
					{createdDate
						? formatDate(createdDate, 'dd/MMM/yy', {}, false)
						: '-'}
				</div>
			),
		},
		{
			title : 'Invoice Number',
			value : billNumber || '-',
		},
	];
	const summaryDataThird = [
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

	const renderSummaryData = (summary) => (
		<div style={{ display: 'flex' }}>
			{summary?.map((item) => (
				<div key={item.title} className={styles.section}>
					<div className={styles.title}>{item.title}</div>
					<div className={styles.value}>{item.value}</div>
				</div>
			))}
		</div>
	);

	return (
		<div className={styles.container}>
			<div>Expense Details</div>
			<div className={styles.header} />
			{renderSummaryData(summaryDataFirst)}
			{renderSummaryData(summaryDataSecond)}
			{renderSummaryData(summaryDataThird)}
			<div>
				<div className={styles.title}>To be Approved by</div>
				{isEmpty(level1) ? (
					<div className={styles.value}>No Stakeholders Present</div>
				) : (
					<div className={styles.steeper}>
						<StakeHolderTimeline
							timeline={stakeHolderTimeLine()}
						/>
					</div>
				)}
			</div>
		</div>
	);
}

export default Summery;
