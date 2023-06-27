import formValuePatterns from '@cogoport/ocean-modules/utils/formValuePatterns';

export const bilingAddressControlForSelf = [
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
				value   : formValuePatterns.PAN_NUMBER,
				message : 'Enter a valid PAN',
			},
			required: 'PAN Number is required',
		},
	},
];
