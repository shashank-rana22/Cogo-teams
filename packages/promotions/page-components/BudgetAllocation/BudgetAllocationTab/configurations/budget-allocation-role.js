const RoleOptions = [
	{
		name        : 'role',
		placeholder : 'Search Role Name',
		type        : 'async_select',
		asyncKey    : 'partner_roles',
		initialCall : true,
		span        : 10,
		labelKey    : 'name',
		valueKey    : 'id',
		theme       : 'admin',
	},
];
export default RoleOptions;
