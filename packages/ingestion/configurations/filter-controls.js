const filterControls = [
	{
		name    : 'scope',
		label   : 'Choose scope',
		options : [
			{
				label : 'All',
				value : 'all',
			},
			{
				label : 'Self',
				value : 'self',
			},
			{
				label : 'Team',
				value : 'team',
			},
			{
				label : 'Across all',
				value : 'across',
			},
		],
		type        : 'multiSelect',
		isClearable : true,
		placeholder : 'Choose scope',
		span        : 2.2,
	},
	// {
	// 	label       : 'Upload Date',
	// 	name        : 'uploadDate',
	// 	type        : 'singleDateRange',
	// 	placeholder : 'Upload Date',

	// },
	{
		name  : 'upload_by',
		label : 'Upload By',

		type        : 'select',
		isClearable : true,
		placeholder : 'Upload By',
		span        : 1.1,
	},
];

export default filterControls;
