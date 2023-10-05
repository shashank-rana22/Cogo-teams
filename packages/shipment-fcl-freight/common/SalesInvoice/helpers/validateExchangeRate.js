import { Toast } from '@cogoport/components';

const TEN_PERCENT = 0.1;

const validateExchangeRate = ({ value, AVAILABLE_CURRENCY_CONVERSION, currency }) => {
	const initialConversion = AVAILABLE_CURRENCY_CONVERSION?.[currency];
	const ten_percent_initial = Number(initialConversion) * TEN_PERCENT;
	const ten_less = initialConversion - ten_percent_initial;
	const ten_more = initialConversion + ten_percent_initial;

	if (value < ten_less) {
		Toast.error(`Exchange rate can not be less than ${ten_less}`);
		return false;
	} if (value > ten_more) {
		Toast.error(`Exchange rate can not be more than ${ten_more}`);
		return false;
	}

	return true;
};

export default validateExchangeRate;
