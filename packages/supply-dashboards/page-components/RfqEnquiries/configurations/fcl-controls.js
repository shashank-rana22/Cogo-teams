const fclFields =	[
	{
		name        : 'service_provider_id',
		label       : 'Service Provider',
		span        : 4,
		type        : 'select',
		placeholder : 'Select',

	},
	{
		label          : 'Rate Provided by user',
		name           : 'sourced_by_id',
		placeholder    : 'Select',
		type           : 'select',
		isClearable    : true,
		defaultOptions : false,
		span           : 4,
	},
	{
		label       : 'Shipping Line',
		name        : 'shipping_line_id',
		placeholder : 'Select',
		type        : 'select',
		isClearable : true,
		span        : 4,
	},
	{
		name        : 'rate_reference_number',
		type        : 'text',
		label       : 'Rate Reference Number',
		placeholder : 'Type rate reference Number here',
		span        : 4,
	},
	{
		name            : 'booking_rate_procurement_proof',
		label           : 'Booking rate procurement proof',
		span            : 6,
		type            : 'file',
		themeType       : 'secondary',
		drag            : true,
		uploadIcon      : 'ic-upload',
		onlyURLOnChange : true,
		accept          : 'image/*',
		uploadType      : 'aws',
	},
	{
		type               : 'fieldArray',
		showButtons        : true,
		name               : 'line_items',
		buttonText         : 'Add Line Items',
		noDeleteButtonTill : 1,
		value              : [
			{
				code     : 'BAS',
				unit     : 'per_container',
				currency : 'USD',
				price    : null,
			},
		],
		controls: [
			{
				name        : 'code',
				type        : 'select',
				span        : 4,
				valueKey    : 'code',
				placeholder : 'Charge Name',
				className   : 'primary lg',
				rules       : { required: 'This is required' },
			},
			{
				name        : 'unit',
				span        : 4,
				type        : 'select',
				className   : 'primary lg',
				placeholder : 'Unit',
				rules       : { required: 'This is required' },
			},
			{
				name           : 'currency',
				span           : 1.5,
				type           : 'select',
				placeholder    : 'Curr...',
				className      : 'primary lg',
				optionsListKey : 'currencies',
				showOptional   : false,
				rules          : { required: 'This is required' },
			},
			{
				name         : 'price',
				span         : 1.5,
				type         : 'text',
				showOptional : false,
				className    : 'primary lg',
				placeholder  : 'Amount',
				rules        : { required: 'This is required' },
			},
		],
	},
];

export default fclFields;
