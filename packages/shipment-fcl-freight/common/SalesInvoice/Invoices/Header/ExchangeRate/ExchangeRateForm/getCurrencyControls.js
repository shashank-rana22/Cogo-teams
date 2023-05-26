export const getCurrencyControls = ({
	invoiceCurrency,
	differentCurrenciesHash,
	availableCurrencyConversions,
}) => {
	// Object.keys(differentCurrenciesHash || {}).map((currency, i) => console.log(currency, i));
	// console.log(differentCurrenciesHash, ' :differentCurrenciesHash');
	const controls = Object.keys(differentCurrenciesHash || {}).map(
		(currency) => ({
			name             : `currency_control_${currency}`,
			type             : 'fieldArray',
			showButtons      : false,
			showDeleteButton : false,
			value            : [
				{
					to_currency   : invoiceCurrency,
					from_currency : currency,
					exchange_rate : availableCurrencyConversions[currency],
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
						min      : 0.000001,
					},
				},
			],
		}),
	);
	const defaultValues = {};
	controls.forEach((ctrl) => {
		defaultValues[ctrl.name] = ctrl.value;
	});
	return { controls, defaultValues };
};
