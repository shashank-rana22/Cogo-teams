const RoleControls = [
	{
		name           : 'role',
		placeholder    : 'Search Role Name',
		type           : 'async_select',
		asyncKey       : 'partner_roles',
		initialCall    : false,
		span           : 12,
		labelKey       : 'name',
		valueKey       : 'id',
		theme          : 'admin',
		defaultOptions : false,
		isClearable    : true,
	},
];
export default RoleControls;
