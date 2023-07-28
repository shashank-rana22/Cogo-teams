/* eslint-disable react/jsx-indent */
import { Placeholder, Stepper } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';
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

const MAX_LENGTH = 18;
const LEVEL_ONE = 1;
const LEVEL_TWO = 2;
const LEVEL_THREE = 3;

function RenderSummaryData({ summary = [] }) {
	return (
		<div style={{ display: 'flex' }}>
			{summary?.map((item: Summary) => (
				<div key={item.title} className={styles.section}>
					<div className={styles.title}>{item.title}</div>
					<div className={styles.value}>{item.value}</div>
				</div>
			))}
		</div>
	);
}

function RecurringSummary({
	recurringData = {},
	setRecurringData = () => {},
}: Props) {
	const {
		vendorName,
		expenseCategory,
		branch,
		entityObject,
		uploadedInvoice,
		vendorID,
		payableAmount,
		currency,
		startDate,
		endDate,
		repeatEvery,
		agreementNumber,
		categoryName,
	} = recurringData || {};

	const { stakeholdersData, loading: stakeholderLoading } =		useGetStakeholders({
		incidentType    : 'OVERHEAD_APPROVAL',
		entityId        : entityObject?.id,
		incidentSubType : expenseCategory,
	});
	const { tradePartyData } = useGetTradePartyDetails(vendorID);

	const splitArray = (uploadedInvoice || '').toString().split('/') || [];
	const filename = splitArray[splitArray.length - 1];

	const { level3, level2, level1 } = stakeholdersData || {};
	const { stakeholder: stakeholder1 } = level3 || {};
	const { stakeholder: stakeholder2 } = level2 || {};
	const { stakeholder: stakeholder3 } = level1 || {};

	const stakeHoldersMapping = [
		{
			title : stakeholder1?.userName,
			key   : stakeholder1?.userName,
			level : LEVEL_ONE,
		},
		{
			title : stakeholder2?.userName,
			key   : stakeholder2?.userName,
			level : LEVEL_TWO,
		},
		{
			title : stakeholder3?.userName,
			key   : stakeholder3?.userName,
			level : LEVEL_THREE,
		},
	];

	const stakeHolderTimeLine = () => {
		if (!isEmpty(level3)) {
			return stakeHoldersMapping.filter(
				(holder) => holder.level <= LEVEL_THREE,
			);
		}
		if (!isEmpty(level2)) {
			return stakeHoldersMapping.filter(
				(holder) => holder.level <= LEVEL_TWO,
			);
		}
		return stakeHoldersMapping.filter(
			(holder) => holder.level <= LEVEL_ONE,
		);
	};

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
		if (!isEmpty(tradePartyData)) {
			setRecurringData((prev: object) => ({
				...prev,
				tradeParty: tradePartyData?.[GLOBAL_CONSTANTS.zeroth_index],
			}));
		}
	}, [tradePartyData, setRecurringData]);

	const summaryDataFirst = [
		{
			title : 'Vendor Name',
			value : vendorName
				? showOverflowingNumber(vendorName, MAX_LENGTH)
				: '-',
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
				? showOverflowingNumber(JSON.parse(branch)?.name, MAX_LENGTH)
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
							className={styles.upload_invoice}
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

	const summeryMapping = [
		{ key: '1', val: summaryDataFirst },
		{ key: '2', val: summaryDataSecond },
		{ key: '3', val: summaryDataThird },
	];

	return (
		<div className={styles.container}>
			<div>Confirm Expense Details</div>
			<div className={styles.header} />
			{summeryMapping.map(({ key, val }) => (
				<RenderSummaryData key={key} summary={val} />
			))}
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

export default RecurringSummary;
