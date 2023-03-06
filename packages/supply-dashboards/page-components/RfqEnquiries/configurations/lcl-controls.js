import lclChildControls from './lcl-child-controls';

const lclFields = () => {
	const control =	[
		{
			name        : 'rate_reference_number',
			type        : 'number',
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
		{
			name        : 'departure_dates',
			type        : 'departure_date',
			label       : 'Departure Dates',
			span        : 4,
			placeholder : 'Enter Departure Dates',
			className   : 'primary sm',
			datePair    : {},
			rules       : { required: 'This is required' },
		},
		{
			name        : 'number_of_stops',
			type        : 'number',
			label       : 'Enter No Of Stops',
			placeholder : 'Enter No. of Stops',
			className   : 'primary lg',
			span        : 4,
			rules       : { required: 'This is required' },
		},
		{
			name        : 'transit_time',
			type        : 'number',
			label       : 'Enter Transit Time',
			placeholder : 'Enter Transit time (days)',
			className   : 'primary lg',
			span        : 4,
			rules       : { required: 'This is required' },
		},
		lclChildControls({ heading: '', charge_code_name: 'freights_charge_codes' }),
	];
	return control;
};

export default lclFields;
