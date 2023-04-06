const conditions = {
	SUPPLY_AGENT_VIEW: [
		{
			type            : 'viewtype',
			value           : 'supply_agent_view',
			using_viewscope : 'self',
			in_api          : 'list_shipments',
		},
		{
			type            : 'viewtype',
			value           : 'supply_team_members_view',
			using_viewscope : 'team',
			in_api          : 'list_shipments',
		},
		{
			type            : 'viewtype',
			value           : 'booking_agent_view',
			using_viewscope : 'self',
			in_api          : 'list_shipments',
		},
	],
	SERVICE_OPS_VIEW: [
		{
			type            : 'viewtype',
			value           : 'service_ops_view',
			using_viewscope : 'self',
			in_api          : 'list_shipments',
		},
		{
			type            : 'viewtype',
			value           : 'service_ops_team_memebers_view',
			using_viewscope : 'team',
			in_api          : 'list_shipments',
		},
	],
	BOOKING_AGENT_VIEW: [
		{
			type            : 'viewtype',
			value           : 'booking_agent_view',
			using_viewscope : 'self',
			in_api          : 'list_shipments',
		},
		{
			type            : 'viewtype',
			value           : 'booking_team_members_view',
			using_viewscope : 'team',
			in_api          : 'list_shipments',
		},
	],
	SALES_AGENT_VIEW: [
		{
			type            : 'viewtype',
			value           : 'sales_team_members_view',
			using_viewscope : 'team',
			in_api          : 'list_shipments',
		},
		{
			type            : 'viewtype',
			value           : 'sales_agent_view',
			using_viewscope : 'self',
			in_api          : 'list_shipments',
		},
		{
			type            : 'viewtype',
			value           : 'entity_manager_view',
			using_viewscope : 'self',
			in_api          : 'list_shipments',
		},
	],
	GLOBAL_VIEW: [
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
	UPDATE_SHIPMENT: [
		{
			type  : 'api',
			value : 'update_shipment',
		},
	],
	UPDATE_SERVICE: [
		{
			type  : 'api',
			value : 'update_shipment_service',
		},
	],
	SEE_RATE_AUDITS: [
		{
			type  : 'api',
			value : 'list_fcl_freight_rate_audits',
		},
		{
			type  : 'api',
			value : 'list_air_freight_rate_audits',
		},
		{
			type  : 'api',
			value : 'list_lcl_freight_rate_audits',
		},
	],
	SEE_NEGOTIATION_AUDITS: [
		{
			type  : 'api',
			value : 'get_spot_negotiation_rate_by_shipment_id',
		},
	],
	SEE_FEEDBACK_BUTTON: [
		{
			type  : 'api',
			value : 'send_shipment_feedback',
		},
	],
};
export default conditions;
