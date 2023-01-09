const roles_permissions = [
	{
		api          : 'create_auth_role',
		access_type  : 'private',
		service_name : 'auth',
	},
	{
		api          : 'list_partners',
		access_type  : 'private',
		service_name : 'partner',
	},
	{
		api          : 'get_auth_possible_permissions',
		access_type  : 'private',
		service_name : 'auth',
	},
	{
		api          : 'list_auth_roles',
		access_type  : 'private',
		service_name : 'auth',
	},
	{
		api          : 'onboard_auth_role',
		access_type  : 'private',
		service_name : 'auth',
	},
	{
		api          : 'update_auth_role',
		access_type  : 'private',
		service_name : 'auth',
	},
	{
		api          : 'update_auth_role_permission_mapping',
		access_type  : 'private',
		service_name : 'auth',
	},
];

export default roles_permissions;
