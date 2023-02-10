const apis = [
	{
		api          : 'create_ltl_booking_request',
		access_type  : 'private',
		service_name : 'ltl_warehouse_ops',
	},
	{
		api          : 'list_ltl_booking_requests',
		access_type  : 'private',
		service_name : 'ltl_warehouse_ops',
	},
	{
		api          : 'generate_ltl_pickup_request_number',
		access_type  : 'private',
		service_name : 'ltl_warehouse_ops',
	},
	{
		api          : 'list_shipment_ltl_freight_warehouses',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'update_ltl_booking_request',
		access_type  : 'private',
		service_name : 'ltl_warehouse_ops',
	},
	{
		api          : 'create_ltl_pickup_run_sheet',
		access_type  : 'private',
		service_name : 'ltl_warehouse_ops',
	},
	{
		api          : 'update_ltl_pickup_run_sheet',
		access_type  : 'private',
		service_name : 'ltl_warehouse_ops',
	},
	{
		api          : 'generate_ltl_pickup_run_sheet_number',
		access_type  : 'private',
		service_name : 'ltl_warehouse_ops',
	},
	{
		api          : 'list_auth_roles',
		access_type  : 'private',
		service_name : 'auth',
	},
	{
		api          : 'create_ltl_booking_request_checkout',
		access_type  : 'private',
		service_name : 'ltl_warehouse_ops',
	},
	{
		api          : 'list_ltl_freight_driver_details',
		access_type  : 'private',
		service_name : 'ltl_warehouse_ops',
	},
	{
		api          : 'create_ltl_freight_consol_document',
		access_type  : 'public',
		service_name : 'ltl_warehouse_ops',
	},
	{
		api          : 'update_ltl_freight_consol',
		access_type  : 'public',
		service_name : 'ltl_warehouse_ops',
	},
	{
		api          : 'list_ltl_freight_consol_documents',
		access_type  : 'private',
		service_name : 'ltl_warehouse_ops',
	},
	{
		api          : 'list_ltl_freight_vehicle_details',
		access_type  : 'private',
		service_name : 'ltl_warehouse_ops',
	},
	{
		api          : 'get_ltl_freight_consol_shipment',
		access_type  : 'private',
		service_name : 'ltl_warehouse_ops',
	},
	{
		api          : 'list_ltl_freight_warehouses',
		access_type  : 'private',
		service_name : 'ltl_warehouse_ops',
	},
	{
		api          : 'list_ltl_freight_consols',
		access_type  : 'private',
		service_name : 'ltl_warehouse_ops',
	},
	{
		api          : 'list_ltl_freight_vehicle_types',
		access_type  : 'private',
		service_name : 'ltl_warehouse_ops',
	},
	{
		api          : 'update_ltl_freight_consol',
		access_type  : 'private',
		service_name : 'ltl_warehouse_ops',
	},
	{
		api          : 'create_ltl_freight_vehicle_departure',
		access_type  : 'private',
		service_name : 'ltl_warehouse_ops',
	},
	{
		api          : 'create_ltl_freight_vehicle_arrival',
		access_type  : 'private',
		service_name : 'ltl_warehouse_ops',
	},
	{
		api          : 'generate_consolidated_eway_bill',
		access_type  : 'private',
		service_name : 'ltl_warehouse_ops',
	},
	{
		api          : 'update_ltl_freight_vehicle_arrival',
		access_type  : 'private',
		service_name : 'ltl_warehouse_ops',
	},
	{
		api          : 'list_ltl_freight_vehicle_movements',
		access_type  : 'private',
		service_name : 'ltl_warehouse_ops',
	},
	{
		api          : 'list_ltl_freight_vehicle_unloading_packages',
		access_type  : 'private',
		service_name : 'ltl_warehouse_ops',
	},
	{
		api          : 'update_ltl_freight_vehicle_movement',
		access_type  : 'private',
		service_name : 'ltl_warehouse_ops',
	},
	{
		api          : 'get_ltl_freight_loading_sheet_detail',
		access_type  : 'private',
		service_name : 'ltl_warehouse_ops',
	},
	{
		api          : 'get_ltl_freight_trip_hire_challan_detail',
		access_type  : 'private',
		service_name : 'ltl_warehouse_ops',
	},
	{
		api          : 'get_ltl_freight_manifest_detail',
		access_type  : 'private',
		service_name : 'ltl_warehouse_ops',
	},
	{
		api          : 'create_ltl_freight_consol',
		access_type  : 'private',
		service_name : 'ltl_warehouse_ops',
	},
	{
		api          : 'create_ltl_freight_vehicle_movement',
		access_type  : 'private',
		service_name : 'ltl_warehouse_ops',
	},
	{
		api          : 'create_ltl_freight_vehicle_detail',
		access_type  : 'private',
		service_name : 'ltl_warehouse_ops',
	},
	{
		api          : 'list_ltl_freight_warehouse_users',
		access_type  : 'private',
		service_name : 'ltl_warehouse_ops',
	},
	{
		api          : 'create_ltl_freight_driver_detail',
		access_type  : 'private',
		service_name : 'ltl_warehouse_ops',
	},
	{
		api          : 'onboard_channel_partner',
		access_type  : 'private',
		service_name : 'partner',
	},
	{
		api          : 'validate_seal_number',
		access_type  : 'private',
		service_name : 'ltl_warehouse_ops',
	},
	{
		api          : 'update_ltl_freight_driver_detail',
		access_type  : 'private',
		service_name : 'ltl_warehouse_ops',
	},
	{
		api          : 'delete_ltl_freight_vehicle_movement',
		access_type  : 'private',
		service_name : 'ltl_warehouse_ops',
	},
	{
		api          : 'get_ltl_pickup_requests_sheet',
		access_type  : 'private',
		service_name : 'ltl_warehouse_ops',
	},
	{
		api          : 'get_ltl_fm_consol',
		access_type  : 'private',
		service_name : 'ltl_warehouse_ops',
	},
	{
		api          : 'get_ltl_lm_consol',
		access_type  : 'private',
		service_name : 'ltl_warehouse_ops',

	},
	{
		api          : 'get_ltl_pickup_run_sheet',
		access_type  : 'private',
		service_name : 'ltl_warehouse_ops',
	},
	{
		api          : 'get_ltl_fm_lm_consol',
		access_type  : 'private',
		service_name : 'ltl_warehouse_ops',
	},
	{
		api          : 'create_ltl_fm_lm_consol',
		access_type  : 'private',
		service_name : 'ltl_warehouse_ops',
	},
	{
		api          : 'get_ltl_delivery_run_sheet',
		access_type  : 'private',
		service_name : 'ltl_warehouse_ops',
	},
	{
		api          : 'get_ltl_freight_fm_shipment',
		access_type  : 'private',
		service_name : 'ltl_warehouse_ops',
	},
	{
		api          : 'get_ltl_freight_lm_shipment',
		access_type  : 'private',
		service_name : 'ltl_warehouse_ops',
	},
	{
		api          : 'update_ltl_freight_vehicle_departure',
		access_type  : 'private',
		service_name : 'ltl_warehouse_ops',
	},
	{
		api          : 'update_ltl_freight_consol_milestone',
		access_type  : 'private',
		service_name : 'ltl_warehouse_ops',
	},
	{
		api          : 'update_ltl_freight_fm_lm_vehicle_arrival',
		access_type  : 'private',
		service_name : 'ltl_warehouse_ops',
	},
];
export default apis;
