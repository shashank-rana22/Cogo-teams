import currencies from '../helpers/currencies';

import airChildControlsFunc from './air-child-controls';

const airFields =	[
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
		span            : 4,
		type            : 'file',
		themeType       : 'secondary',
		drag            : true,
		uploadIcon      : 'ic-upload',
		onlyURLOnChange : true,
		accept          : 'image/*,.pdf,.doc,.docx',
		uploadType      : 'aws',
	},
	{
		name        : 'validity_start',
		type        : 'date_picker',
		label       : 'Validity Start',
		placeholder : 'Select Validity Start',
		span        : 4,
		rules       : { required: 'This is required' },
	},
	{
		name        : 'validity_end',
		type        : 'date_picker',
		label       : 'Validity End',
		placeholder : 'Select Validity End',
		span        : 4,
		rules       : { required: 'This is required' },
	},
	airChildControlsFunc({ heading: '', charge_code_name: 'freights_charge_codes' }),
	{
		type             : 'fieldArray',
		showButtons      : true,
		name             : 'surcharge',
		heading          : 'Add Surcharge',
		charge_code_name : 'surcharge_charge_codes',
		value            : [
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
				name        : 'unit',
				label       : 'Unit',
				type        : 'select',
				span        : 2.5,
				placeholder : 'Select unit',
				showToolTip : true,
				rules       : { required: 'This is required' },
			},
			{
				name        : 'currency',
				span        : 2.5,
				label       : 'Currency',
				type        : 'select',
				placeholder : 'Curr...',
				options     : currencies,
				rules       : { required: 'This is required' },
			},
			{
				name        : 'price',
				span        : 3,
				type        : 'text',
				min         : 3,
				label       : 'Price',
				placeholder : 'Amount',
				rules       : { required: 'This is required' },
			},
		],
	},
];

export default airFields;
