export const columns = [
	{
		label    : 'Role Description',
		key      : 'name',
		func     : 'renderRoleDescription',
		flex     : 2.5,
		topKey   : { key: 'name' },
		lowerKey : { key: 'remarks' },
		tooltip  : true,
	},
	{
		label : 'Role Type',
		key   : 'role_type',
		func  : 'renderRoleType',
		flex  : 1,
	},
	{
		label : 'Partner',
		key   : 'partner.business_name',
		func  : 'renderPartner',
		flex  : 2,
	},
	{
		label : 'Users',
		key   : 'user_count',
		func  : 'renderUserCount',
		flex  : 0.5,
	},
	{
		label : 'Level',
		key   : 'hierarchy_level',
		func  : 'renderHierarchyLevel',
		flex  : 1.5,
	},
	{
		label : 'Functions',
		key   : 'role_functions',
		func  : 'renderFunction',
		flex  : 1.5,
	},
	{
		label : 'Sub Functions',
		key   : 'role_sub_functions',
		func  : 'renderSubFunction',
		flex  : 1.5,
	},
	// {
	// 	label : 'Users',
	// 	key   : '',
	// 	func  : 'renderUsers',
	// 	flex  : 3,
	// },
	{
		label : '',
		key   : '',
		func  : 'renderEditButton',
		flex  : 1,
	},
];
