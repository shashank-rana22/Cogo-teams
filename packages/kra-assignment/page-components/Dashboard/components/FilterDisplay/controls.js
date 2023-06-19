const controls = [
	{
		name        : 'employee_ids',
		label       : 'Employee',
		placeholder : 'Select',
		type        : 'asyncSelect',
		asyncKey    : 'list_employees',
		valueKey    : 'id',
		multiple    : true,
		params      : {
			filters: {
				status               : 'active',
				partner_entity_types : ['cogoport'],
			},
		},
	},
	{
		name        : 'role_ids',
		type        : 'asyncSelect',
		asyncKey    : 'list_roles',
		label       : 'Roles',
		placeholder : 'Select',
		// onChange    : (_, e) => {
		// 	setSelectedValue((pv) => ({
		// 		...pv,
		// 		role_ids: e,
		// 	}));
		// },
		params      : {
			filters: {
				status               : 'active',
				partner_entity_types : ['cogoport'],

			},
			page_limit: 100,
		},
	},
	{
		name        : 'tribe_id',
		type        : 'asyncSelect',
		asyncKey    : 'list_tribes',
		label       : 'Tribes',
		placeholder : 'Select',
		params      : {
			filters: {
				status               : 'active',
				partner_entity_types : ['cogoport'],

			},
			page_limit: 100,
		},
	},

	{
		name        : 'squad_id',
		type        : 'asyncSelect',
		asyncKey    : 'list_squads',
		label       : 'Squads',
		placeholder : 'Select',
		params      : {
			filters: {
				status               : 'active',
				partner_entity_types : ['cogoport'],

			},
			page_limit: 100,
		},
	},

	{
		name        : 'chapter_id',
		type        : 'asyncSelect',
		asyncKey    : 'list_chapters',
		label       : 'Chapters',
		placeholder : 'Select',
		params      : {
			filters: {
				status               : 'active',
				partner_entity_types : ['cogoport'],

			},
			page_limit: 100,
		},
	},

	{
		name        : 'sub_chapter_id',
		type        : 'asyncSelect',
		asyncKey    : 'list_sub_chapters',
		label       : 'Sub chapter',
		placeholder : 'Select',
		params      : {
			filters: {
				status               : 'active',
				partner_entity_types : ['cogoport'],

			},
			page_limit: 100,
		},
	},
];

export default controls;
