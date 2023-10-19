import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';

const CURRENCY_CODE = GLOBAL_CONSTANTS.currency_code;

const getCurrencyOptions = ({ ALLOWED_CURRENCY = [] }) => {
	const currencyOptions = Object.keys(CURRENCY_CODE)
		.filter(
			(currencyCode) => isEmpty(ALLOWED_CURRENCY) || ALLOWED_CURRENCY.includes(currencyCode),
		)
		.map((currencyCode) => ({ label: currencyCode, value: currencyCode }));

	return currencyOptions;
};

export default getCurrencyOptions;
