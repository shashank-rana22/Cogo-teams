/* eslint-disable react/jsx-indent */
import { Placeholder } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import { useEffect } from 'react';

import showOverflowingNumber from '../../../../commons/showOverflowingNumber';
import { formatDate } from '../../../../commons/utils/formatDate';
import useGetStakeholders from '../../hooks/useGetStakeholders';
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

function RecurringSummary({ recurringData, setRecurringData }: Props) {
	const {
		vendorName,
		expenseCategory,
		branch,
		entityObject,
		uploadedInvoice,
		stakeholderName,
		vendorID,
		payableAmount,
		currency,
		startDate,
		endDate,
		repeatEvery,
		agreementNumber,
		categoryName,
	} = recurringData || {};

	const { stakeholdersData, loading: stakeholderLoading } =	useGetStakeholders({
		expenseCategory,
		entity: entityObject?.id,
		currency,
	});
	const { tradePartyData } = useGetTradePartyDetails(vendorID);

	const splitArray = (uploadedInvoice || '').toString().split('/') || [];
	const filename = splitArray[splitArray.length - 1];

	useEffect(() => {
		if (stakeholdersData) {
			const { userEmail, userId, userName } = stakeholdersData || {};
			setRecurringData((prev: object) => ({
				...prev,
				stakeholderEmail : userEmail,
				stakeholderId    : userId,
				stakeholderName  : userName,
			}));
		}
	}, [stakeholdersData, setRecurringData]);

	useEffect(() => {
		if (tradePartyData?.length > 0) {
			setRecurringData((prev: object) => ({
				...prev,
				tradeParty: tradePartyData?.[0],
			}));
		}
	}, [tradePartyData, setRecurringData]);

	const summaryDataFirst = [
		{
			title : 'Vendor Name',
			value : vendorName ? showOverflowingNumber(vendorName, 18) : '-',
		},
		{
			title : 'Expense Category',
			value : categoryName,
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
			title : 'Agreement Number',
			value : agreementNumber || '-',
		},
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

	const stakeHolderTimeLine = [
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
			<div className={styles.flexwrap}>
				{stakeHolderTimeLine?.map((item: Summary, index) => (
					<div key={item.title} className={styles.name}>
						<div className={styles.title}>
							{item.title}
							<span className={styles.label}>
								{`(Level - ${index + 1})`}
							</span>
						</div>
						<div className={styles.value}>{item.value}</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default RecurringSummary;
