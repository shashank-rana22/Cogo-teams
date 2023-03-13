import PATTERNS from '@cogoport/constants/patterns';

const controls = {
	utility_bill_document_url: {
		name   : 'utility_bill_document_url',
		type   : 'file',
		accept : 'image/*,.pdf,.doc,.docx',
		rules  : {
			required: 'Business address Proof is required',
		},
	},
	country_id: {
		name           : 'country_id',
		type           : 'select',
		optionsListKey : 'countries',
		rules          : {
			required: 'Registration country is required',
		},
	},
	pan_number: {
		name  : 'pan_number',
		type  : 'input',
		rules : {
			required : 'Pan Number is required',
			pattern  : {
				value   : PATTERNS.PAN_NUMBER,
				message : 'Enter a valid PAN number',
			},
		},
	},
	preferred_languages: {
		name           : 'Preferred languages is required',
		type           : 'select',
		optionsListKey : 'languages',
		rules          : { required: 'This is required' },
	},
};

export default controls;
