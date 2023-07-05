import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

export const billingAddressControlForSelf = [
	{
		label       : 'PAN Number',
		name        : 'panNumber',
		type        : 'text',
		placeholder : 'Enter PAN Number',
		showLabel   : false,
		span        : 3,
		disabled    : false,
		rules       : {
			pattern: {
				value   : GLOBAL_CONSTANTS.regex_patterns.pan_number,
				message : 'Enter a valid PAN',
			},
			required: { value: true, message: 'PAN Number is required' },
		},
	},
];
