import formatAmount from '@cogoport/globalization/utils/formatAmount';

const DEFAULT_AMOUNT = 0;
export const getFormatAmount = (amount = 0, currency = 'INR') => {
	const formattedAmount = 	 formatAmount({
		amount  : amount || DEFAULT_AMOUNT,
		currency,
		options : {
			style                 : 'currency',
			currencyDisplay       : 'code',
			maximumFractionDigits : 2,
		},
	});
	return formattedAmount;
};
