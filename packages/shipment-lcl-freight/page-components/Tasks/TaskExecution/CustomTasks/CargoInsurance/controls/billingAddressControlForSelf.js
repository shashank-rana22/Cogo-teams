import getGeoConstants from '@cogoport/globalization/constants/geo';

export const billingAddressControlForSelf = () => {
	const geo = getGeoConstants();

	const controls = [
		{
			label       : `${geo.others.identification_number.label} Number`,
			name        : 'panNumber',
			type        : 'text',
			placeholder : `Enter ${geo.others.identification_number.label} Number`,
			showLabel   : false,
			span        : 3,
			disabled    : false,
			rules       : {
				pattern: {
					value   : geo.others.identification_number.pattern,
					message : `Enter a valid ${geo.others.identification_number.label}`,
				},
				required: { value: true, message: `${geo.others.identification_number.label} Number is required` },
			},
		},
	];
	return controls;
};
