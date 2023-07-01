const controls = () => ([
	{
		name        : 'current_city',
		label       : 'City',
		type        : 'input',
		placeholder : 'City',
		rules       : { required: 'This is required' },
	},
	{
		name        : 'current_state',
		label       : 'State',
		type        : 'input',
		placeholder : 'State',
		rules       : { required: 'This is required' },
	},
	{
		name        : 'current_country',
		label       : 'Country',
		type        : 'input',
		placeholder : 'Country',
		rules       : { required: 'This is required' },
	},
	{
		name        : 'current_pincode',
		label       : 'Pincode',
		type        : 'number',
		placeholder : 'City',
		rules       : { required: 'This is required' },
	},
	{
		name        : 'current_address',
		label       : 'Address',
		type        : 'textarea',
		placeholder : 'Address',
		rules       : { required: 'This is required' },
	},
]);

export default controls;
