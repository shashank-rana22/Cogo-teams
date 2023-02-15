const getFormFilters = () => {
	const currentDate = new Date();
	const year = currentDate.getFullYear();

	return [
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
		{
			name           : 'month',
			label          : 'Select Month',
			type           : 'select',
			defaultOptions : true,
			isClearable    : true,
			placeholder    : 'Month',
			options        : [
				{ label: 'January', value: 1 },
				{ label: 'February', value: 2 },
				{ label: 'March', value: 3 },
				{ label: 'April', value: 4 },
				{ label: 'May', value: 5 },
				{ label: 'June', value: 6 },
				{ label: 'July', value: 7 },
				{ label: 'August', value: 8 },
				{ label: 'September', value: 9 },
				{ label: 'October', value: 10 },
				{ label: 'November', value: 11 },
				{ label: 'December', value: 12 },
			],
			span: 6,
		},
		{
			name           : 'year',
			label          : 'Select Year',
			type           : 'select',
			defaultOptions : true,
			isClearable    : true,
			placeholder    : 'Year',
			value          : `${year}`,
			options        : [
				{ label: `${year}`, value: year },
				{ label: `${year - 1}`, value: year - 1 },
				{ label: `${year - 2}`, value: year - 2 },
			],
			span: 6,
		},
	];
};

export default getFormFilters;
