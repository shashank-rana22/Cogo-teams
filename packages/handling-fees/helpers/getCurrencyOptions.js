import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const CURRENCY_CODE = GLOBAL_CONSTANTS.currency_code;

const getCurrencyOptions = () => {
	const currencyOptions = Object.keys(CURRENCY_CODE)
		.map((currencyCode) => ({ label: currencyCode, value: currencyCode }));

	return currencyOptions;
};

export default getCurrencyOptions;
