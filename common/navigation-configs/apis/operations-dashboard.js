const operations_dashboard = [
	{
		api          : 'list_organizations',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'list_shipments',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'get_shipments_stats',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'list_partner_users',
		access_type  : 'private',
		service_name : 'partner',
	},
	{
		api          : 'list_contract_fcl_freight_services',
		access_type  : 'private',
		service_name : 'contract',
	},

	{
		api          : 'update_organization_trade_requirement_draft',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'list_organization_trade_requirement_drafts',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'update_organization_trade_requirement_draft_stakeholders',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'send_trade_requirement_draft_confirmation_otp',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'verify_trade_requirement_draft_confirmation_otp',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'list_shipment_pending_tasks',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'update_contract_draft',
		access_type  : 'private',
		service_name : 'contract',
	},
	{
		api          : 'get_ops_user_incentive_stats',
		access_type  : 'private',
		service_name : 'incentive',
	},
	{
		api          : 'create_incentive_report',
		access_type  : 'private',
		service_name : 'incentive',
	},
];

export default operations_dashboard;
