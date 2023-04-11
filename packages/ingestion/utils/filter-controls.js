const PARTNER_OPTIONS = [
	{ label: 'Cogoport India', value: 'indiaId' },
	{ label: 'Cogoport Vietnam', value: 'vietnamId' },
];

const filterControls = [

	{
		name                  : 'upload_date',
		type                  : 'singleDateRange',
		placeholder           : 'Upload Date',
		isPreviousDaysAllowed : true,
	},
	{
		name           : 'partner_user_id',
		type           : 'asyncSelect',
		asyncKey       : 'partner_users',
		valueKey       : 'id',
		isClearable    : true,
		defaultOptions : false,
		initialCall    : false,
		placeholder    : 'Upload By',
		params         : {
			filters: {
				status               : 'active',
				partner_entity_types : ['cogoport'],
			},
			page_limit: 100,
		},
	},
	{
		name        : 'reporting_manager_id',
		type        : 'select',
		// asyncKey       : 'partner_users',
		// valueKey       : 'id',
		isClearable : true,
		// defaultOptions : false,
		placeholder : 'Scope',
		options     : PARTNER_OPTIONS,

		// params         : {
		// 	filters: {
		// 		status               : 'active',
		// 		partner_entity_types : ['cogoport'],
		// 	},
		// 	page_limit: 100,
		// },
	},

];

export default filterControls;
