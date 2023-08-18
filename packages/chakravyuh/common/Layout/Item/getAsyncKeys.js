const OPTIONS = {
	'cogo-entities': {
		valueKey       : 'entity_code',
		labelKey       : 'entity_code',
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
		labelKey       : 'entity_code',
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
		labelKey      : 'name',
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
	'location-select': {
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
	'organization-users': {
		valueKey       : 'id',
		labelKey       : 'name',
		asyncKey       : 'list_organization_users',
		defaultParams  : {},
		defaultOptions : true,
		isSearchable   : true,
	},
	currencies: {
		valueKey      : 'iso_code',
		labelKey      : 'iso_code',
		asyncKey      : 'list_exchange_rate_currencies',
		defaultParams : {
			filters: {
				status: 'active',
			},
		},
	},
	'verified-service-providers': {
		valueKey       : 'id',
		labelKey       : 'business_name',
		asyncKey       : 'organizations',
		defaultOptions : true,
		defaultParams  : {
			filters: {
				account_type : 'service_provider',
				status       : 'active',
				kyc_status   : 'verified',
			},
		},
	},
	'partner-users': {
		valueKey       : 'id',
		labelKey       : 'name',
		asyncKey       : 'list_partner_users',
		defaultOptions : true,
		defaultParams  : {
			filters: {
				status     : 'active',
				page_limit : 10,
			},
		},
	},
	partners: {
		valueKey       : 'id',
		labelKey       : 'label',
		asyncKey       : 'list_partners',
		defaultOptions : true,
		defaultParams  : {
			filters: {
				status: 'active',
			},
			page_limit: 100,
		},
	},

	operators: {
		valueKey       : 'id',
		labelKey       : 'short_name',
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
};

const getAsyncFields = (key) => OPTIONS[key];

export default getAsyncFields;
