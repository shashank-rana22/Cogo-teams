export const getCurrencyControls = ({
	invoiceCurrency,
	DIFFERENT_CURRENCIES_HASH,
	AVAILABLE_CURRENCY_CONVERSION,
}) => {
	const CURRENCY_CONTROLS = [{
		name             : 'currency_control',
		type             : 'fieldArray',
		showButtons      : false,
		showDeleteButton : false,
		controls         : [
			{
				name        : 'from_currency',
				label       : 'From',
				placeholder : 'Currency',
				type        : 'text',
				disabled    : true,
				size        : 'sm',
			},
			{
				name        : 'to_currency',
				label       : 'To',
				placeholder : 'Currency',
				type        : 'text',
				disabled    : true,
				size        : 'sm',
			},
			{
				name        : 'exchange_rate',
				label       : 'Exchange rate',
				placeholder : 'Enter rate',
				type        : 'number',
				size        : 'sm',
			},
		],
	}];

	const DEFAULT_VALUES = [];

	Object.keys(DIFFERENT_CURRENCIES_HASH || {}).forEach((currency) => {
		DEFAULT_VALUES.push({
			to_currency   : invoiceCurrency,
			from_currency : currency,
			exchange_rate : AVAILABLE_CURRENCY_CONVERSION[currency],
		});
	});

	return { CURRENCY_CONTROLS, DEFAULT_VALUES };
};
