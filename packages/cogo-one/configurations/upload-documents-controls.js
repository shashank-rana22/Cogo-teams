import PATTERNS from '@cogoport/constants/patterns';

const controls = {
	file: {
		name  : 'file',
		type  : 'file',
		rules : {
			required: 'This is required',
		},
	},
	registration_country: {
		name  : 'registration_country',
		type  : 'input',
		rules : {
			required: 'This is required',
		},
	},
	pan_number: {
		name  : 'pan_number',
		type  : 'input',
		rules : {
			required : 'This is required',
			pattern  : {
				value   : PATTERNS.PAN_NUMBER,
				message : 'Enter a valid PAN number',
			},
		},
	},
	preferred_languages: {
		name           : 'preferred_languages',
		type           : 'select',
		optionsListKey : 'languages',
		rules          : { required: 'This is required' },
	},
};
export default controls;
