import { Modal, Button, Textarea } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { isEmpty, startCase } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';

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

const getSummaryDataOne = ({ businessName, categoryName, cogoEntity, t }) => [
	{
		title : t('incidentManagement:vendor_name_title'),
		value : businessName ? showOverflowingNumber(businessName, 18) : '-',
	},
	{
		title : t('incidentManagement:expense_category_title'),
		value : startCase(categoryName),
	},
	{
		title : t('incidentManagement:entity_label'),
		value : cogoEntity || '-',
	},
];

const getSummaryDataTwo = ({
	branchName,
	currency,
	maxPayoutAllowed,
	ledgerMaxPayoutAllowed,
	ledgerCurrency,
	t,
}) => [
	{
		title : t('incidentManagement:branch_title'),
		value : branchName || '-',
	},
	{
		title: t('incidentManagement:max_payout_title'),
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
		title: t('incidentManagement:ledger_account_title'),
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

const getSummaryDataThree = ({ startDate, endDate, repeatFrequency, t }) => [
	{
		title : t('incidentManagement:start_date_title'),
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
		title : t('incidentManagement:end_date_title'),
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
		title : t('incidentManagement:repeat_frequency_title'),
		value : DURATION_MAPPING[repeatFrequency] || '-',
	},
];

const getSummaryDataFour = ({ proofDocuments, agreementNumber, t }) => [
	{
		title : t('incidentManagement:uploaded_documents_title'),
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
								{t('incidentManagement:view_doc_link')}
								{' '}
								{index + FIRST_INDEX}
							</div>
						</div>
					</a>
				) : (
					<div key={url}>
						{' '}
						{t('incidentManagement:no_doc_available')}
					</div>
				)))}
			</div>
		),
	},
	{
		title : t('incidentManagement:agreement_number_title'),
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

function RecuringModal({ id = '', refetch = () => {}, row, isEditable = true }) {
	const { t } = useTranslation(['incidentManagement']);
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

	const summaryDataFirst = getSummaryDataOne({
		businessName,
		categoryName,
		cogoEntity,
		t,
	});

	const summaryDataSecond = getSummaryDataTwo({
		branchName,
		currency,
		maxPayoutAllowed,
		ledgerCurrency,
		ledgerMaxPayoutAllowed,
		t,
	});

	const summaryDataThird = getSummaryDataThree({
		startDate,
		endDate,
		repeatFrequency,
		t,
	});

	const summaryDataFourth = getSummaryDataFour({
		proofDocuments,
		agreementNumber,
		t,
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
					title={`${t('incidentManagement:expense_approval')} - ${toTitleCase(
						businessName,
					)} (${toTitleCase(expenseType)})`}
				/>
				<Modal.Body className={styles.body_section}>
					{!isEditable && <ApproveAndReject row={row} />}
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
					{summeryMapping.map(({ key, val }) => (
						<RenderSummary key={key} summary={val} />
					))}
					<div>
						<div className={styles.title}>{`${t('incidentManagement:remarks')}:`}</div>
						<div className={styles.remarkval}>{remarkData}</div>
					</div>
					{isEditable ? (
						<>
							<div className={styles.remarks}>{`${t('incidentManagement:remarks')}*`}</div>
							<Textarea
								name="remark"
								size="md"
								placeholder={t('incidentManagement:remarks_placeholder') || ''}
								onChange={(value: string) => setRemarks(value)}
								style={{
									width        : '700',
									height       : '100px',
									marginBottom : '12px',
								}}
							/>
						</>
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
								{t('incidentManagement:reject_btn')}
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
								{t('incidentManagement:approve_btn')}
							</Button>
						</div>
					</Modal.Footer>
				)}
			</Modal>
		</div>
	);
}
export default RecuringModal;
