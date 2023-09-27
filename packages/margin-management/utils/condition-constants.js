const conditions = {
	SEE_ALL_MARGINS: [
		{
			type          : 'viewscope',
			value         : 'all',
			in_api        : 'list_margins',
			in_navigation : 'margin',
		},
		{
			type          : 'viewscope',
			value         : 'across_all',
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
	ADD_CHANNEL_PARTNER_MARGIN: [
		{
			type            : 'viewtype',
			value           : 'entity_manager_view',
			using_viewscope : 'channel_partner',
			in_api          : 'list_margins',
			in_navigation   : 'margin',
		},
		{
			type            : 'viewtype',
			value           : 'entity_manager_team_members_view',
			using_viewscope : 'channel_partner_team',
			in_api          : 'list_margins',
			in_navigation   : 'margin',
		},
	],
	SEE_PENDING_APPROVAL: [
		{
			type          : 'viewscope',
			value         : 'all',
			in_api        : 'list_margins',
			in_navigation : 'margin',
		},
		{
			type          : 'viewscope',
			value         : 'across_all',
			in_api        : 'list_margins',
			in_navigation : 'margin',
		},
		{
			type            : 'viewtype',
			value           : 'sales_team_members_view',
			using_viewscope : 'team',
			in_api          : 'list_margins',
			in_navigation   : 'margin',
		},
		{
			type            : 'viewtype',
			value           : 'supply_team_members_view',
			using_viewscope : 'team',
			in_api          : 'list_margins',
			in_navigation   : 'margin',
		},
	],
};
export default conditions;
