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
		],
	},
];

export default airFields;
