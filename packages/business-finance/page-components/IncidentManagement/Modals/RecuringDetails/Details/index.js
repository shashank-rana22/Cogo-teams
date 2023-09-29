import { Button, cl, Textarea } from '@cogoport/components';
import { isEmpty, startCase } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import usePostExpense from '../../../apisModal/usePostExpense';
import STATUS_MAPPING from '../../../Constants/status_mapping';
import { getFormatDate } from '../../../utils/formatDate';
import { getFormatAmount } from '../../../utils/getformatamount';

import styles from './styles.module.css';

export const DURATION_MAPPING = {
	WEEK      : 'Weekly',
	TWO_WEEKS : 'Two Weeks',
	MONTH     : 'Monthly',
	QUARTER   : 'Quarterly',
	YEAR      : 'Yearly',
};

function RenderSummary({ summary = [] }) {
	return (

		<div className={styles.summary}>
			{summary?.map((item) => (
				<div key={item.title} className={styles.section}>
					<div className={styles.title}>{item?.title || '-'}</div>
					<div className={styles.value}>{item?.value || '-'}</div>
				</div>
			))}
		</div>

	);
}

const getSummaryDataOne = ({ agreementNumber = '', categoryName = '', cogoEntity = '', t }) => [
	{
		title : t('incidentManagement:entity_label'),
		value : cogoEntity || '-',
	},
	{
		title : t('incidentManagement:expense_category_title'),
		value : startCase(categoryName),
	},
	{
		title : t('incidentManagement:agreement_number_title'),
		value : agreementNumber || '-',
	},
];

const getSummaryDataTwo = ({
	branchName = '',
	currency = '',
	maxPayoutAllowed = '',
	ledgerMaxPayoutAllowed = '',
	ledgerCurrency = '',
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
					{getFormatAmount(maxPayoutAllowed, currency)}
				</div>
			) : (
				'-'
			),
	},
	{
		title: t('incidentManagement:ledger_account_title'),
		value:
			getFormatAmount(ledgerMaxPayoutAllowed, ledgerCurrency),
	},
];

const getSummaryDataThree = ({ startDate, endDate, repeatFrequency, t }) => [
	{
		title : t('incidentManagement:start_date_title'),
		value : (
			<div>
				{startDate
					? getFormatDate(startDate) : '-'}
			</div>
		),
	},
	{
		title : t('incidentManagement:end_date_title'),
		value : (
			<div>
				{endDate
					? getFormatDate(endDate)
					: '-'}
			</div>
		),
	},
	{
		title : t('incidentManagement:repeat_frequency_title'),
		value : DURATION_MAPPING[repeatFrequency] || '-',
	},
];

const summeryMappings = ({
	summaryDataFirst,
	summaryDataSecond,
	summaryDataThird,
}) => [
	{ key: '1', val: summaryDataFirst },
	{ key: '2', val: summaryDataSecond },
	{ key: '3', val: summaryDataThird },
];

function Details({
	row = {},
	setDetailsModal = () => {},
	refetch = () => {},
}) {
	const { t } = useTranslation(['incidentManagement']);
	const [remarks, setRemarks] = useState('');
	const { data = {}, id = '', status = '' } = row || {};
	const { reccuringExpenseApproval = {}, organization = {} } = data || {};
	const {
		agreementNumber = '',
		maxPayoutAllowed = 0,
		cogoEntity = 0,
		branchName = '',
		categoryName = '',
		currency = '',
		repeatFrequency = '',
		startDate = '',
		endDate = '',
		ledgerCurrency = '',
		ledgerMaxPayoutAllowed = 0,
	} = reccuringExpenseApproval || {};
	const { tradePartyName = '', businessName = '' } = organization || {};
	const { useOnAction: onAction, loading } = usePostExpense({
		data,
		refetch,
		setDetailsModal,
		id,
		remark: remarks,
	});

	const summaryDataFirst = getSummaryDataOne({
		agreementNumber,
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

	const summeryMapping = summeryMappings({
		summaryDataFirst,
		summaryDataSecond,
		summaryDataThird,
	});

	return (
		<div className={styles.container}>
			<div className={styles.display_box}>
				<div className={styles.company_div}>
					<div className={styles.heading}>Company Name</div>
					<div className={styles.text}>
						<div className={styles.tooltip_title}>
							{(businessName || tradePartyName || '-')}
						</div>
					</div>
				</div>
			</div>
			<div className={styles.line} />

			<div className={styles.hex_cont}>
				{summeryMapping.map(({ key, val }) => (
					<RenderSummary key={key} summary={val} />
				))}
			</div>

			{ status === 'REQUESTED' ? (
				<div>
					<div className={cl`${styles.label} 
								${styles.required_field}`}
					>
						Remarks
					</div>

					<Textarea
						className={styles.textarea}
						name="remark"
						size="md"
						placeholder="Enter Remarks Here"
						onChange={(value) => setRemarks(value)}
					/>
					<div className={styles.button_container}>

						<Button
							size="md"
							themeType="secondary"
							disabled={isEmpty(remarks) || loading}
							loading={loading}
							onClick={() => onAction({ status: STATUS_MAPPING.rejected })}
						>
							Reject
						</Button>

						<Button
							size="md"
							themeType="primary"
							disabled={isEmpty(remarks) || loading}
							loading={loading}
							onClick={() => { onAction({ status: STATUS_MAPPING.approved }); }}
						>
							Approve
						</Button>
					</div>

				</div>
			) : null }

		</div>
	);
}

export default Details;
