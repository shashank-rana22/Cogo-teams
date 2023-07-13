import { getCountrySpecificData } from '@cogoport/globalization/utils/CountrySpecificDetail';

const getControls = ({ country_id, region_id }) => {
	const taxLabel = getCountrySpecificData({
		country_id,
		accessorType  : 'registration_number',
		accessor      : 'label',
		isDefaultData : false,
	}) || 'GST';

	const taxPattern = getCountrySpecificData({
		country_id,
		accessorType  : 'registration_number',
		accessor      : 'pattern',
		isDefaultData : false,
	});

	const controls = [
		{
			name        : 'address',
			label       : 'Full Address',
			placeholder : 'Type here...',
			type        : 'text',
			style       : { flexBasis: '86%' },
			isClearable : true,
			rules       : {
				required: 'Full Address is required',
			},
		},
		{
			name     : 'country',
			label    : 'Country',
			labelKey : 'display_name',
			type     : 'asyncSelect',
			style    : { flexBasis: '42%' },
			valueKey : 'name',
			asyncKey : 'list_locations',
			params   : {
				filters: { type: ['country'] },
			},
			placeholder : 'Select Country',
			rules       : { required: { value: true, message: 'Country is required' } },
		},
		{
			name        : 'state',
			label       : 'State',
			labelKey    : 'display_name',
			valueKey    : 'name',
			placeholder : 'Select State...',
			type        : 'asyncSelect',
			style       : { flexBasis: '42%' },
			params      : { filters: { type: ['region'], country_id } },
			asyncKey    : 'list_locations',
			isClearable : true,
			rules       : {
				required: false,
			},
		},

		{
			name        : 'city',
			label       : 'City',
			type        : 'asyncSelect',
			style       : { flexBasis: '42%' },
			labelKey    : 'display_name',
			valueKey    : 'name',
			asyncKey    : 'list_locations',
			placeholder : 'Select City',
			params      : {
				filters: {
					type: ['city'], country_id, region_id,
				},
			},
			multiple    : false,
			isClearable : true,
			rules       : {
				required: 'City is required',
			},
		},

		{
			type        : 'asyncSelect',
			style       : { flexBasis: '42%' },
			name        : 'pincode',
			label       : 'Pincode',
			labelKey    : 'postal_code',
			valueKey    : 'postal_code',
			asyncKey    : 'list_locations',
			initialCall : false,
			placeholder : 'Select Pincode',
			params      : { filters: { type: ['pincode'], country_id, region_id } },
			rules       : {
				required: { value: true, message: 'Pincode is required' },
			},
			show: true,
		},

		{
			name        : 'tax_number',
			label       : taxLabel,
			type        : 'text',
			style       : { flexBasis: '42%' },
			placeholder : `Enter ${taxLabel}`,
			isClearable : true,
			rules       : {
				pattern: {
					value   : taxPattern,
					message : `Please enter a valid ${taxLabel}`,
				},
			},
		},

	];

	return controls;
};

export default getControls;
