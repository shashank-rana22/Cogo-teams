import formValuePatterns from '@cogoport/ocean-modules/utils/formValuePatterns';

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
				value   : formValuePatterns.PAN_NUMBER,
				message : 'Enter a valid PAN',
			},
			required: { value: true, message: 'PAN Number is required' },
		},
	},
];
