import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const controls = [
	{
		name        : 'aadhaar_card_number',
		label       : 'Aadhaar Card Number*',
		type        : 'number',
		placeholder : 'Aadhaar Card Number',
		rules       : {
			required : 'This is required',
			pattern  : {
				value   : GLOBAL_CONSTANTS.regex_patterns?.aadhar_number,
				message : 'Enter valid Adhar card number',
			},
		},
		verification_key: 'aadhaar_card',
	},
	{
		name             : 'aadhaar_card',
		label            : 'Upload Your Aadhaar Card*',
		type             : 'fileUpload',
		maxSize          : GLOBAL_CONSTANTS.options.upload_file_size['5MB'],
		accept           : '.pdf',
		rules            : { required: 'This is required' },
		verification_key : 'aadhaar_card',
	},
	{
		name        : 'pan_card_number',
		label       : 'Pan Card Number*',
		type        : 'input',
		placeholder : 'Pan Card Number',
		rules       : {
			required : 'This is required',
			pattern  : {
				value   : GLOBAL_CONSTANTS.regex_patterns?.pan_number,
				message : 'Enter valid Pan card number',
			},
		},
		verification_key: 'pan_card',
	},
	{
		name             : 'pan_card',
		label            : 'Upload Your Pan Card*',
		type             : 'fileUpload',
		accept           : '.pdf',
		maxSize          : GLOBAL_CONSTANTS.options.upload_file_size['5MB'],
		rules            : { required: 'This is required' },
		verification_key : 'pan_card',
	},
	{
		name        : 'passport_number',
		label       : 'Passport Number',
		type        : 'input',
		placeholder : 'Passport Number',
		rules       : {
			pattern: {
				value   : GLOBAL_CONSTANTS.regex_patterns?.passport_number,
				message : 'Enter valid Passport number',
			},
		},
		verification_key: 'passport',
	},
	{
		name             : 'passport',
		label            : 'Upload Your Passport',
		accept           : '.pdf',
		type             : 'fileUpload',
		maxSize          : GLOBAL_CONSTANTS.options.upload_file_size['5MB'],
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
		maxSize          : GLOBAL_CONSTANTS.options.upload_file_size['5MB'],

	},
];

export default controls;
