import { startCase } from '@cogoport/utils';

import { getFormatDate } from '../../utils/formatDate';
import { getFormatAmount } from '../../utils/getformatamount';

const DURATION_MAPPING = {
	WEEK      : 'Weekly',
	TWO_WEEKS : 'Two Weeks',
	MONTH     : 'Monthly',
	QUARTER   : 'Quarterly',
	YEAR      : 'Yearly',
};

export const getSummaryDataOne = ({ agreementNumber = '', categoryName = '', cogoEntity = '', t }) => [
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

export const getSummaryDataTwo = ({
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

export const getSummaryDataThree = ({ startDate, endDate, repeatFrequency, t }) => [
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
