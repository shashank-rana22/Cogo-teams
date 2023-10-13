import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const fclLocalChargesControls = (payload) => [
	{
		heading      : 'Line Items',
		span         : 12,
		showOptional : false,
		name         : 'line_items_label',
	},
	{
		label              : 'Add Line Items',
		name               : 'line_items',
		type               : 'fieldArray',
		showButtons        : true,
		buttonText         : 'Add Line Items',
		charge_code_name   : 'local_charge_codes',
		span               : 12,
		noDeleteButtonTill : 1,
		value              : [
			{
				code     : '',
				unit     : '',
				price    : '',
				currency : '',
			},
		],
		controls: [
			{
				name        : 'code',
				caret       : true,
				type        : 'select',
				className   : 'primary lg',
				placeholder : 'Select Charge',
				label       : 'Charge Code',
				span        : 3,
				rules       : { required: 'This is required' },
			},
			{
				name        : 'unit',
				placeholder : 'Unit',
				label       : 'Unit',
				type        : 'select',
				span        : 3,
				className   : 'primary lg',
				rules       : { required: 'This is required' },
			},
			{
				placeholder    : 'Currency',
				label          : 'Currency',
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
				label       : 'Price',
				span        : 1.5,
				placeholder : 'Price Per Unit',
				className   : 'primary lg',
				rules       : { required: 'This is required' },
			},
			{
				name        : 'remark',
				type        : 'text',
				placeholder : 'remarks',
				label       : 'Remarks',
				span        : 2,
				className   : 'primary lg',
			},
		],
	},
	{
		name         : 'detention_free_days',
		type         : 'number',
		span         : 4,
		label        : 'Detention Free Days',
		value        : payload?.destination_local?.detention?.free_limit,
		placeholder  : 'type here...',
		showOptional : false,
		className    : 'primary lg',
		min          : 0,
	},
	{
		name               : 'detention_days',
		type               : 'fieldArray',
		label              : 'Detention Days',
		showButtons        : true,
		buttonText         : 'Add Detention Days Slab',
		className          : 'primary lg',
		noDeleteButtonTill : 0,
		controls           : [
			{
				label        : 'Lower Limit',
				name         : 'lower_limit',
				type         : 'number',
				disabled     : true,
				span         : 3,
				showOptional : false,
				placeholder  : 'Lower Limit (in MT)',
				className    : 'primary lg',
				rules        : { required: 'This is required' },
			},
			{
				label        : 'Upper Limit',
				name         : 'upper_limit',
				type         : 'number',
				span         : 3,
				showOptional : false,
				className    : 'primary lg',
				placeholder  : 'Upper Limit (in MT)',
				rules        : { required: 'This is required' },
			},
			{
				label          : 'Currency',
				name           : 'currency',
				type           : 'select',
				optionsListKey : 'currencies',
				span           : 1.5,
				showOptional   : false,
				className      : 'primary lg',
				placeholder    : 'Curr...',
				rules          : { required: 'This is required' },
			},
			{
				label        : 'Price',
				name         : 'price',
				type         : 'number',
				span         : 1.5,
				showOptional : false,
				className    : 'primary lg',
				placeholder  : 'Price',
				rules        : { required: 'This is required' },
			},
			{
				label       : 'Remark',
				name        : 'remark',
				type        : 'text',
				placeholder : 'remarks',
				span        : 2,
				className   : 'primary lg',
			},
		],
	},
	{
		name        : 'demurrage_free_days',
		label       : 'Demurrage Free Days',
		type        : 'number',
		min         : 0,
		span        : 4,
		className   : 'primary lg',
		placeholder : 'Free Days',
		rules       : { required: 'Required' },
	},
	{
		name               : 'demurrage_days',
		type               : 'fieldArray',
		label              : 'Demurrage Days',
		showButtons        : true,
		noDeleteButtonTill : 0,
		className          : 'primary lg',
		buttonText         : 'Add Demurrage Days Slab',
		controls           : [
			{
				label        : 'Lower Limit',
				name         : 'lower_limit',
				type         : 'number',
				disabled     : true,
				span         : 2.5,
				showOptional : false,
				placeholder  : 'Lower Limit (in MT)',
				className    : 'primary lg',
				rules        : { required: 'This is required' },
			},
			{
				label        : 'Upper Limit',
				name         : 'upper_limit',
				type         : 'number',
				span         : 2.5,
				showOptional : false,
				className    : 'primary lg',
				placeholder  : 'Upper Limit (in MT)',
				rules        : { required: 'This is required' },
			},
			{
				label          : 'Currency',
				name           : 'currency',
				type           : 'select',
				optionsListKey : 'currencies',
				span           : 1.5,
				showOptional   : false,
				className      : 'primary lg',
				placeholder    : 'Curr...',
				rules          : { required: 'This is required' },
			},
			{
				label        : 'Price',
				name         : 'price',
				type         : 'number',
				span         : 1.5,
				showOptional : false,
				className    : 'primary lg',
				placeholder  : 'Price',
				rules        : { required: 'This is required' },
			},
			{
				label       : 'Remark',
				name        : 'remark',
				type        : 'text',
				placeholder : 'remarks',
				span        : 3,
				className   : 'primary lg',
			},
		],
	},
];

export default fclLocalChargesControls;
