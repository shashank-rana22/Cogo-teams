const controls = [
	{
		name        : 'sub_chapter_name',
		label       : 'Sub-Chapter Name',
		type        : 'input',
		placeholder : 'Enter subchapter name',
	},
	{
		name        : 'sub_chapter_leader_id',
		label       : 'Sub-Chapter leader',
		placeholder : 'Select sub-chapter leader',
		type        : 'asyncSelect',
		initialCall : false,
		asyncKey    : 'partner_users',
		valueKey    : 'user_id',
		rules       : {
			required: 'Sub-chapter leader is required',
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
				status               : 'active',
				partner_entity_types : ['cogoport'],
			},
			page_limit: 100,
		},
	},
];

export default controls;
