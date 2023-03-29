const countryOptions = [
	{
		label : 'Private Limited Company',
		value : 'private_limited',
	},
	{
		label : 'Public Limited Company',
		value : 'public_limited',
	},
	{
		label : 'Partnership',
		value : 'partnership',
	},
	{
		label : 'Proprietorship',
		value : 'proprietorship',
	},
	{
		label : 'Limited Liability Partnership',
		value : 'limited_liability_partnership',
	},
];

const controls = () => {
	const formControl = [
		{
			name     : 'country_id',
			label    : 'Country',
			type     : 'async-select',
			asyncKey : 'list_locations',
			params   : {
				filters: { type: ['country'] },
			},
			placeholder : 'Select Country',
			rules       : { required: { value: true, message: 'Country is required' } },
		},
		{
			name        : 'registration_number',
			label       : 'PAN Number',
			type        : 'input',
			placeholder : 'Enter PAN Number',
			rules       : { required: 'PAN Number is required' },
		},
		{
			name        : 'business_name',
			label       : 'Business Name',
			type        : 'input',
			placeholder : 'Enter Business Name here',
			rules       : { required: 'Business Name is required' },
		},
		{
			name        : 'company_type',
			label       : 'Type of Company',
			type        : 'select',
			placeholder : 'Select Type of Company',
			options     : countryOptions,
			rules       : { required: 'Type of Company is required' },
		},
		{
			name  : 'verification_document',
			label : 'Trade Party Verification document',
			type  : 'file',
		},
	];

	return { formControl };
};

export default controls;
