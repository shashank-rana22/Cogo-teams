const fieldArrayControls = [
	{
		name    : 'slab_unit',
		type    : 'select',
		options : [
			{
				value : 'month',
				label : 'in months',
			},
			{
				value : 'year',
				label : 'in years',
			},
		],
		rules: { required: 'This is required' },
	},
	{
		name     : 'slab_lower_limit',
		label    : 'Experience Level Slab From',
		type     : 'number',
		disabled : true,
	},
	{
		name  : 'slab_upper_limit',
		label : 'Experience Level Slab Upto',
		type  : 'number',
	},
];

export default fieldArrayControls;
