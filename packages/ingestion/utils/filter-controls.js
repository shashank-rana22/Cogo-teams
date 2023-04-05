const filterControls = [

	{
		name                  : 'upload_date',
		type                  : 'singleDateRange',
		placeholder           : 'Upload Date',
		span                  : 2.0,
		isPreviousDaysAllowed : true,
		style                 : { margin: '0 4px 0 0' },
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
		span           : 2.4,
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
