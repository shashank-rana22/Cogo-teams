export const deptControls = [
	{
		name        : 'department',
		placeholder : 'Department...',
		label       : 'Department',
		type        : 'select',
		span        : 5,
		isClearable : true,
		options     : [
			{ label: 'Technology', value: 'technology' },
			{ label: 'Finance', value: 'finance' },
			{ label: 'Business', value: 'business' },
		],
		style : { marginLeft: '1px', marginRight: '1px' },
		rules : { required: 'Required' },
	},
	{
		name        : 'tech_role',
		placeholder : 'Role...',
		label       : 'Technology Role',
		type        : 'select',
		span        : 5,
		isClearable : true,
		options     : [
			{
				label : 'Associate Software Engineer',
				value : 'Associate Software Engineer',
			},
			{ label: 'Software Engineer', value: 'Software Engineer' },

			{ label: 'SDE 2', value: 'SDE 2' },
		],
		style : { marginLeft: '1px', marginRight: '1px' },
		rules : { required: 'Required' },
	},
	{
		name        : 'finance_role',
		placeholder : 'Role...',
		label       : 'Finance Role',
		type        : 'select',
		span        : 5,
		isClearable : true,
		options     : [
			{
				label : 'Finance 1',
				value : 'finance1',
			},
			{
				label : 'Finance 2',
				value : 'finance2',
			},
			{
				label : 'Finance 3',
				value : 'finance3',
			},
		],
		style : { marginLeft: '1px', marginRight: '1px' },
		rules : { required: 'Required' },
	},
	{
		name        : 'business_role',
		placeholder : 'Role...',
		label       : 'Business Role',
		type        : 'select',
		span        : 5,
		isClearable : true,
		options     : [
			{
				label : 'Business 1',
				value : 'business_1',
			},
			{
				label : 'Business 2',
				value : 'business_2',
			},
			{
				label : 'Business 3',
				value : 'business_3',
			},
		],
		style : { marginLeft: '1px', marginRight: '1px' },
		rules : { required: 'Required' },
	},
];
