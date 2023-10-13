import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const THRESHOLD = 0;
const airLocalChargesControls = [
	{
		name          : 'commodity',
		type          : 'select',
		span          : 4,
		placeholder   : 'Commodity',
		className     : 'primary lg',
		commodityType : 'air_local',
		rules         : { required: 'This is required' },
		style         : {
			menu: {
				width: '264px',
			},
		},
	},
	{
		label        : 'Line Items',
		span         : 12,
		name         : 'line_items_label',
		showOptional : false,
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

export default airLocalChargesControls;
