import getGeoConstants from '@cogoport/globalization/constants/geo';

export const billingAddressControlForSelf = () => {
	const geo = getGeoConstants();

	const constrols = [
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
	return constrols;
};
