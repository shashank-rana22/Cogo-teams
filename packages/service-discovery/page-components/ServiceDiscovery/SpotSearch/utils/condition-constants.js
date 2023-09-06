const conditions = {
	SHOW_SHIPMENT_STATS: [
		{
			type   : 'viewscope',
			value  : 'across_all',
			in_api : 'list_shipments',
		},
		{
			type   : 'viewscope',
			value  : 'all',
			in_api : 'list_shipments',
		},
		{
			type            : 'viewtype',
			value           : 'booking_team_members_view',
			using_viewscope : 'team',
			in_api          : 'list_shipments',
		},
	],
	SHOW_REJECT: [
		{
			type  : 'api',
			value : 'update_organization_trade_requirement_draft',
		},
	],
	SHOW_ALL_SPOT_BOOKING: [
		{
			type   : 'viewscope',
			value  : 'across_all',
			in_api : 'list_spot_searches',
		},
		{
			type   : 'viewscope',
			value  : 'all',
			in_api : 'list_spot_searches',
		},
		{
			type   : 'viewscope',
			value  : 'across_all',
			in_api : 'list_shipments',
		},
		{
			type   : 'viewscope',
			value  : 'all',
			in_api : 'list_shipments',
		},
	],
	SHOW_SUPPLY_TEAM_VIEW: [
		{
			type            : 'viewtype',
			value           : 'supply_team_members_view',
			using_viewscope : 'team',
			in_api          : 'list_shipments',
			in_navigation   : 'supply_dashboard',
		},
		{
			type          : 'viewscope',
			value         : 'across_all',
			in_api        : 'list_shipments',
			in_navigation : 'supply_dashboard',
		},
		{
			type          : 'viewscope',
			value         : 'all',
			in_api        : 'list_shipments',
			in_navigation : 'supply_dashboard',
		},
	],
	SHOW_INCENTIVE: [
		{
			type          : 'api',
			in_navigation : 'sales_dashboard',
			value         : 'get_incentive_user_detail_stat',
		},
	],
};
export default conditions;
