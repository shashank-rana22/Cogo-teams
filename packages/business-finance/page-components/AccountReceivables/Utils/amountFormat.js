import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const MAX_FRACTION_DIGITS = 2;

function formatCurrency(currency = 'INR', amount = 0, isTooltip = false) {
	const LOCALE = GLOBAL_CONSTANTS.currency_locale[currency];
	const truncatedAmount = parseFloat(amount?.toFixed(MAX_FRACTION_DIGITS));
	const isNegative = truncatedAmount < GLOBAL_CONSTANTS.zeroth_index;
	const absoluteAmount = Math.abs(truncatedAmount);

	const options = {
		notation              : !isTooltip ? 'compact' : undefined,
		compactDisplay        : !isTooltip ? 'short' : undefined,
		minimumFractionDigits : 0,
		maximumFractionDigits : MAX_FRACTION_DIGITS,
	};

	let formattedAmount = new Intl.NumberFormat(LOCALE, options).format(absoluteAmount);

	if (currency === 'VND') {
		formattedAmount = formattedAmount
			.replace('Tr', 'M')
			.replace('T', 'B')
			.replace('N', 'K');
	}

	return `${isNegative ? '-' : ''}${currency} ${formattedAmount}`;
}

export default formatCurrency;
