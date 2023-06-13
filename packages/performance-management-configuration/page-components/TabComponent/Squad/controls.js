const controls = [
	{
		name     : 'country_id',
		label    : 'Country',
		type     : 'asyncSelect',
		asyncKey : 'list_locations',
		params   : {
			filters: { type: ['country'] },
		},
		placeholder : 'Select Country',
		rules       : { required: { value: true, message: 'Country is required' } },
	},
	{
		name        : 'squad_name',
		label       : 'Squad Name',
		type        : 'input',
		placeholder : 'Enter squad name',
	},
	{
		name        : 'hrbp_id',
		type        : 'asyncSelect',
		asyncKey    : 'partner_users_ids',
		valueKey    : 'user_id',
		label       : 'HRBP',
		placeholder : 'HRBP',
		rules       : {
			required: 'HRBP is required',
		},
		params: {
			filters: {
				status               : 'active',
				partner_entity_types : ['cogoport'],

			},
			page_limit: 100,
		},
	},
	// {
	// 	name        : 'stakeholder_id',
	// 	label       : 'Stakeholder Name',
	// 	placeholder : 'Select StakeHolder',
	// 	type        : 'asyncSelect',
	// 	initialCall : true,
	// 	asyncKey    : 'partner_users',
	// 	valueKey    : 'user_id',
	// 	rules       : {
	// 		required: true,
	// 	},
	// 	params: {
	// 		filters: {
	// 			partner_entity_types : ['cogoport'],
	// 			// role_ids             : stakeholderDetail.role_ids,
	// 		},
	// 	},
	// },
	// {
	// 	name        : 'squad_leader_id',
	// 	label       : 'Squad leader',
	// 	placeholder : 'Select Squad leader',
	// 	type        : 'asyncSelect',
	// 	multiple    : true,
	// 	initialCall : false,
	// 	asyncKey    : 'partner_users',
	// 	valueKey    : 'user_id',
	// 	rules       : {
	// 		required: 'Squad leader is required',
	// 	},
	// 	params: {
	// 		filters: {
	// 			partner_entity_types: ['cogoport'],
	// 		},
	// 	},
	// },
	{
		name        : 'user_ids',
		label       : 'Users',
		placeholder : 'Select Users',
		type        : 'asyncSelect',
		multiple    : true,
		asyncKey    : 'partner_users',
		initialCall : false,
		disabled    : true,
		valueKey    : 'user_id',
		isClearable : true,
	},
	{
		name        : 'employee_ids',
		type        : 'asyncSelect',
		asyncKey    : 'partner_users_ids',
		label       : 'Employees',
		placeholder : 'Employees',
		multiple    : true,
		rules       : {
			required: 'Employees are required',
		},
		params: {
			filters: {
				status               : 'active',
				partner_entity_types : ['cogoport'],

			},
			page_limit: 100,
		},
	},

];

export default controls;
