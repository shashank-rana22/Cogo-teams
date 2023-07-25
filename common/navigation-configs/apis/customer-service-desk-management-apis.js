const customer_service_desk_management = [
	{
		api          : 'post_allocation_create_csd_config',
		access_type  : 'private',
		service_name : 'allocation',
	},
	{
		api          : 'post_allocation_update_csd_config',
		access_type  : 'private',
		service_name : 'allocation',
	},
	{
		api          : 'post_allocation_csd_config_agent_experience_slabs',
		access_type  : 'private',
		service_name : 'allocation',
	},
	{
		api          : 'post_allocation_csd_config_shipment_capacities',
		access_type  : 'private',
		service_name : 'allocation',
	},
	{
		api          : 'get_allocation_csd_configurations',
		access_type  : 'private',
		service_name : 'allocation',
	},
	{
		api          : 'list_partners',
		access_type  : 'private',
		service_name : 'partner',
	},
	{
		api          : 'list_partner_users',
		access_type  : 'private',
		service_name : 'partner',
	},
	{
		api          : 'list_organizations',
		access_type  : 'private',
		service_name : 'organization',
	},
];

export default customer_service_desk_management;
