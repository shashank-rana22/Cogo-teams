const getStep1Controls = [
	{
		name       : 'url',
		showLabel  : false,
		span       : 12,
		type       : 'file',
		themeType  : 'secondary',
		drag       : true,
		uploadIcon : 'ic-upload',
		label      : '',
		accept:
'image/*,.pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
		uploadType : 'aws',
		rules      : { required: { value: true, message: 'Document is required' } },
		multiple   : true,
	},
];

export default getStep1Controls;
