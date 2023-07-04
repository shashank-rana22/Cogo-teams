const permanent_controls = () => ([
	{
		name        : 'permanent_city',
		label       : 'City',
		type        : 'input',
		placeholder : 'City',
		rules       : { required: 'This is required' },
	},
	{
		name        : 'permanent_state',
		label       : 'State',
		type        : 'input',
		placeholder : 'State',
		rules       : { required: 'This is required' },
	},
	{
		name        : 'permanent_country',
		label       : 'Country',
		type        : 'input',
		placeholder : 'Country',
		rules       : { required: 'This is required' },
	},
	{
		name        : 'permanent_pincode',
		label       : 'Pincode',
		type        : 'number',
		placeholder : 'Pincode',
		rules       : { required: 'This is required' },
	},
	{
		name        : 'permanent_address',
		label       : 'Address',
		type        : 'textarea',
		placeholder : 'Address',
		rules       : { required: 'This is required' },
	},
]);

export default permanent_controls;
