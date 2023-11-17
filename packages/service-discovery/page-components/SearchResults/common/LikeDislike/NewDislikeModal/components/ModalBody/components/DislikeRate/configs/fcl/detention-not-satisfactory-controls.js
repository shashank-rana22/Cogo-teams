import validate from '../../../../../../../../../page-components/FCLResults/SpotBooking/utils/validateNumber';

const detentionNotSatisfactoryControls = () => [
	{
		label    : 'Type Preferred Origin detention days',
		type     : 'number',
		name     : 'unsatisfactory_free_days.origin_detention',
		rules    : { required: 'This is required', validate: (val) => validate(val) },
		divWidth : 'calc(50% - 12px)',
	},
	{
		label    : 'Type Preferred Destination detention days',
		type     : 'number',
		name     : 'unsatisfactory_free_days.destination_detention',
		rules    : { required: 'This is required', validate: (val) => validate(val) },
		divWidth : 'calc(50% - 12px)',
	},
	{
		label    : 'Remarks',
		type     : 'textarea',
		name     : 'unsatisfactory_free_days.remarks',
		divWidth : 'calc(50% - 12px)',
	},
	{
		label    : 'Upload Feedback Doc',
		type     : 'upload',
		name     : 'unsatisfactory_free_days.file_upload',
		divWidth : 'calc(50% - 12px)',
	},
];

export default detentionNotSatisfactoryControls;
