const controls = [
	{
		name        : 'squad_name',
		label       : 'Squad Name',
		type        : 'input',
		placeholder : 'Enter squad name',
	},
	{
		name        : 'squad_leader_id',
		label       : 'Squad leader',
		placeholder : 'Select Squad leader',
		type        : 'asyncSelect',
		// initialCall : false,
		asyncKey    : 'partner_users',
		valueKey    : 'user_id',
		rules       : {
			required: 'Squad leader is required',
		},
		params: {
			filters: {
				status               : 'active',
				partner_entity_types : ['cogoport'],
			},
		},
	},
	{
		name        : 'employee_ids',
		type        : 'asyncSelect',
		asyncKey    : 'list_employees',
		label       : 'Employees',
		placeholder : 'Employees',
		multiple    : true,
		rules       : {
			required: 'Employees are required',
		},
		params: {
			filters: {
				status: 'active',

			},
			page_limit: 100,
		},
	},
];

export default controls;
