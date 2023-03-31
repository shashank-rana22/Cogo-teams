const filterControls = [
	{
		name    : 'scope',
		// label   : 'Choose scope',
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
		span        : 2.1,
	},
	{
		// label       : 'Upload Date',
		name                  : 'upload_date',
		type                  : 'singleDateRange',
		placeholder           : 'Upload Date',
		span                  : 1.8,
		isPreviousDaysAllowed : true,

	},
	{
		name: 'upload_by',
		// label : 'Upload By',

		type        : 'select',
		isClearable : true,
		placeholder : 'Upload By',
		span        : 2.4,
	},

];

export default filterControls;
