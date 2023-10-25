import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const THRESHOLD = 0;

const controls = [
	{
		name        : 'trade_type',
		type        : 'select',
		className   : 'primary lg',
		placeholder : 'Select Trade Type',
		span        : 4,
		rules       : { required: 'This Is Required' },
		options     : [
			{
				label : 'Import',
				value : 'import',
			},
			{
				label : 'Export',
				value : 'export',
			},
		],
	},
	{
		label              : 'Add Line Items',
		name               : 'line_items',
		type               : 'fieldArray',
		showButtons        : true,
		buttonText         : 'Add Line Items',
		noDeleteButtonTill : 1,
		value              : [
			{
				code      : '',
				unit      : '',
				price     : '',
				min_price : '',
			},
		],
		controls: [
			{
				name        : 'code',
				caret       : true,
				type        : 'select',
				valueKey    : 'code',
				labelKey    : 'label',
				placeholder : 'Select Charge',
				className   : 'primary lg',
				span        : 2,
				rules       : { required: 'This is required' },
			},
			{
				name        : 'unit',
				placeholder : 'Unit',
				type        : 'select',
				span        : 2,
				className   : 'primary lg',
				rules       : { required: 'This is required' },
			},
			{
				placeholder    : 'Currency',
				name           : 'currency',
				type           : 'select',
				value          : GLOBAL_CONSTANTS.currency_code.USD,
				span           : 2,
				optionsListKey : 'currencies',
				className      : 'primary lg',
				rules          : { required: 'This is required' },
			},
			{
				name        : 'price',
				type        : 'number',
				span        : 2.5,
				placeholder : 'Price Per Unit',
				className   : 'primary lg',
				rules       : { required: 'This is required' },
			},

			{
				name        : 'min_price',
				span        : 2.5,
				type        : 'number',
				className   : 'primary lg',
				placeholder : 'Minimum Price',
				rules       : {
					required : 'Min Price is required',
					validate : (value) => (value < THRESHOLD ? 'Cannot be Negative' : true),
				},
			},
		],
	},
];

export default controls;
