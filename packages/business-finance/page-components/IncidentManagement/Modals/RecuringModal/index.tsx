import { Modal, Button, Textarea } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { isEmpty, startCase } from '@cogoport/utils';
import { useState } from 'react';

import showOverflowingNumber from '../../../commons/showOverflowingNumber';
import usePostExpense from '../../apisModal/usePostExpense';
import ApproveAndReject from '../../common/ApproveAndRejectData';
import ViewButton from '../../common/ViewButton';
import StakeHolderTimeline from '../../StakeHolderTimeline';
import stakeHolderTimeLineData from '../../utils/formatStakeHolderData';
import { toTitleCase } from '../../utils/titleCase';

import styles from './style.module.css';

export const DURATION_MAPPING = {
	WEEK      : 'Weekly',
	TWO_WEEKS : 'Two Weeks',
	MONTH     : 'Monthly',
	QUARTER   : 'Quarterly',
	YEAR      : 'Yearly',
};

const FIRST_INDEX = 1;

function RenderSummary({ summary = [] }) {
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

const summaryDataOne = ({ businessName, categoryName, cogoEntity }) => [
	{
		title : 'Vendor Name',
		value : businessName ? showOverflowingNumber(businessName, 18) : '-',
	},
	{
		title : 'Expense Category',
		value : startCase(categoryName),
	},
	{
		title : 'Entity',
		value : cogoEntity || '-',
	},
];

const summaryDataTwo = ({
	branchName,
	currency,
	maxPayoutAllowed,
	ledgerMaxPayoutAllowed,
	ledgerCurrency,
}) => [
	{
		title : 'Branch ',
		value : branchName || '-',
	},
	{
		title: 'Maximum Payout Allowed',
		value:
			currency && maxPayoutAllowed ? (
				<div>
					{formatAmount({
						amount  : maxPayoutAllowed,
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
		title: 'Ledger Account',
		value:
			formatAmount({
				amount   : ledgerMaxPayoutAllowed,
				currency : ledgerCurrency,
				options  : {
					style           : 'currency',
					currencyDisplay : 'code',
				},
			}) || '-',
	},
];

const summaryDataThree = ({ startDate, endDate, repeatFrequency }) => [
	{
		title : 'Start Date',
		value : (
			<div>
				{startDate
					? formatDate({
						date: startDate,
						dateFormat:
								GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
						formatType: 'date',
					})
					: '-'}
			</div>
		),
	},
	{
		title : 'End Date',
		value : (
			<div>
				{endDate
					? formatDate({
						date: endDate,
						dateFormat:
								GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
						formatType: 'date',
					})
					: '-'}
			</div>
		),
	},
	{
		title : 'Repeat Frequency',
		value : DURATION_MAPPING[repeatFrequency] || '-',
	},
];

const summaryDataFour = ({ proofDocuments, agreementNumber }) => [
	{
		title : 'Uploaded Documents',
		value : (
			<div className={styles.document_flex}>
				{(proofDocuments || []).map((url, index) => (url !== '' ? (
					<a
						href={url}
						target="_blank"
						rel="noreferrer"
						key={url}
					>
						<div className={styles.view_flex}>
							<div className={styles.view}>
								View Document
								{' '}
								{index + FIRST_INDEX}
							</div>
						</div>
					</a>
				) : (
					<div key={url}> No document available</div>
				)))}
			</div>
		),
	},
	{
		title : 'Agreement Number',
		value : agreementNumber || '-',
	},
];

const summeryMappings = ({
	summaryDataFirst,
	summaryDataSecond,
	summaryDataThird,
	summaryDataFourth,
}) => [
	{ key: '1', val: summaryDataFirst },
	{ key: '2', val: summaryDataSecond },
	{ key: '3', val: summaryDataThird },
	{ key: '4', val: summaryDataFourth },
];

function RecuringModal({ id, refetch, row, isEditable = true }) {
	const [showModal, setShowModal] = useState(false);

	const [remarks, setRemarks] = useState('');
	const { data = {}, level3, level2, level1 } = row || {};
	const { reccuringExpenseApproval, organization } = data;
	const {
		proofDocuments,
		agreementNumber,
		maxPayoutAllowed,
		remarks: remarkData,
		cogoEntity,
		branchName,
		categoryName,
		currency,
		expenseType = '',
		repeatFrequency,
		startDate,
		endDate,
		ledgerCurrency,
		ledgerMaxPayoutAllowed,
	} = reccuringExpenseApproval || {};

	const { useOnAction: onAction, loading } = usePostExpense({
		refetch,
		setShowModal,
		id,
		remark: remarks,
	});

	const { businessName } = organization || {};

	const summaryDataFirst = summaryDataOne({
		businessName,
		categoryName,
		cogoEntity,
	});

	const summaryDataSecond = summaryDataTwo({
		branchName,
		currency,
		maxPayoutAllowed,
		ledgerCurrency,
		ledgerMaxPayoutAllowed,
	});

	const summaryDataThird = summaryDataThree({
		startDate,
		endDate,
		repeatFrequency,
	});

	const summaryDataFourth = summaryDataFour({
		proofDocuments,
		agreementNumber,
	});

	const summeryMapping = summeryMappings({
		summaryDataFirst,
		summaryDataSecond,
		summaryDataThird,
		summaryDataFourth,
	});

	return (
		<div>
			<div>
				<ViewButton state={setShowModal} />
			</div>
			<Modal
				size="lg"
				show={showModal}
				onClose={() => setShowModal(false)}
			>
				<Modal.Header
					title={`Expense Approval - ${toTitleCase(
						businessName,
					)} (${toTitleCase(expenseType)})`}
				/>
				<Modal.Body>
					{!isEditable && <ApproveAndReject row={row} />}
					{summeryMapping.map(({ key, val }) => (
						<RenderSummary key={key} summary={val} />
					))}
					<div>
						<div className={styles.title}>Remarks:</div>
						<div className={styles.remarkval}>{remarkData}</div>
					</div>
					{isEditable ? (
						<>
							<div className={styles.remarks}>Remarks*</div>
							<Textarea
								name="remark"
								size="md"
								placeholder="Enter Remark Here..."
								onChange={(value: string) => setRemarks(value)}
								style={{
									width        : '700',
									height       : '100px',
									marginBottom : '12px',
								}}
							/>
						</>
					) : null}
					{!isEmpty(level1)
						|| !isEmpty(level2)
						|| !isEmpty(level3) ? (
							<StakeHolderTimeline
								timeline={stakeHolderTimeLineData({
									level1,
									level2,
									level3,
								})}
							/>
						) : null}
				</Modal.Body>
				{isEditable && (
					<Modal.Footer>
						<div className={styles.button}>
							<Button
								size="md"
								themeType="secondary"
								style={{ marginRight: '8px' }}
								disabled={!remarks.length || loading}
								loading={loading}
								onClick={() => {
									onAction('REJECTED');
								}}
							>
								Reject
							</Button>

							<Button
								size="md"
								style={{ marginRight: '8px' }}
								disabled={!remarks.length || loading}
								loading={loading}
								onClick={() => {
									onAction('APPROVED');
								}}
							>
								Approve
							</Button>
						</div>
					</Modal.Footer>
				)}
			</Modal>
		</div>
	);
}
export default RecuringModal;
