import { Placeholder, Stepper } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { isEmpty, startCase } from '@cogoport/utils';
import { useEffect } from 'react';

import showOverflowingNumber from '../../../../commons/showOverflowingNumber';
import { formatDate } from '../../../../commons/utils/formatDate';
import { SummaryInterface } from '../../../commons/Interfaces';
import { DURATION_MAPPING } from '../../../constants/DURATION_MAPPING';
import { officeLocations } from '../../../utils/officeLocations';
import useGetStakeholders from '../../hooks/useGetStakeholders';
import useGetTradePartyDetails from '../../hooks/useGetTradePartyDetails';

import styles from './styles.module.css';

interface SummaryElemet {
	title?: string;
	value?: any;
}
interface Entity {
	entity_code?: number | string;
	id?: number;
}

interface Data {
	vendorName?: string;
	transactionDate?: Date;
	paymentMode?: string;
	uploadedInvoice?: string;
	periodOfTransaction?: string;
	expenseCategory?: string;
	expenseSubCategory?: string;
	branch?: any;
	entityObject?: Entity;
	invoiceDate?: Date;
	stakeholderName?: string;
	invoiceCurrency?: string;
	vendorID?: number | string;
	payableAmount?: number;
	startDate?: Date;
	endDate?: Date;
	repeatEvery?: string;
	agreementNumber?: number;
	currency?: string;
}

interface Props {
	expenseData?: Data;
	setExpenseData?: (p: any) => void;
	rowData?: SummaryInterface;
}

function Summary({ expenseData, setExpenseData, rowData }: Props) {
	const { entityObject, branch } = expenseData || {};
	const { entity_code: entityCode } = entityObject || {};
	const { name: branchName } = branch || {};

	const {
		categoryName,
		startDate,
		endDate,
		repeatFrequency,
		businessName,
		agreementNumber,
		branchId,
	} = rowData || {};

	const {
		uploadedInvoice,
		stakeholderName,
		vendorID,
		payableAmount,
		invoiceCurrency: currency,
	} = expenseData || {};
	const { stakeholdersData, loading: stakeholdersLoading } = useGetStakeholders({
		incidentType    : 'RECURRING_EXPENSE_APPROVAL',
		incidentSubType : categoryName,
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
		if (stakeholdersData) {
			const { userEmail, userId, userName } = stakeholdersData || {};
			setExpenseData((prev: object) => ({
				...prev,
				stakeholderEmail : userEmail,
				stakeholderId    : userId,
				stakeholderName  : userName,
			}));
		}
	}, [stakeholdersData, setExpenseData]);

	useEffect(() => {
		if (!isEmpty(tradePartyData)) {
			setExpenseData((prev: object) => ({
				...prev,
				tradeParty: tradePartyData?.[GLOBAL_CONSTANTS.zeroth_index],
			}));
		}
	}, [tradePartyData, setExpenseData]);

	useEffect(() => {
		if (branchId) {
			const branchData = officeLocations?.filter(
				(location: any) => JSON.parse(location?.value)?.branchId === branchId,
			);
			if (!isEmpty(branchData)) {
				setExpenseData((p: object) => ({
					...p,
					branch: JSON.parse(branchData[GLOBAL_CONSTANTS.zeroth_index]?.value || '{}'),
				}));
			}
		}
	}, [branchId, setExpenseData]);

	const summaryDataFirst = [
		{
			title : 'Vendor Name',
			value : businessName ? showOverflowingNumber(businessName, 18) : '-',
		},
		{
			title : 'Expense Category',
			value : categoryName,
		},
		{
			title : 'Entity',
			value : entityCode || '-',
		},
	];
	const summaryDataSecond = [
		{
			title : 'Branch ',
			value : branchName || '-',
		},
		{
			title: 'Payable Amount',
			value:
				currency && payableAmount ? (
					<div>
						{formatAmount({
							amount  : payableAmount as any,
							currency,
							options : {
								style           : 'currency',
								currencyDisplay : 'code',
							},
						})}
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
	];
	const summaryDataThird = [
		{
			title : 'Agreement Number',
			value : agreementNumber || '-',
		},
		{
			title : 'Duration',
			value : DURATION_MAPPING[repeatFrequency] || '-',
		},
		{
			title : 'To be Approved by',
			value : stakeholdersLoading ? (
				<Placeholder height="20px" width="150px" />
			) : (
				startCase(stakeholderName || '') || '-'
			),
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

	const renderSummary = (summary: SummaryElemet[]) => (
		<div style={{ display: 'flex' }}>
			{summary?.map((item: SummaryElemet) => (
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
			{renderSummary(summaryDataFirst)}
			{renderSummary(summaryDataSecond)}
			{renderSummary(summaryDataThird)}
			<div>
				<div className={styles.title}>To be Approved by</div>
				<div className={styles.steeper}>
					{stakeholdersLoading ? (
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

export default Summary;
