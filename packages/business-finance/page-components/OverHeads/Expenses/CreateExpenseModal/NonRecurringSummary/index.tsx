/* eslint-disable react/jsx-indent */
import { Placeholder, Stepper, Textarea } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { isEmpty, startCase } from '@cogoport/utils';
import { useEffect } from 'react';

import showOverflowingNumber from '../../../../commons/showOverflowingNumber';
import { formatDate } from '../../../../commons/utils/formatDate';
import useGetStakeholders from '../../hooks/useGetStakeholders';
import useGetTradePartyDetails from '../../hooks/useGetTradePartyDetails';

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
}

interface Props {
	nonRecurringData?: Data;
	setNonRecurringData?: (obj) => void;
	setIncidentMangementId?:(val)=>void;
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
		stakeholderName,
		invoiceCurrency,
		vendorID,
	} = nonRecurringData || {};

	const { stakeholdersData, loading: stakeholderLoading } =		useGetStakeholders({
		incidentSubType : expenseCategory,
		incidentType    : 'OVERHEAD_APPROVAL',
		entityId        : entityObject?.id,
	});

	const { level3, level2, level1 } = stakeholdersData || {};
	const { stakeholder: stakeholder1 } = level3 || {};
	const { stakeholder: stakeholder2 } = level2 || {};
	const { stakeholder: stakeholder3 } = level1 || {};

	const stakeHolderTimeLine = () => {
		if (!isEmpty(level3)) {
			return [
				{ title: stakeholder1?.userName, key: stakeholder1?.userName },
				{ title: stakeholder2?.userName, key: stakeholder2?.userName },
				{ title: stakeholder3?.userName, key: stakeholder3?.userName },
			];
		}
		if (!isEmpty(level2)) {
			return [
				{ title: stakeholder1?.userName, key: stakeholder1?.userName },
				{ title: stakeholder2?.userName, key: stakeholder2?.userName },
			];
		}
		return [{ title: stakeholder1?.userName, key: stakeholder1?.userName }];
	};

	const { tradePartyData } = useGetTradePartyDetails(vendorID);

	const splitArray = (uploadedInvoice || '').toString().split('/') || [];
	const filename = splitArray[splitArray.length - 1];

	useEffect(() => {
		setIncidentMangementId(stakeholdersData?.id);
	}, [stakeholdersData, setIncidentMangementId]);

	useEffect(() => {
		if (stakeholdersData) {
			const { userEmail, userId, userName } = stakeholdersData || {};
			setNonRecurringData((prev: object) => ({
				...prev,
				stakeholderEmail : userEmail,
				stakeholderId    : userId,
				stakeholderName  : userName,
			}));
		}
	}, [stakeholdersData, setNonRecurringData]);

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
		{
			title : 'Payment Mode ',
			value : startCase(paymentMode || '') || '-',
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
	];

	const uploadedData = [
		{
			title : 'To be Approved by',
			value : stakeholderLoading ? (
				<Placeholder height="20px" width="150px" />
			) : (
				startCase(stakeholderName || '') || '-'
			),
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
			{renderSummaryData(uploadedData)}
			<div className={styles.textarea}>
				<Textarea
					value={nonRecurringData?.remarks}
					onChange={(e) => setNonRecurringData({ ...nonRecurringData, remarks: e })}
					size="lg"
					placeholder="Reason..."
				/>
			</div>
			<div>
				<div className={styles.title}>To be Approved by</div>
				<div className={styles.steeper}>
					{stakeholderLoading ? (
						<Placeholder height="20px" width="150px" />
					) : (
						<Stepper
							setActive={() => {}}
							items={stakeHolderTimeLine()}
						/>
					)}
				</div>
			</div>
		</div>
	);
}

export default NonRecurringSummary;
