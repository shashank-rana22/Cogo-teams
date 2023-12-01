const conditions = {
	SEE_AS_ENTITY_MANAGER: [
		{
			type  : 'viewtype',
			value : 'entity_manager_view',
		},
		{
			type  : 'viewtype',
			value : 'entity_manager_team_members_view',
		},
	],
	SEE_ALL_USERS: [
		{
			type   : 'viewscope',
			value  : 'across_all',
			in_api : 'list_partners',
		},
		{
			type  : 'viewscope',
			value : 'all',
		},
	],
};
export default conditions;
