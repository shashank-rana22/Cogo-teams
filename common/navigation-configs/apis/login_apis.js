const login_apis = [
	{
		api          : 'login_user',
		access_type  : 'private',
		service_name : 'user',
	},
	{
		api          : 'get_user_session',
		access_type  : 'private',
		service_name : 'user',
	},
	{
		api          : 'get_user_session_mappings',
		access_type  : 'private',
		service_name : 'user',
	},
	{
		api          : 'update_parent_and_child_user_session_mappings',
		access_type  : 'private',
		service_name : 'user',
	},
];
export default login_apis;
