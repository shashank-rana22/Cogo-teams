const getControls = ({ watchTriveId, check }) => {
	const controls = [
		{
			name        : 'employee_ids',
			label       : 'Employee',
			placeholder : 'Select',
			type        : 'asyncSelect',
			asyncKey    : 'list_employees',
			valueKey    : 'id',
			initialCall : true,
			disabled    : check,
			multiple    : true,
			isClearable : true,
			params      : {
				filters: {
					status               : 'active',
					partner_entity_types : ['cogoport'],
				},
				page_limit: 100,
			},
		},

		{
			name        : 'role_ids',
			type        : 'asyncSelect',
			asyncKey    : 'list_roles',
			label       : 'Roles',
			placeholder : 'Select',
			disabled    : check,
			isClearable : true,
			initialCall : true,
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
			initialCall : true,
			isClearable : true,
			disabled    : check,
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
			initialCall : true,

			disabled    : check,
			isClearable : true,
			params      : {
				filters: {
					status               : 'active',
					partner_entity_types : ['cogoport'],
					tribe_id             : watchTriveId,
				},
				page_limit: 100,
			},
		},
	];

	return controls;
};

export default getControls;
