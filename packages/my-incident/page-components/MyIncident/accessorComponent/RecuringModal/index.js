import { Modal, Button, Textarea } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { isEmpty, startCase } from '@cogoport/utils';
import { useState } from 'react';

import { toTitleCase, showOverflowingNumber } from '../../utils';
import ApproveAndRejectHeader from '../ApproveAndRejectHeader/index.tsx';

import styles from './style.module.css';

export const DURATION_MAPPING = {
	WEEK      : 'Weekly',
	TWO_WEEKS : 'Two Weeks',
	MONTH     : 'Monthly',
	QUARTER   : 'Quarterly',
	YEAR      : 'Yearly',
};

const DEFAULT_VAL = 1;
const DEFAULT_NUMBERS = 18;

function RecuringModal({
	onSave = () => { },
	loadingOnSave = false,
	isEditable = true,
	itemData = {},
}) {
	const [showModal, setShowModal] = useState(false);

	const [remarks, setRemarks] = useState('');
	const { data } = itemData || {};
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

	const { businessName } = organization || {};

	const summaryDataFirst = [
		{
			title : 'Vendor Name',
			value : businessName ? showOverflowingNumber(businessName, DEFAULT_NUMBERS) : '-',
		},
		{
			title : 'Expense Category',
			value : startCase(categoryName) || '-',
		},
		{
			title : 'Entity',
			value : cogoEntity || '-',
		},
	];
	const summaryDataSecond = [
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
			title : 'Ledger Account',
			value : formatAmount({
				amount   : ledgerMaxPayoutAllowed,
				currency : ledgerCurrency,
				options  : {
					style           : 'currency',
					currencyDisplay : 'code',
				},
			}) || '-',
		},
	];
	const summaryDataThird = [
		{
			title : 'Start Date',
			value : (
				<div>
					{startDate
						? formatDate({
							date: startDate,
							dateFormat:
								GLOBAL_CONSTANTS.formats.date[
									'dd MMM yyyy'
								],
							formatType : 'date',
							separator  : ' | ',
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
								GLOBAL_CONSTANTS.formats.date[
									'dd MMM yyyy'
								],
							formatType : 'date',
							separator  : ' | ',
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

	const summaryDataFourth = [
		{
			title : 'Uploaded Documents',
			value : (
				<div className={styles.document_flex}>
					{proofDocuments?.map((url, index) => (url !== '' ? (
						<a
							href={url}
							target="_blank"
							rel="noreferrer"
							key={url}
						>
							<div className={styles.view_flex}>
								<div className={styles.view}>
									View Document
									{index + DEFAULT_VAL}
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

	const renderSummary = (summary) => (
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
		<div>
			<div>
				<Button
					themeType="secondary"
					onClick={() => {
						setShowModal(true);
					}}
				>
					View
				</Button>
			</div>
			{showModal && (
				<Modal
					size="lg"
					show={showModal}
					onClose={() => setShowModal(false)}
				>
					<Modal.Header
						title={`Expense Approval -
						${toTitleCase(businessName || '')} (${toTitleCase(expenseType || '')})`}
					/>
					<Modal.Body>
						{!isEditable && <ApproveAndRejectHeader row={itemData} />}
						{renderSummary(summaryDataFirst)}
						{renderSummary(summaryDataSecond)}
						{renderSummary(summaryDataThird)}
						{renderSummary(summaryDataFourth)}
						<div>
							<div className={styles.title}>Remarks:</div>
							<div className={styles.remarkval}>{remarkData}</div>
						</div>
						<>
							<div className={styles.remarks}>Remarks*</div>
							<Textarea
								name="remark"
								size="md"
								placeholder="Enter Remark Here..."
								onChange={(value) => setRemarks(value)}
								style={{
									width        : '700',
									height       : '100px',
									marginBottom : '12px',
								}}
							/>
						</>
					</Modal.Body>
					<Modal.Footer>
						<div className={styles.button}>
							<Button
								themeType="secondary"
								size="md"
								style={{ marginRight: '8px' }}
								disabled={(isEmpty(remarks)) || loadingOnSave}
								onClick={onSave}
							>
								Save
							</Button>
						</div>
					</Modal.Footer>
				</Modal>
			)}
		</div>
	);
}
export default RecuringModal;
