export const escalateTicketsControls = [
	{
		name           : 'comment',
		controllerType : 'textarea',
		label          : 'Enter reason to escalate',
		placeholder    : 'Enter here...',
		rules          : { required: true },
	},
	{
		label          : 'Upload supporting document',
		name           : 'file_url',
		controllerType : 'uploader',
		showOptional   : false,
	},
];
