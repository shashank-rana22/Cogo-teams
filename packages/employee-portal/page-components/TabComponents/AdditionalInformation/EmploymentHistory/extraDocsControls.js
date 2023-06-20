import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

export const extraDocsControls = [
	{
		name    : 'offer_letter',
		label   : 'Upload Previous Offer letter',
		type    : 'fileUpload',
		accept  : '.pdf',
		rules   : { required: 'Previous Offer letter is required' },
		maxSize : GLOBAL_CONSTANTS.options.upload_file_size['5MB'],

	},
	{
		name    : 'salary_slip',
		label   : 'Upload latest salary slip',
		type    : 'fileUpload',
		accept  : '.pdf',
		rules   : { required: 'Latest salary slip is required' },
		maxSize : GLOBAL_CONSTANTS.options.upload_file_size['5MB'],

	},
];
