const controls = [
	{
		name        : 'aadhaar_card_number',
		label       : 'Aadhaar Card Number',
		type        : 'number',
		placeholder : 'Aadhaar Card Number',
		rules       : { required: 'This is required' },
	},
	{
		name  : 'aadhaar_card',
		label : 'Upload Your Aadhaar Card',
		type  : 'fileUpload',
		rules : { required: 'This is required' },
	},
	{
		name        : 'pan_card_number',
		label       : 'Pan Card Number',
		type        : 'input',
		placeholder : 'Pan Card Number',
		rules       : { required: 'This is required' },
	},
	{
		name  : 'pan_card',
		label : 'Upload Your Pan Card',
		type  : 'fileUpload',
		rules : { required: 'This is required' },
	},
	{
		name        : 'passport_number',
		label       : 'Passport Number',
		type        : 'input',
		placeholder : 'Passport Number',
	},
	{
		name  : 'passport',
		label : 'Upload Your Passport',
		type  : 'fileUpload',
	},
	{
		name        : 'driving_license_number',
		label       : 'Driving License Number',
		type        : 'input',
		placeholder : 'Driving License Number',
	},
	{
		name  : 'driving_license',
		label : 'Upload Your Driving License',
		type  : 'fileUpload',
	},

];

export default controls;
