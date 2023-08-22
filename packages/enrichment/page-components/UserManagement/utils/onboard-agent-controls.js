import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const controls = [
	{
		name        : 'name',
		label       : 'Name',
		type        : 'text',
		placeholder : 'Enter name',
		rules       : {
			required: true,
		},

	},
	{
		name        : 'email',
		label       : 'Email ID',
		type        : 'text',
		placeholder : 'Enter email',
		rules       : {
			required : true,
			pattern  : {
				value   : GLOBAL_CONSTANTS.regex_patterns.email,
				message : 'Email is invalid',
			},
		},

	},
	{
		name        : 'mobile_number',
		label       : 'Mobile Number',
		type        : 'mobile-number-select',
		placeholder : 'Type here...',
		rules       : {
			required: true,
		},

	},

];

export default controls;
