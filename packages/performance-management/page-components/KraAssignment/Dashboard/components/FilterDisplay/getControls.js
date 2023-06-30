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

			disabled    : !watchTriveId || check,
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
		// {
		// 	name        : 'chapter_id',
		// 	type        : 'asyncSelect',
		// 	asyncKey    : 'list_chapters',
		// 	label       : 'Chapters',
		// disabled    : !WATCH_VALUES.squad_id || check,
		// 	placeholder : 'Select',
		// isClearable : true,
		// initialCall : true,
		// 	params      : {
		// 		filters: {
		// 			status               : 'active',
		// 			partner_entity_types : ['cogoport'],
		// squad_id             : WATCH_VALUES.squad_id,

		// 		},
		// 		page_limit: 100,
		// 	},
		// },

		// {
		// 	name        : 'sub_chapter_id',
		// 	type        : 'asyncSelect',
		// 	asyncKey    : 'list_sub_chapters',
		// 	label       : 'Sub chapter',
		// disabled    : !WATCH_VALUES.chapter_id || check,
		// 	placeholder : 'Select',
		// isClearable : true,
		// initialCall : true,
		// 	params      : {
		// 		filters: {
		// 			status               : 'active',
		// 			partner_entity_types : ['cogoport'],
		// chapter_id             : WATCH_VALUES.chapter_id,
		// 		},
		// 		page_limit: 100,
		// 	},
		// },
	];

	return controls;
};

export default getControls;
