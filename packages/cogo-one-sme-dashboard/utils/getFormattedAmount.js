function getFormattedAmount({ number = 0 }) {
	let formattedNumber = '';

	formattedNumber = new Intl.NumberFormat(
		'en',
		{
			notation              : 'compact',
			minimumFractionDigits : 1,
			maximumFractionDigits : 2,
		},
	).format(Number(number || 0));

	return formattedNumber;
}

export default getFormattedAmount;
