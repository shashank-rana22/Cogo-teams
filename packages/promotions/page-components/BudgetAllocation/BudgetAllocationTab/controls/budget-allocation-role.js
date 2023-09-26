const RoleOptions = [
	{
		name           : 'role',
		placeholder    : 'Search Role Name',
		type           : 'async_select',
		asyncKey       : 'partner_roles',
		initialCall    : false,
		span           : 10,
		labelKey       : 'name',
		valueKey       : 'id',
		theme          : 'admin',
		defaultOptions : false,
	},
];
export default RoleOptions;
