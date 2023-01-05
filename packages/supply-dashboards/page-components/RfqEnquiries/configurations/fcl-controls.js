import fclChildControls from './charge-controls';

const fclFields =	[
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
		span            : 10,
		type            : 'file',
		themeType       : 'secondary',
		drag            : true,
		uploadIcon      : 'ic-upload',
		onlyURLOnChange : true,
		// eslint-disable-next-line max-len
		accept          : 'image/*,.pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
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
