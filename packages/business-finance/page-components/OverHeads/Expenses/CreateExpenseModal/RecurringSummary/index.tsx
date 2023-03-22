/* eslint-disable react/jsx-indent */
import { Placeholder } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import { useEffect } from 'react';

import showOverflowingNumber from '../../../../commons/showOverflowingNumber';
import { formatDate } from '../../../../commons/utils/formatDate';
import useGetStakeholders from '../../hooks/useGetStakeholders';
import useGetTradePartyDetails from '../../hooks/useGetTradePartyDetails';

import styles from './styles.module.css';

interface Entity {
	entity_code?:number | string,
}

interface Data {
	vendorName?: string,
	transactionDate?: Date,
	paymentMode?:string,
	uploadedInvoice?:string,
	periodOfTransaction?:string,
	expenseCategory?:string,
	expenseSubCategory?:string,
	branch?:string,
	entityObject?:Entity,
	invoiceDate?:Date,
	stakeholderName?:string,
	invoiceCurrency?:string,
	vendorID?:number | string,
	payableAmount?: number | string,
	startDate?: Date,
	endDate?: Date,
	repeatEvery?: string,
	agreementNumber?:number,
	currency?:string,
}

interface Props {
	recurringData?: Data,
	setRecurringData?:(p:any)=>void,
}

function RecurringSummary({ recurringData, setRecurringData }:Props) {
	const {
		vendorName,
		expenseCategory,
		expenseSubCategory,
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
	} = recurringData || {};

	const { stakeholdersData, loading:stakeholderLoading } = useGetStakeholders(expenseCategory);
	const { tradePartyData } = useGetTradePartyDetails(vendorID);

	useEffect(() => {
		if (stakeholdersData) {
			const { userEmail, userId, userName } = stakeholdersData || {};
			setRecurringData((prev:object) => ({
				...prev,
				stakeholderEmail : userEmail,
				stakeholderId    : userId,
				stakeholderName  : userName,
			}));
		}
	}, [stakeholdersData, setRecurringData]);

	useEffect(() => {
		if (tradePartyData?.length > 0) {
			setRecurringData((prev:object) => ({
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
			value : expenseCategory ? (showOverflowingNumber(startCase(expenseCategory), 18)) : '-',
		},
		{
			title : 'Expense Sub-Category',
			value : expenseSubCategory ? showOverflowingNumber(
				startCase(expenseSubCategory.replaceAll('_', ' ')),
				18,
			) : '-',
		},
		{
			title : 'Entity',
			value : entityObject?.entity_code || '-',
		},

	];
	const summaryDataSecond = [

		{
			title : 'Branch ',
			value : branch ? showOverflowingNumber(JSON.parse(branch)?.name, 18) : '-',
		},
		{
			title : 'Payable Amount',
			value : (currency && payableAmount) ? (
						<div>
						{currency}
						{' '}
						{payableAmount}
						</div>
			) : '-',
		},
		{
			title : 'Start Date',
			value : <div>
				{startDate
					? formatDate(startDate, 'dd/MMM/yy', {}, false) : '-'}
           </div>,
		},
		{
			title : 'End Date',
			value : <div>
			{endDate
				? formatDate(endDate, 'dd/MMM/yy', {}, false) : '-'}
           </div>,
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
			title : 'To be Approved by',
			value : stakeholderLoading ? <Placeholder height={20} width={150} />
				: startCase(stakeholderName || '') || '-',
		},
		{
			title : 'Uploaded Documents',
			value : <div>
				{uploadedInvoice
					? (
						<a
							href={uploadedInvoice}
							style={{ color: 'blue', textDecoration: 'underline', fontSize: '16px' }}
							target="_blank"
							rel="noreferrer"
						>
							{showOverflowingNumber(uploadedInvoice, 20)}
						</a>
					)
					: '-'}
           </div>,
		},
	];
	return (
		<div className={styles.container}>
			<div>Confirm Expense Details</div>
			<div className={styles.header} />
			<div style={{ display: 'flex' }}>
				{summaryDataFirst.map((item) => (
					<div key={item.title} className={styles.section}>
						<div className={styles.title}>{item.title}</div>
						<div className={styles.value}>{item.value}</div>
					</div>
				))}
			</div>
			<div style={{ display: 'flex' }}>
				{summaryDataSecond.map((item) => (
					<div key={item.title} className={styles.section}>
						<div className={styles.title}>{item.title}</div>
						<div className={styles.value}><div>{item.value}</div></div>
					</div>
				))}
			</div>
			<div style={{ display: 'flex' }}>
				{summaryDataThird.map((item) => (
					<div key={item.title} className={styles.section}>
						<div className={styles.title}>{item.title}</div>
						<div className={styles.value}>{item.value}</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default RecurringSummary;
