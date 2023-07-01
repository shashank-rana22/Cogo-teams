const apis = [
	{
		api         : 'get_exchange_rate',
		access_type : 'private',
	},
	{
		api          : 'get_spot_search_cargo_insurance_rate',
		access_type  : 'private',
		service_name : 'spot_search',
	},
	{
		api          : 'get_checkout_cargo_insurance_rate',
		access_type  : 'private',
		service_name : 'spot_search',
	},
	{
		api          : 'create_spot_search',
		access_type  : 'private',
		service_name : 'spot_search',
	},
	{
		api          : 'get_insurance_country_supported',
		access_type  : 'private',
		service_name : 'saas',
	},
	{
		api          : 'get_insurance_list_commodities',
		access_type  : 'private',
		service_name : 'saas',
	},
	{
		api          : 'post_insurance_checkout_and_generate',
		access_type  : 'private',
		service_name : 'saas',
	},
	{
		api          : 'get_insurance_draft_details',
		access_type  : 'private',
		service_name : 'saas',
	},
	{
		api          : 'post_insurance_draft',
		access_type  : 'private',
		service_name : 'saas',
	},
	{
		api          : 'send_shipment_cargo_insurance_email',
		access_type  : 'private',
		service_name : 'shipment',
	},
	{
		api          : 'get_insurance_rate',
		access_type  : 'private',
		service_name : 'saas',
	},
	{
		api          : 'get_insurance_list_countries',
		access_type  : 'private',
		service_name : 'saas',
	},
	{
		api          : 'list_address_for_insurance',
		access_type  : 'private',
		service_name : 'organization',
	},
];

export default apis;
