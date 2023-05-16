import formatAmount from '@cogoport/globalization/utils/formatAmount';

const getFormattedAmount = ({ amount, currency }) => (
	formatAmount({
		amount,
		currency,
		options: {
			style                 : 'currency',
			currencyDisplay       : 'code',
			maximumFractionDigits : 2,
		},
	})
);

export default getFormattedAmount;
