const apis = [
	{
		api          : 'list_organizations',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'get_organization_trade_requirement_draft',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'list_shipment_audits',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'list_shipment_additional_services',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'list_shipment_documents',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'list_shipment_notes',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'list_shipment_pending_tasks',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'list_shipment_services',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'list_shipment_container_details',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'list_spot_negotiations',
		access_type  : 'private',
		service_name : 'spot_negotiation',
	},
	{
		api          : 'list_shipment_bl_details',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'list_organization_users',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'list_organization_addresses',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'list_organization_pocs',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'list_organization_invoicing_parties',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'get_shipment_messages',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'get_shipment_service',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'get_shipment',
		access_type  : 'private',
		service_name : 'bookings',
	},
	{
		api          : 'get_shipment_timeline',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'get_shipment_document_types',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'get_organization',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'list_shipment_organizations',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'list_partner_users',
		access_type  : 'private',
		service_name : 'partner',
	},
	{
		api          : 'list_shipment_trade_documents',
		access_type  : 'private',
		service_name : 'trade',
	},
	{
		api          : 'list_organization_documents',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'get_task_config',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'list_shipment_operating_procedures',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'list_organization_billing_addresses',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'list_organization_documents',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'list_shipment_task_configs',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'list_shipment_collection_party',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'list_organization_trade_parties',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'list_shipment_booking_confirmation_preferences',
		access_type  : 'private',
		service_name : 'shipment',
		feature      : 'confirm_bookings',
	},
	{
		api          : 'get_shipment_fault_alarm_description',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'list_shipment_stakeholders',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'list_shipment_booking_confirmation_preferences',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api         : 'get_shipment_quotation',
		access_type : 'private',
		feature     : 'revenue_desk',
	},
	{
		api          : 'list_shipment_trade_partners',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'list_shipment_service_providers',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'list_partner_user_rm_mappings',
		access_type  : 'private',
		service_name : 'partner',
	},
	{
		api          : 'list_trade_documents',
		access_type  : 'private',
		service_name : 'trade',
	},
	{
		api          : 'get_services',
		access_type  : 'private',
		service_name : 'bookings',
	},
	{
		api          : 'get_buyers',
		access_type  : 'private',
		service_name : 'bookings',
	},
	{
		api          : 'list_documents',
		access_type  : 'private',
		service_name : 'bookings',
	},
	{
		api          : 'list_additional_services',
		access_type  : 'private',
		service_name : 'bookings',
	},
	{
		api          : 'list_bill_of_ladings',
		access_type  : 'private',
		service_name : 'bookings',
	},
	{
		api          : 'get_process',
		access_type  : 'private',
		service_name : 'bookings',
	},
	{
		api          : 'list_tasks',
		access_type  : 'private',
		service_name : 'bookings',
	},
	{
		api          : 'get_timeline',
		access_type  : 'private',
		service_name : 'bookings',
	},
];

export default apis;
