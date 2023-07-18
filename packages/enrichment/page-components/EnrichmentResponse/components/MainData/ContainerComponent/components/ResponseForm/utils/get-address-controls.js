import { getCountrySpecificData } from '@cogoport/globalization/utils/CountrySpecificDetail';

const getAddressControls = ({ country_id, region_id }) => {
	const taxLabel = getCountrySpecificData({
		country_id,
		accessorType  : 'registration_number',
		accessor      : 'label',
		isDefaultData : true,
	});

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
			isClearable : true,
			rules       : {
				required: false,
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
			rules       : { required: false },
		},
		{
			name        : 'state',
			label       : 'State',
			labelKey    : 'display_name',
			valueKey    : 'name',
			placeholder : 'Select State...',
			type        : 'asyncSelect',
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
				required: false,
			},
		},

		{
			name        : 'pincode',
			label       : 'Pincode',
			type        : 'asyncSelect',
			labelKey    : 'display_name',
			valueKey    : 'postal_code',
			asyncKey    : 'list_locations',
			initialCall : false,
			placeholder : 'Select Pincode',
			params      : { filters: { type: ['pincode'], country_id, region_id } },
			rules       : {
				required: false,
			},
			show: true,
		},

		{
			name        : 'tax_number',
			label       : taxLabel,
			type        : 'text',
			placeholder : `Enter ${taxLabel}`,
			isClearable : true,
			rules       : {
				required : false,
				pattern  : {
					value   : taxPattern,
					message : `Please enter a valid ${taxLabel}`,
				},
			},
		},

	];

	return controls;
};

export default getAddressControls;
