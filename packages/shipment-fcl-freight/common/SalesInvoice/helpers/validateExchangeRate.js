const TEN_PERCENT = 0.1;

const validateExchangeRate = ({ value, AVAILABLE_CURRENCY_CONVERSION, currency }) => {
	const initialConversion = AVAILABLE_CURRENCY_CONVERSION?.[currency];
	const ten_percent_initial = Number(initialConversion) * TEN_PERCENT;
	const ten_less = initialConversion - ten_percent_initial;
	const ten_more = initialConversion + ten_percent_initial;
	if (value < ten_less) {
		return {
			validation : false,
			message    : `Exchange rate can not be less than ${ten_less}`,
		};
	} if (value > ten_more) {
		return {
			validation : false,
			message    : `Exchange rate can not be more than ${ten_more}`,
		};
	}

	return {
		validation : true,
		message    : '',
	};
};

export default validateExchangeRate;
