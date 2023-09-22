import formatAmount from '@cogoport/globalization/utils/formatAmount';

const formatAmountValue = (amount, currency) => (
	formatAmount({
		amount,
		currency,
		options: {
			style           : 'currency',
			currency,
			currencyDisplay : 'symbol',
		},
	}) || '-'
);

export default formatAmountValue;
