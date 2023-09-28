import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const MAX_FRACTION_DIGITS = 2;
const THOUSAND = 1000;
const LAKHS = 100000;
const MILLIONS = 1000000;
const CRORES = 10000000;
const BILLIONS = 1000000000;

function formatsAmount(amount = 0) {
	if (Number.isInteger(amount)) {
		return amount.toFixed(GLOBAL_CONSTANTS.zeroth_index);
	}
	return amount.toFixed(MAX_FRACTION_DIGITS);
}

function formatCurrency(currency = 'INR', amount = 0) {
	const truncatedAmount = parseFloat(amount?.toFixed(MAX_FRACTION_DIGITS));
	const isNegative = truncatedAmount < GLOBAL_CONSTANTS.zeroth_index;
	const absoluteAmount = Math.abs(truncatedAmount);

	if (currency === 'INR') {
		if (absoluteAmount >= CRORES) {
			return `${isNegative ? '-' : ''}${currency} ${formatsAmount(absoluteAmount / CRORES)} CR`;
		} if (absoluteAmount >= LAKHS) {
			return `${isNegative ? '-' : ''}${currency} ${formatsAmount(absoluteAmount / LAKHS)} L`;
		} if (absoluteAmount >= THOUSAND) {
			return `${isNegative ? '-' : ''}${currency} ${formatsAmount(absoluteAmount / THOUSAND)} K`;
		}
		return `${isNegative ? '-' : ''}${currency} ${formatsAmount(absoluteAmount)}`;
	}

	if (absoluteAmount >= BILLIONS) {
		return `${isNegative ? '-' : ''}${currency} ${formatsAmount(absoluteAmount / BILLIONS)} B`;
	} if (absoluteAmount >= MILLIONS) {
		return `${isNegative ? '-' : ''}${currency} ${formatsAmount(absoluteAmount / MILLIONS)} M`;
	} if (absoluteAmount >= THOUSAND) {
		return `${isNegative ? '-' : ''}${currency} ${formatsAmount(absoluteAmount / THOUSAND)} K`;
	}
	return `${isNegative ? '-' : ''}${currency} ${formatsAmount(absoluteAmount)}`;
}
export default formatCurrency;
