import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const THRESHOLD = 0;
const COMMODITY_TYPE_OPTIONS = {
	general: [
		{ label: 'All', value: 'all' },
	],
	special_consideration: [
		{ label: 'Dangerous Goods', value: 'dangerous' },
		{ label: 'Temperature Controlled/Pharma', value: 'temp_controlled' },
		{ label: 'Other Special Commodity Sub Type', value: 'other_special' },
	],
};
const airLocalChargesControls = (payload) => {
	const controls = [
		{
			name        : 'commodity_type',
			type        : 'select',
			label       : 'Commodity Type',
			placeholder : 'Select Commodity Type',
			span        : 6,
			options     : COMMODITY_TYPE_OPTIONS[payload?.commodity],
			rules       : {
				required: true,
			},
			isClearable: true,
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
					span        : 1.5,
					className   : 'primary lg',
					rules       : { required: 'This is required' },
				},
				{
					placeholder    : 'Currency',
					name           : 'currency',
					type           : 'select',
					value          : GLOBAL_CONSTANTS.currency_code.USD,
					span           : 1.5,
					optionsListKey : 'currencies',
					className      : 'primary lg',
					rules          : { required: 'This is required' },
				},
				{
					name        : 'price',
					type        : 'number',
					span        : 1.5,
					placeholder : 'Price/Unit',
					className   : 'primary lg',
					rules       : { required: 'This is required' },
				},

				{
					name        : 'min_price',
					span        : 1.5,
					type        : 'number',
					className   : 'primary lg',
					placeholder : 'Min Price',
					rules       : {
						required : 'Min Price is required',
						validate : (value) => (value < THRESHOLD ? 'Cannot be Negative' : true),
					},
				},
				{
					name        : 'remarks',
					type        : 'text',
					placeholder : 'remarks',
					span        : 3,
					className   : 'primary lg',
				},
			],
		},
	];
	return controls.filter((control) => control !== null);
};
export default airLocalChargesControls;
