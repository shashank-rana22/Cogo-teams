import currencies from '../utils/currencies';

import airChildControlsFunc from './air-child-controls';

const airFields =	[
	{
		label       : 'Air Line',
		name        : 'airline_id',
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
	airChildControlsFunc({ heading: '' }),
	{
		type        : 'fieldArray',
		showButtons : true,
		name        : 'surcharge',
		heading     : 'Add Surcharge',
		value       : [
			{
				code: '',
			},
		],
		buttonText         : 'Add Line Items',
		noDeleteButtonTill : 0,
		controls           : [
			{
				name        : 'code',
				type        : 'select',
				span        : 3,
				label       : 'Charge Code',
				placeholder : 'Charge Name',
				valueKey    : 'code',
				rules       : { required: 'This is required' },
			},
			{
				name        : 'price',
				span        : 1.5,
				type        : 'text',
				min         : 0,
				label       : 'Price',
				placeholder : 'Amount',
				rules       : { required: 'This is required' },
			},
			{
				name        : 'currency',
				span        : 1.5,
				label       : 'Currency',
				type        : 'select',
				placeholder : 'Curr...',
				options     : currencies,
				rules       : { required: 'This is required' },
			},
			{
				name        : 'unit',
				label       : 'Unit',
				type        : 'select',
				span        : 3,
				placeholder : 'Select unit',
				showToolTip : true,
				rules       : { required: 'This is required' },
			},
			{
				name        : 'min_price',
				label       : 'Minimum Price per shipment',
				type        : 'text',
				span        : 2,
				min         : 0,
				placeholder : 'Type minimum price',
				rules       : { required: 'This is required' },
			},
		],
	},
];

export default airFields;
