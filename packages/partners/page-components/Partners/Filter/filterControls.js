const getFilterControls = () => {
	const filterControls = [
		{
			name        : 'role_ids',
			type        : 'async_select',
			multiple    : true,
			asyncKey    : 'partner_roles',
			placeholder : 'Roles',
			span        : 12,
			params      : {
				permissions_data_required: false,
			},
		},
		{
			name          : 'entity_manager_id',
			type          : 'async_select',
			multiple      : true,
			asyncKey      : 'partner_users',
			placeholder   : 'Relationship Manager',
			span          : 12,
			finalValueKey : 'user_id',
		},
	];
	return (filterControls);
};
export default getFilterControls;
