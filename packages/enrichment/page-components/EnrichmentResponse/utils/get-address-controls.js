const getAddressControls = ({ responseData = {} }) => {
	const { country = {}, state = {}, city = {} } = responseData;

	const controls = [

		{
			name     : 'country_id',
			label    : 'Country',
			labelKey : 'display_name',
			type     : 'asyncSelect',
			asyncKey : 'list_locations',
			params   : {
				filters: { type: ['country'] },
			},
			placeholder : 'Select Country',
			rules       : { required: false },
		},
		{
			name        : 'state_id',
			label       : 'State',
			labelKey    : 'display_name',
			placeholder : 'Select State...',
			type        : 'asyncSelect',
			params      : { filters: { type: ['region'], country_id: country?.id } },
			asyncKey    : 'list_locations',
			isClearable : true,
			rules       : {
				required: false,
			},
		},

		{
			name        : 'city_id',
			label       : 'City',
			type        : 'asyncSelect',
			labelKey    : 'display_name',
			asyncKey    : 'list_locations',
			placeholder : 'Select City',
			params      : {
				filters: {
					type: ['city'], country_id: country?.id, region_id: state?.id,
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
			params      : {
				filters: {
					type       : ['pincode'],
					country_id : country?.id,
					region_id  : state?.id,
					city_id    : city?.id,
				},
			},
			rules: {
				required: false,
			},
			show: true,
		},

		{
			name        : 'address',
			label       : 'Address',
			type        : 'text',
			isClearable : true,
			rules       : {
				required: false,
			},
		},

		{
			name        : 'tax_number',
			label       : 'VAT or GST',
			type        : 'text',
			isClearable : true,
			rules       : {
				required: false,
			},
		},

	];

	return controls;
};

export default getAddressControls;
