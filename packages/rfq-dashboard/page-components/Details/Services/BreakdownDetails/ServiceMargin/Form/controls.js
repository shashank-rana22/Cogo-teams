import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';

const getMarginControls = (lineItem = {}, nameKey = '') => {
	const {
		value = 0,
		type,
		total_margin_value,
	} = (lineItem?.margins || []).find(
		(margin) => margin?.margin_type === 'demand',
	) || {};

	let marginValue = value;
	if (type === 'percentage') {
		marginValue = total_margin_value;
	}

	const { currency } = lineItem;

	return [
		{
			name             : nameKey,
			type             : 'fieldArray',
			value            : [{ type: 'absolute_total', currency, value: marginValue }],
			showButtons      : false,
			showDeleteButton : false,
			controls         : [
				{
					name    : 'type',
					type    : 'select',
					span    : 4,
					caret   : true,
					options : [
						{
							label : ' Total ',
							value : 'absolute_total',
						},
						{
							label : 'Unit',
							value : 'absolute_unit',
						},
					],
					watch       : true,
					rules       : { required: 'Required' },
					placeholder : 'Type',
					disabled    : true,
				},
				{
					name           : 'currency',
					type           : 'select',
					span           : 4,
					placeholder    : 'currency',
					watch          : true,
					rules          : { required: 'Required' },
					optionsListKey : 'currencies',
					options        : [
						GLOBAL_CONSTANTS.currency_code.USD,
						GLOBAL_CONSTANTS.currency_code.EUR,
						GLOBAL_CONSTANTS.currency_code.INR,
						GLOBAL_CONSTANTS.currency_code.GBP,
						GLOBAL_CONSTANTS.currency_code.AED,
					].map((currencyCode) => ({
						label : currencyCode,
						value : currencyCode,
					})),
					disabled: true,
				},
				{
					name        : 'value',
					type        : 'number',
					placeholder : 'Value',
					span        : 4,
					watch       : true,
					rules       : { required: 'Required' },
				},
			],
		},
	];
};

export default getMarginControls;
