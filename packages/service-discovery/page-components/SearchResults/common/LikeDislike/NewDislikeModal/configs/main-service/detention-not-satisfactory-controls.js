import validate from '../../../../../page-components/FCLResults/SpotBooking/utils/validateNumber';

const detentionNotSatisfactoryControls = () => [
	{
		label : 'Type Preferred Origin detention days',
		type  : 'number',
		name  : 'unsatisfactory_destination_detention.preferred_origin_detention_free_days',
		rules : { required: 'This is required', validate: (val) => validate(val) },
		span  : 6,
	},
	{
		label : 'Type Preferred Destination detention days',
		type  : 'number',
		name  : 'unsatisfactory_destination_detention.preferred_destination_detention_free_days',
		rules : { required: 'This is required', validate: (val) => validate(val) },
		span  : 6,
	},
	{
		label : 'Remarks',
		type  : 'textarea',
		name  : 'unsatisfactory_destination_detention.remarks',
		span  : 6,
	},
	{
		label : 'Upload Feedback Doc',
		type  : 'upload',
		name  : 'unsatisfactory_destination_detention.file_upload',
		span  : 6,
	},
];

export default detentionNotSatisfactoryControls;
