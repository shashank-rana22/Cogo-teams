import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const getMarginControls = (nameKey = '') => [
	{
		name             : nameKey,
		type             : 'fieldArray',
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
					GLOBAL_CONSTANTS.currency_code.VND,
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

export default getMarginControls;
