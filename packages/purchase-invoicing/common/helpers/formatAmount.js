import formatAmount from '@cogoport/globalization/utils/formatAmount';

const getFormattedAmount = (amount, currency) => (
	formatAmount({
		amount  : amount || 0,
		currency,
		options : {
			style                 : 'currency',
			currencyDisplay       : 'code',
			maximumFractionDigits : 2,
		},
	})

);

export default getFormattedAmount;
