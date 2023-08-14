const apis = [
	{
		api          : 'list_risk_prone_shipments',
		access_type  : 'private',
		feature      : 'risk_management',
		service_name : 'bookings',
	},
	{
		api          : 'get_container_timeline',
		access_type  : 'private',
		feature      : 'risk_management',
		service_name : 'bookings',
	},
	{
		api          : 'get_shipment_risk_prone_stats',
		access_type  : 'private',
		feature      : 'risk_management',
		service_name : 'shipment',
	},
	{
		api          : 'update_shipment_fault_alarm',
		access_type  : 'private',
		feature      : 'risk_management',
		service_name : 'shipment',
	},
	{
		api         : 'get_saas_hs_code_list',
		access_type : 'private',
		feature     : 'risk_management',
	},
	{
		api          : 'list_locations',
		access_type  : 'private',
		feature      : 'risk_management',
		service_name : 'location',
	},
];

export default apis;
