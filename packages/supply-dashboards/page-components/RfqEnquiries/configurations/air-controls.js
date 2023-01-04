import airChildControlsFunc from './air-child-controls';

const airFields =	[
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
	airChildControlsFunc(),
];

export default airFields;
