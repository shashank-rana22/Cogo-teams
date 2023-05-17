const control = [
	{
		name        : 'remarks',
		type        : 'textarea',
		placeholder : 'Enter Details Here',
		label       : 'Details (Mandatory)',
		span        : 12,
		rules       : { required: 'Remarks is required' },
	},
	{
		label      : 'Upload File',
		name       : 'document_urls',
		span       : 12,
		type       : 'file',
		themeType  : 'secondary',
		drag       : true,
		uploadIcon : 'ic-upload',
		height     : 80,
		accept:
			'image/*,.pdf,.doc,.docx,.xlsx,application/msword,application/vnd.openxmlformats-officedocument.'
			+ 'wordprocessingml.document',
		uploadType : 'aws',
		multiple   : true,
		rules      : { required: 'This field is required' },
	},
];

export default control;
