const apis = [
	{
		api          : 'list_shipment_document_collections',
		access_type  : 'private',
		feature      : 'bl_do_collection_release',
		service_name : 'shipment',
	},
	{
		api          : 'list_shipment_pending_tasks',
		access_type  : 'private',
		feature      : 'bl_do_collection_release',
		service_name : 'shipment',
	},
	{
		api          : 'update_shipment_pending_task',
		access_type  : 'private',
		feature      : 'bl_do_collection_release',
		service_name : 'shipment',
	},
	{
		api          : 'list_shipment_services',
		access_type  : 'private',
		feature      : 'bl_do_collection_release',
		service_name : 'shipment',
	},
	{
		api          : 'create_shipment_document',
		access_type  : 'private',
		feature      : 'bl_do_collection_release',
		service_name : 'shipment',
	},
	{
		api          : 'get_shipment',
		access_type  : 'private',
		feature      : 'bl_do_collection_release',
		service_name : 'bookings',
	},
	{
		api          : 'generate_do_noc_certificate',
		access_type  : 'private',
		feature      : 'bl_do_collection_release',
		service_name : 'shipment',
	},
	{
		api          : 'generate_do_certificate',
		access_type  : 'private',
		feature      : 'bl_do_collection_release',
		service_name : 'shipment',
	},
	{
		api          : 'list_shipment_services',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'list_shipment_pending_tasks',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'list_organization_document_inventory',
		access_type  : 'private',
		service_name : 'organization',
		feature      : 'inventory_management',
	},
	{
		api          : 'create_organization_document_inventory',
		access_type  : 'private',
		service_name : 'organization',
		feature      : 'inventory_management',
	},
	{
		api          : 'list_shipment_bl_inventory',
		access_type  : 'private',
		service_name : 'shipment',
		feature      : 'inventory_management',
	},
	{
		api          : 'list_organizations',
		access_type  : 'private',
		service_name : 'organization',
		feature      : 'inventory_management',
	},
];

export default apis;
