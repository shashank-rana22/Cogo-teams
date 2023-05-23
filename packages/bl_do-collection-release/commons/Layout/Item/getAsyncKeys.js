const getAsyncFields = (key) => {
	const OPTIONS = {
		'shipping-lines': {
			valueKey       : 'id',
			lableKey       : 'short_name',
			asyncKey       : 'list_operators',
			defaultOptions : true,
			defaultParams  : {
				filters: {
					operator_type : 'shipping_line',
					status        : 'active',
				},
				page_limit : 100,
				sort_by    : 'short_name',
				sort_type  : 'asc',
			},
		},
		'cogo-entities': {
			valueKey       : 'entity_code',
			lableKey       : 'entity_code',
			asyncKey       : 'list_cogo_entities',
			defaultOptions : true,
			defaultParams  : {
				filters: {
					status: 'active',
				},
				page_limit : 100,
				page       : 1,
			},
		},
		'cogo-entities-id': {
			valueKey       : 'id',
			lableKey       : 'entity_code',
			asyncKey       : 'list_cogo_entities',
			defaultOptions : true,
			defaultParams  : {
				filters: {
					status: 'active',
				},
				page_limit : 100,
				page       : 1,
			},
		},
		locations: {
			valueKey      : 'id',
			lableKey      : 'name',
			asyncKey      : 'list_locations',
			defaultParams : {
				filters: {
					status: 'active',
				},
				page_limit : 20,
				sort_by    : 'name',
				sort_type  : 'asc',
				includes   : {
					country                 : true,
					default_params_required : true,
				},
			},
		},
		locations_v2: {
			valueKey      : 'id',
			lableKey      : 'name',
			asyncKey      : 'list_locations_v2',
			defaultParams : {
				filters: {
					status: 'active',
				},
				page_limit : 20,
				includes   : {
					country                 : true,
					default_params_required : true,
				},
			},
		},
		container_shipping_lines: {
			valueKey       : 'id',
			lableKey       : 'short_name',
			asyncKey       : 'get_container_shipping_lines',
			defaultParams  : {},
			defaultOptions : true,
			isSearchable   : false,
		},
		hs_codes: {
			valueKey      : 'id',
			lableKey      : 'name',
			asyncKey      : 'list_hs_codes',
			defaultParams : {
				page_limit: 10,
			},
			defaultOptions: true,
		},
		'organization-users': {
			valueKey       : 'id',
			lableKey       : 'name',
			asyncKey       : 'list_organization_users',
			defaultParams  : {},
			defaultOptions : true,
			isSearchable   : true,
		},
		'partner-addresses': {
			valueKey       : 'id',
			lableKey       : 'name',
			asyncKey       : 'list_partner_addresses',
			defaultParams  : {},
			defaultOptions : true,
			isSearchable   : true,
		},
		'organization-pocs': {
			valueKey       : 'id',
			lableKey       : 'name',
			asyncKey       : 'list_organization_pocs',
			defaultParams  : {},
			defaultOptions : true,
			isSearchable   : true,
		},
		'organization-billing-addresses': {
			valueKey       : 'id',
			lableKey       : 'name',
			asyncKey       : 'list_organization_billing_addresses',
			defaultParams  : {},
			defaultOptions : true,
			isSearchable   : true,
		},
		'trade-parties': {
			valueKey       : 'organization_id',
			lableKey       : 'business_name',
			asyncKey       : 'list_organization_trade_parties',
			defaultOptions : true,
			defaultParams  : {
				filters: {
					status: 'active',
				},
				page_limit: 10,
			},
		},
		trade_contacts: {
			valueKey      : 'id',
			lableKey      : 'company_name',
			asyncKey      : 'list_trade_contacts',
			defaultParams : {
				page_limit: 20,
			},
			defaultOptions: true,
		},
		currencies: {
			valueKey      : 'id',
			lableKey      : 'label',
			asyncKey      : 'list_exchange_rate_currencies',
			defaultParams : {
				filters: {
					status: 'active',
				},
			},
		},
		'fcl-freight-rate-line-items': {
			valueKey       : 'code',
			lableKey       : 'name',
			asyncKey       : 'get_fcl_freight_rate',
			defaultOptions : true,
		},
		organizations: {
			valueKey       : 'id',
			lableKey       : 'business_name',
			asyncKey       : 'organizations',
			defaultOptions : true,
			defaultParams  : {
				filters: {
					status: 'active',
				},
			},
		},
		shipment_container_details: {
			valueKey       : 'container_number',
			lableKey       : 'container_number',
			asyncKey       : 'list_shipment_container_details',
			defaultOptions : true,
			defaultParams  : {},
		},
		operators: {
			valueKey       : 'id',
			lableKey       : 'short_name',
			asyncKey       : 'list_operators',
			defaultOptions : true,
			defaultParams  : {
				filters: {
					status: 'active',
				},
				page_limit : 100,
				sort_by    : 'short_name',
				sort_type  : 'asc',
			},
		},
		'partner-users-id': {
			valueKey       : 'user_id',
			lableKey       : 'name',
			asyncKey       : 'list_partner_users',
			defaultOptions : true,
			defaultParams  : {
				filters: {
					status: 'active',
				},
				page_limit: 10,
			},
		},
		'exchange-rate-currencies': {
			valueKey      : 'iso_code',
			lableKey      : 'iso_code',
			asyncKey      : 'list_exchange_rate_currencies',
			initialCall   : true,
			defaultParams : {
				filters: {
					status: 'active',
				},
				page_limit: 10,
			},
		},
		'cogo-entities-name': {
			valueKey      : 'id',
			lableKey      : 'business_name',
			asyncKey      : 'list_cogo_entities',
			defaultParams : {
				filters: {
					status: 'active',
				},
				page_limit : 100,
				page       : 1,
			},
		},

	};

	return OPTIONS[key];
};

export default getAsyncFields;
