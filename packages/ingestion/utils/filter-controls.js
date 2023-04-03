const filterControls = [
	// {
	// 	name    : 'scope',
	// 	// label   : 'Choose scope',
	// 	options : [
	// 		{
	// 			label : 'All',
	// 			value : 'all',
	// 		},
	// 		{
	// 			label : 'Self',
	// 			value : 'self',
	// 		},
	// 		{
	// 			label : 'Team',
	// 			value : 'team',
	// 		},
	// 		{
	// 			label : 'Across all',
	// 			value : 'across',
	// 		},
	// 	],
	// 	type        : 'multiSelect',
	// 	isClearable : true,
	// 	placeholder : 'Choose scope',
	// 	span        : 2.1,
	// 	style       : { margin: '0 8px 0 0' },
	// },
	{
		// label       : 'Upload Date',
		name                  : 'upload_date',
		type                  : 'singleDateRange',
		placeholder           : 'Upload Date',
		span                  : 2.0,
		isPreviousDaysAllowed : true,
		style                 : { margin: '0 8px 0 0' },
	},
	// {
	// 	name: 'upload_by',
	// 	// label : 'Upload By',

	// 	type        : 'select',
	// 	isClearable : true,
	// 	placeholder : 'Upload By',
	// 	span        : 2.4,
	// 	style       : { margin: '0 8px 0 0' },
	// },
	{
		name: 'partner_user_id',
		// label : 'Upload By',

		type           : 'asyncSelect',
		asyncKey       : 'partner_users',
		valueKey       : 'id',
		isClearable    : true,
		defaultOptions : false,
		initialCall    : false,
		placeholder    : 'Upload By',
		span           : 2.4,
		// style          : { margin: '0 8px 0 0' },
		params         : {
			filters: {
				status               : 'active',
				partner_entity_types : ['cogoport'],
			},
			page_limit: 100,
		},
	},

];

export default filterControls;
