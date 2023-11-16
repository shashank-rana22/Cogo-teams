import validate from '../../../../../../../../../page-components/FCLResults/SpotBooking/utils/validateNumber';

const detentionNotSatisfactoryControls = () => [
	{
		label    : 'Type Preferred Origin detention days',
		type     : 'number',
		name     : 'unsatisfactory_destination_detention.preferred_origin_detention_free_days',
		rules    : { required: 'This is required', validate: (val) => validate(val) },
		divWidth : 'calc(50% - 12px)',
	},
	{
		label    : 'Type Preferred Destination detention days',
		type     : 'number',
		name     : 'unsatisfactory_destination_detention.preferred_destination_detention_free_days',
		rules    : { required: 'This is required', validate: (val) => validate(val) },
		divWidth : 'calc(50% - 12px)',
	},
	{
		label    : 'Remarks',
		type     : 'textarea',
		name     : 'unsatisfactory_destination_detention.remarks',
		divWidth : 'calc(50% - 12px)',
	},
	{
		label    : 'Upload Feedback Doc',
		type     : 'upload',
		name     : 'unsatisfactory_destination_detention.file_upload',
		divWidth : 'calc(50% - 12px)',
	},
];

export default detentionNotSatisfactoryControls;
