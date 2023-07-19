/* eslint-disable react/jsx-indent */
import { Placeholder, Textarea } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { isEmpty, startCase } from '@cogoport/utils';
import { useEffect } from 'react';

import showOverflowingNumber from '../../../../commons/showOverflowingNumber';
import { formatDate } from '../../../../commons/utils/formatDate';
import useGetStakeholders from '../../hooks/useGetStakeholders';
import useGetTradePartyDetails from '../../hooks/useGetTradePartyDetails';
import StakeHolderTimeline from '../StakeHolderTimeline';

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
	setIncidentMangementId?: (val) => void;
}

function NonRecurringSummary({
	nonRecurringData = {},
	setNonRecurringData = () => {},
	setIncidentMangementId = () => {},
}: Props) {
	const {
		periodOfTransaction,
		vendorName,
		expenseCategory,
		branch,
		paymentMode,
		entityObject,
		invoiceDate,
		transactionDate,
		uploadedInvoice,
		payableAmount,
		invoiceCurrency,
		vendorID,
		categoryName,
	} = nonRecurringData || {};

	const { stakeholdersData, loading: stakeholderLoading } =		useGetStakeholders({
		incidentSubType : categoryName,
		incidentType    : 'OVERHEAD_APPROVAL',
		entityId        : entityObject?.id,
	});

	const { level3, level2, level1 } = stakeholdersData || {};
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

	const { tradePartyData } = useGetTradePartyDetails(vendorID);

	const splitArray = (uploadedInvoice || '').toString().split('/') || [];
	const filename = splitArray[splitArray.length - 1];

	useEffect(() => {
		setIncidentMangementId(stakeholdersData?.id);
	}, [stakeholdersData, setIncidentMangementId]);

	useEffect(() => {
		if (stakeholder1) {
			const { userEmail, userId, userName } = stakeholder1 || {};
			setNonRecurringData((prev: object) => ({
				...prev,
				stakeholderEmail : userEmail,
				stakeholderId    : userId,
				stakeholderName  : userName,
			}));
		}
	}, [stakeholder1, setNonRecurringData]);

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
			value : vendorName ? showOverflowingNumber(vendorName, 18) : '-',
		},
		{
			title : 'Expense Category',
			value : expenseCategory
				? showOverflowingNumber(startCase(expenseCategory), 18)
				: '-',
		},
		{
			title : 'Entity',
			value : entityObject?.entity_code || '-',
		},
		{
			title : 'Branch ',
			value : branch
				? showOverflowingNumber(JSON.parse(branch)?.name, 18)
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
			<div>
				<div className={styles.approved}>To be Approved by</div>
				{isEmpty(stakeholdersData) && !stakeholderLoading ? (
					<div className={styles.value}>No Stakeholders Present</div>
				) : (
					<div className={styles.steeper}>
						{stakeholderLoading ? (
							<Placeholder height="20px" width="150px" />
						) : (
							<StakeHolderTimeline
								timeline={stakeHolderTimeLine()}
							/>
						)}
					</div>
				)}
			</div>
		</div>
	);
}

export default NonRecurringSummary;
