export const getCurrencyControls = ({
	invoiceCurrency,
	differentCurrenciesHash,
	availableCurrencyConversions,
}) => {
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
			className : 'primary sg',
			controls  : [
				{
					name        : 'from_currency',
					label       : 'From',
					type        : 'text',
					placeholder : currency,
					span        : 4,
					disabled    : true,
					className   : 'primary sg',
				},
				{
					name        : 'to_currency',
					label       : 'To',
					type        : 'text',
					placeholder : 'Currency',
					caret       : true,
					span        : 4,
					value       : invoiceCurrency,
					disabled    : true,
					className   : 'primary sg',
				},
				{
					name        : 'exchange_rate',
					label       : 'Exchange rate',
					type        : 'number',
					placeholder : 'Enter rate',
					watch       : true,
					span        : 4,
					className   : 'primary sg',
				},
			],
		}),
	);

	return controls;
};
