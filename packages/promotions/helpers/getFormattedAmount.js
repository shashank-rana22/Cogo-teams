import formatAmount from '@cogoport/globalization/utils/formatAmount';

const getFormattedAmount = (amount = 0, currency = '') => formatAmount({
	amount,
	currency,
	options: {
		style                 : 'currency',
		currencyDisplay       : 'symbol',
		notation              : 'compact',
		compactDisplay        : 'short',
		maximumFractionDigits : 2,
	},
});

export default getFormattedAmount;
