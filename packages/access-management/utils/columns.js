export const columns = [
	{
		label: 'Role Description',
		key: 'name',
		func: 'renderRoleDescription',
		span: 2,
		topKey: { key: 'name' },
		lowerKey: { key: 'remarks' },
		tooltip: true,
	},
	{
		label: 'Role Type',
		key: 'role_type',
		func: 'renderRoleType',
		span: 2,
	},
	{
		label: 'Partner',
		key: 'partner.business_name',
		func: 'renderPartner',
		span: 1.5,
	},
	{
		label: 'Users',
		key: 'user_count',
		func: 'renderUserCount',
		span: 1.5,
	},
	{
		label: 'Level',
		key: 'hierarchy_level',
		func: 'renderHierarchyLevel',
		span: 1,
	},
	{
		label: 'Functions',
		key: 'role_functions',
		func: 'renderFunction',
		span: 1.5,
	},
	{
		label: 'Sub Functions',
		key: 'role_sub_functions',
		func: 'renderSubFunction',
		span: 1.5,
	},
	// {
	// 	label : 'Users',
	// 	key   : '',
	// 	func  : 'renderUsers',
	// 	span  : 3,
	// },
	{
		label: '',
		key: '',
		func: 'renderEditButton',
		span: 1,
	},
];
