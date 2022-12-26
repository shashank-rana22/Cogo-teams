const rolesAndPermissions = {
	'/[partner_id]/list-roles': {
		navigation : 'roles_permissions',
		isMainNav  : true,
	},
	'/[partner_id]/edit-role/[role_id]': {
		navigation: 'roles_permissions',
	},
};

module.exports = rolesAndPermissions;
