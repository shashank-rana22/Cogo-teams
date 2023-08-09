import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const controls = [
	{
		label       : 'Cancel Reason',
		name        : 'cancelReason',
		type        : 'textarea',
		placeholder : 'Enter Your Cancellation Reason Here',
		span        : 12,
		theme       : 'admin',
		className   : 'primary md',
		rules       : { required: true },
	},
	{
		name       : 'documentUrls',
		label      : 'Cancel Agreement file',
		type       : 'file',
		drag       : true,
		span       : 12,
		uploadType : 'aws',
		accept     : '.png,.pdf,.jpg,.jpeg,.doc,.docx',
		maxSize    : GLOBAL_CONSTANTS.options.upload_file_size['5MB'],
		rules      : { required: true },
	},
];

export default controls;
