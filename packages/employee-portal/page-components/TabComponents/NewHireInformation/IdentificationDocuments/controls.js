const controls = [
	{
		name             : 'aadhaar_card_number',
		label            : 'Aadhaar Card Number',
		type             : 'number',
		placeholder      : 'Aadhaar Card Number',
		rules            : { required: 'This is required' },
		verification_key : 'aadhaar_card',
	},

	{
		name             : 'aadhaar_card',
		label            : 'Upload Your Aadhaar Card',
		type             : 'fileUpload',
		accept           : '.pdf',
		rules            : { required: 'This is required' },
		verification_key : 'aadhaar_card',

	},

	{
		name             : 'pan_card_number',
		label            : 'Pan Card Number',
		type             : 'input',
		placeholder      : 'Pan Card Number',
		rules            : { required: 'This is required' },
		verification_key : 'pan_card',
	},

	{
		name             : 'pan_card',
		label            : 'Upload Your Pan Card',
		type             : 'fileUpload',
		accept           : '.pdf',
		rules            : { required: 'This is required' },
		verification_key : 'pan_card',

	},

	{
		name             : 'passport_number',
		label            : 'Passport Number',
		type             : 'input',
		placeholder      : 'Passport Number',
		verification_key : 'passport',
	},

	{
		name             : 'passport',
		label            : 'Upload Your Passport',
		accept           : '.pdf',
		type             : 'fileUpload',
		verification_key : 'passport',

	},

	{
		name             : 'driving_license_number',
		label            : 'Driving License Number',
		type             : 'input',
		placeholder      : 'Driving License Number',
		verification_key : 'driving_license',
	},

	{
		name             : 'driving_license',
		label            : 'Upload Your Driving License',
		accept           : '.pdf',
		type             : 'fileUpload',
		verification_key : 'driving_license',
	},

];

export default controls;
