const filterControls = [

	{
		name                  : 'upload_date',
		type                  : 'singleDateRange',
		placeholder           : 'Upload Date',
		// span                  : 1.8,
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
		// span           : 2.4,
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
