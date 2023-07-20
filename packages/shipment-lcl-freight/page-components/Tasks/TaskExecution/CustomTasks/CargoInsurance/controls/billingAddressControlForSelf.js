import getGeoConstants from '@cogoport/globalization/constants/geo';

const geo = getGeoConstants();

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
				value   : geo?.regex.PAN,
				message : 'Enter a valid PAN',
			},
			required: { value: true, message: 'PAN Number is required' },
		},
	},
];
