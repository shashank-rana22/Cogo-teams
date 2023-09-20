import formatAmount from '@cogoport/globalization/utils/formatAmount';

function formattedAmount(
	amount = 0,
	currency = 'INR',
	maximumFractionDigits = 2,
) {
	return formatAmount({
		amount,
		currency,
		options: {
			style: 'decimal',
			maximumFractionDigits,
		},
	});
}

export default formattedAmount;
