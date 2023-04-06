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

interface Summary {
	title?:string,
	value?:any,
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
	totalPayable?:number | string,
	stakeholderName?:string,
	invoiceCurrency?:string,
	vendorID?:number | string,
	payableAmount?:number | string,
}

interface Props {
	nonRecurringData?: Data,
	setNonRecurringData?:(obj)=>void,
}

function NonRecurringSummary({ nonRecurringData, setNonRecurringData }:Props) {
	const {
		periodOfTransaction,
		vendorName,
		expenseCategory,
		expenseSubCategory,
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

	const { stakeholdersData, loading:stakeholderLoading } = useGetStakeholders(expenseCategory);
	const { tradePartyData } = useGetTradePartyDetails(vendorID);

	const splitArray = (uploadedInvoice || '').toString().split('/') || [];
	const filename = splitArray[splitArray.length - 1];

	useEffect(() => {
		if (stakeholdersData) {
			const { userEmail, userId, userName } = stakeholdersData || {};
			setNonRecurringData((prev:object) => ({
				...prev,
				stakeholderEmail : userEmail,
				stakeholderId    : userId,
				stakeholderName  : userName,
			}));
		}
	}, [stakeholdersData, setNonRecurringData]);

	useEffect(() => {
		if (tradePartyData?.length > 0) {
			setNonRecurringData((prev:object) => ({
				...prev,
				tradeParty: tradePartyData?.[0],
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
		{
			title : 'Branch ',
			value : branch ? showOverflowingNumber(JSON.parse(branch)?.name, 18) : '-',
		},
	];
	const summaryDataSecond = [
		{
			title : 'Payable Amount',
			value : <div>
{invoiceCurrency}
{' '}
{payableAmount || '-'}
           </div>,
		},
		{
			title : 'Expense Date',
			value : <div>
{invoiceDate
	? formatDate(invoiceDate, 'dd/MMM/yy', {}, false) : '-'}
           </div>,
		},
		{
			title : 'Transaction Date',
			value : <div>
				{transactionDate
					? formatDate(transactionDate, 'dd/MMM/yy', {}, false) : '-'}

           </div>,
		},
		{
			title : 'Period',
			value : <div>
				{periodOfTransaction ? startCase(periodOfTransaction) : '-'}
				{' '}
           </div>,
		},
		{
			title : 'Payment Mode ',
			value : startCase(paymentMode || '') || '-',
		},
	];
	const summaryDataThird = [
		{
			title : 'To be Approved by',
			value : stakeholderLoading ? <Placeholder height="20px" width="150px" />
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
							{showOverflowingNumber(filename, 20)}
						</a>
					)
					: '-'}
           </div>,
		},
	];

	const renderSummaryData = (summary:Summary[]) => (
				<div style={{ display: 'flex' }}>
								{summary?.map((item:Summary) => (
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
		</div>
	);
}

export default NonRecurringSummary;
