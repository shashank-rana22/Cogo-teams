function getFormattedAmount({ number = 0 }) {
	let formattedNumber = '';

	formattedNumber = new Intl.NumberFormat(
		'en-US',
		{
			notation              : 'compact',
			minimumFractionDigits : 0,
			maximumFractionDigits : 2,
		},
	).format(Number(number || 0));

	return formattedNumber;
}

export default getFormattedAmount;
