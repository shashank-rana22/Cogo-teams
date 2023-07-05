import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const controls = [
	{
		name      : 'resume',
		label     : 'Upload Resume*',
		type      : 'fileUpload',
		accept    : '.pdf',
		multiple  : false,
		draggable : true,
		rules     : { required: { value: true, message: 'This is required' } },
		maxSize   : GLOBAL_CONSTANTS.options.upload_file_size['5MB'],
	},
];

export default controls;
