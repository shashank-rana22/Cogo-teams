import formatAmount from '@cogoport/globalization/utils/formatAmount';

import showOverflowingNumber from '../../../../commons/showOverflowingNumber';

import styles from './styles.module.css';

const TEXT_LIMIT_NUM = 20;

const showFormattedAmount = (amount, currency) => formatAmount({
	amount,
	currency,
	options: {
		style                 : 'currency',
		currencyDisplay       : 'code',
		minimumFractionDigits : 2,
	},
});

const listFunctions = ({ sendMail, mailSendLoading }) => ({
	renderName: ({ tradePartyDetailName }) => (
		<div>{showOverflowingNumber(tradePartyDetailName || '-', TEXT_LIMIT_NUM)}</div>
	),
	renderOutstandingAmount: ({ outstandingAmount, ledCurrency }) => (
		<div>
			{showFormattedAmount(outstandingAmount, ledCurrency)}
		</div>
	),
	renderOnAccount: ({ onAccountAmount, ledCurrency }) => (
		<div>
			{showFormattedAmount(onAccountAmount, ledCurrency)}
		</div>
	),
	renderCreditController: ({ organizationStakeholderName }) => (
		<div>{organizationStakeholderName || '-'}</div>
	),
	renderSendEmail: ({ tradePartyDetailId }) => (
		<button
			className={styles.email_cta}
			onClick={() => sendMail({ tradePartyDetailId })}
			style={{ cursor: mailSendLoading ? 'not-allowed' : 'pointer' }}
		>
			Send To Email
		</button>
	),
});

export default listFunctions;
