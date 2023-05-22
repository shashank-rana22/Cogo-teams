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
		name  : 'driving_license',
		label : 'Upload Your Driving License',
		type  : 'fileUpload',
	},

];

export default controls;
