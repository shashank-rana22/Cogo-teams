import fclChildControls from './charge-controls';

const fclFields =	[
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
		name        : 'validity_start',
		type        : 'date_picker',
		label       : 'Validity Start',
		placeholder : 'Pick',
		span        : 4,
	},
	{
		name        : 'validity_end',
		type        : 'date_picker',
		label       : 'Validity End',
		placeholder : 'Pick',
		span        : 4,
	},
	fclChildControls({ heading: '' }),
];

export default fclFields;
