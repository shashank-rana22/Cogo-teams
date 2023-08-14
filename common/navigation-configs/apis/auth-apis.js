const authApis = {
	resourceApis: [
		{
			api          : 'create_resource',
			access_type  : 'private',
			service_name : 'auth',
		},
		{
			api          : 'update_resource',
			access_type  : 'private',
			service_name : 'auth',
		},
		{
			api          : 'list_resources',
			access_type  : 'private',
			service_name : 'auth',
		},
	],

	roleApis: [
		{
			api          : 'create_role',
			access_type  : 'private',
			service_name : 'auth',
		},
		{
			api          : 'list_resources',
			access_type  : 'private',
			service_name : 'auth',
		},
		{
			api          : 'get_possible_permissions',
			access_type  : 'private',
			service_name : 'auth',
		},
		{
			api          : 'get_role_active_navigations',
			access_type  : 'private',
			service_name : 'auth',
		},
		{
			api          : 'list_roles',
			access_type  : 'private',
			service_name : 'auth',
		},
		{
			api          : 'list_role_permissions',
			access_type  : 'private',
			service_name : 'auth',
		},
		{
			api          : 'list_partners',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'onboard_role',
			access_type  : 'private',
			service_name : 'auth',
		},
		{
			api          : 'update_role',
			access_type  : 'private',
			service_name : 'auth',
		},
		{
			api          : 'update_role_permission',
			access_type  : 'private',
			service_name : 'auth',
		},
	],
};

export default authApis;
