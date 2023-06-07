const controls = [
	{
		name        : 'roles',
		label       : 'ROLES',
		placeholder : 'Select Role',
		type        : 'select',
		isClearable : true,
		options     : [
			{ value: 'software_development_engineer_1', label: 'Software Development Engineer - I' },
			{ value: 'business_analyst', label: 'Business Analyst' },
			{ value: 'product_analyst', label: 'Product Analyst' },
			{ value: 'business_consultant', label: 'Business Consultant' },
		],
		defaultOptions: true,
	},
	{
		name           : 'joining_date',
		label          : 'Joining Date',
		type           : 'date-picker',
		showTimeSelect : true,
	},
];

export default controls;
