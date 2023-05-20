const controls = [
	{
		name  : 'aadhaar_card',
		label : 'Upload Your Aadhaar Card',
		type  : 'fileUpload',
		rules : { required: 'This is required' },
	},
	{
		name  : 'pan_card',
		label : 'Upload Your Pan Card',
		type  : 'fileUpload',
		rules : { required: 'This is required' },
	},
	{
		name  : 'passport',
		label : 'Upload Your Passport',
		type  : 'fileUpload',
	},
	{
		name  : 'resume',
		label : 'Upload Resume',
		type  : 'fileUpload',
	},

];

export default controls;
