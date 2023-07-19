import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty, startCase } from '@cogoport/utils';

import showOverflowingNumber from '../../../../../commons/showOverflowingNumber.tsx';
import { formatDate } from '../../../../../commons/utils/formatDate.ts';
import StakeHolderTimeline from '../../StakeHolderTimeline';

import styles from './styles.module.css';

const MAX_LENGTH = 18;

const FIRST_INDEX = 1;

function RecurringSummery({
	itemData = {},
}) {
	const {
		branchName,
		entityCode,
		// billDocumentUrl,
		// payableAmount,
		// currency,
		endDate,
		startDate,
		level3,
		level2,
		level1,
		agreementNumber,
		repeatFrequency,
		categoryName,
		businessName,
		proofDocuments,
	} = itemData || {};

	const splitArray = (proofDocuments?.[GLOBAL_CONSTANTS.zeroth_index] || '').toString().split('/') || [];
	const filename = splitArray[splitArray.length - FIRST_INDEX];

	const { stakeholder: stakeholder3 } = level3 || {};
	const { stakeholder: stakeholder2 } = level2 || {};
	const { stakeholder: stakeholder1 } = level1 || {};

	const stakeHolderTimeLine = () => {
		if (!isEmpty(level3)) {
			return [
				{
					...(stakeholder1 ? {
						email   : stakeholder1?.userEmail,
						name    : stakeholder1?.userName,
						remarks : level1?.remarks,
					} : {}),
				},
				{
					...(stakeholder2 ? {
						email   : stakeholder2?.userEmail,
						name    : stakeholder2?.userName,
						remarks : level2?.remarks,
					} : {}),
				},
				{
					...(stakeholder3 ? {
						email   : stakeholder3?.userEmail,
						name    : stakeholder3?.userName,
						remarks : level3?.remarks,
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
					} : {}),
				},
				{
					...(stakeholder2 ? {
						email   : stakeholder2?.userEmail,
						name    : stakeholder2?.userName,
						remarks : level2?.remarks,
					} : {}),
				},
			];
		}
		return [
			{
				email   : stakeholder1?.userEmail,
				name    : stakeholder1?.userName,
				remarks : level1?.remarks,
			},
		];
	};

	const summaryDataFirst = [
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
	const summaryDataSecond = [
	// 	{
	// 		title: 'Payable Amount',
	// 		value:
		//             currency && payableAmount ? (
	// <div>
	// 	{currency}
	// 	{payableAmount}
	// </div>
		//             ) : ('-'),
	// 	},
		{
			title : 'Start Date',
			value : (
				<div>
					{startDate ? formatDate(startDate, 'dd/MMM/yy', {}, false) : '-'}
				</div>
			),
		},
		{
			title : 'End Date',
			value : (
				<div>
					{endDate ? formatDate(endDate, 'dd/MMM/yy', {}, false) : '-'}
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
			value : repeatFrequency || '-',
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

export default RecurringSummery;
