const conditions = {
	SEE_ALL_MARGINS: [
		{
			type          : 'viewscope',
			value         : 'across_all',
			in_api        : 'list_margins',
			in_navigation : 'margin',
		},
		{
			type          : 'viewscope',
			value         : 'all',
			in_api        : 'list_margins',
			in_navigation : 'margin',
		},
	],
	SEE_SALES_MARGIN: [
		{
			type            : 'viewtype',
			value           : 'sales_team_members_view',
			using_viewscope : 'team',
			in_api          : 'list_margins',
			in_navigation   : 'margin',
		},
		{
			type            : 'viewtype',
			value           : 'sales_agent_view',
			using_viewscope : 'self',
			in_api          : 'list_margins',
			in_navigation   : 'margin',
		},
	],
	SEE_SUPPLY_MARGIN: [
		{
			type            : 'viewtype',
			value           : 'supply_team_members_view',
			using_viewscope : 'team',
			in_api          : 'list_margins',
			in_navigation   : 'margin',
		},
		{
			type            : 'viewtype',
			value           : 'supply_agent_view',
			using_viewscope : 'self',
			in_api          : 'list_margins',
			in_navigation   : 'margin',
		},
	],
	EDIT_MARGIN: [
		{
			type  : 'api',
			value : 'update_checkout_margin',
		},
		{
			type  : 'scope',
			value : 'partner',
		},
	],
};
export default conditions;
