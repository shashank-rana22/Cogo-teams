const TEN_PERCENT = 0.1;
const DEFAULT_VALUES = {};

function validateExchangeRate(value, AVAILABLE_CURRENCY_CONVERSION, currency) {
	const initialConversion = AVAILABLE_CURRENCY_CONVERSION?.[currency];
	const ten_percent_initial = initialConversion * TEN_PERCENT;
	const ten_less = initialConversion - ten_percent_initial;
	const ten_more = initialConversion + ten_percent_initial;
	if (value < ten_less) {
		return `Exchange rate can not be less than ${ten_less}`;
	} if (value > ten_more) {
		return `Exchange rate can not be more than ${ten_more}`;
	}
	return true;
}

export const getCurrencyControls = ({
	invoiceCurrency,
	DIFFERENT_CURRENCIES_HASH,
	AVAILABLE_CURRENCY_CONVERSION,
}) => {
	const controls = Object.keys(DIFFERENT_CURRENCIES_HASH || {}).map(
		(currency) => ({
			name             : `currency_control_${currency}`,
			type             : 'fieldArray',
			showButtons      : false,
			showDeleteButton : false,
			value            : [
				{
					to_currency   : invoiceCurrency,
					from_currency : currency,
					exchange_rate : AVAILABLE_CURRENCY_CONVERSION[currency],
				},
			],
			controls: [
				{
					name        : 'from_currency',
					label       : 'From',
					placeholder : 'Currency',
					type        : 'text',
					value       : currency,
					disabled    : true,
					size        : 'sm',
				},
				{
					name        : 'to_currency',
					label       : 'To',
					placeholder : 'Currency',
					type        : 'text',
					value       : invoiceCurrency,
					disabled    : true,
					size        : 'sm',
				},
				{
					name        : 'exchange_rate',
					label       : 'Exchange rate',
					placeholder : 'Enter rate',
					type        : 'number',
					size        : 'sm',
					rules       : {
						required : 'Exchange Rate is required',
						validate : (value) => validateExchangeRate(value, AVAILABLE_CURRENCY_CONVERSION, currency),
					},
				},
			],
		}),
	);
	controls.forEach((ctrl) => {
		DEFAULT_VALUES[ctrl.name] = ctrl.value;
	});
	return { controls, DEFAULT_VALUES };
};
