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
		'unpaid-invoices': {
			valueKey      : 'id',
			lableKey      : 'invoice_no',
			asyncKey      : 'list_sage_invoices',
			defaultParams : {
				page_limit : 100,
				filters    : {
					status: 'unpaid',
				},
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
				page_limit: 20,
			},
			defaultOptions: true,
		},
		'port-type-grouped': {
			valueKey     : 'id',
			lableKey     : 'name',
			asyncKey     : 'list_organization_serviceable_ports',
			groupedLabel : 'Your Ports',
			grouped      : [{
				valueKey      : 'id',
				lableKey      : 'name',
				asyncKey      : 'list_locations',
				groupedLabel  : 'All Ports',
				defaultParams : {
					page_limit : 10,
					sort_by    : 'name',
					sort_type  : 'asc',
					filters    : {
						status : 'active',
						type   : ['seaport'],
					},
					includes: {
						country                 : true,
						default_params_required : true,
					},
				},
			}],
			defaultParams: {
				page_limit : 10,
				sort_by    : 'name',
				sort_type  : 'asc',
			},
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
		trade_party_details: {
			valueKey       : 'id',
			lableKey       : 'legal_business_name',
			asyncKey       : 'list_organization_trade_party_details',
			defaultOptions : true,
			defaultParams  : {
				filters: {
					status: 'active',
				},
				pagination_data_required: false,
			},
		},
		trade_party_kyc_status_details: {
			valueKey       : 'registration_number',
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
		'fcl-freight-rate-line-items': {
			valueKey       : 'code',
			lableKey       : 'name',
			asyncKey       : 'get_fcl_freight_rate',
			defaultOptions : true,
		},
		'verified-service-providers': {
			valueKey       : 'id',
			lableKey       : 'business_name',
			asyncKey       : 'list_organizations',
			defaultOptions : true,
			defaultParams  : {
				filters: {
					account_type : 'service_provider',
					status       : 'active',
					kyc_status   : 'verified',
				},
			},
		},
		'verified-importer-exporters': {
			valueKey       : 'id',
			lableKey       : 'business_name',
			asyncKey       : 'list_organizations',
			defaultOptions : true,
			defaultParams  : {
				filters: {
					account_type : 'importer_exporter',
					status       : 'active',
					kyc_status   : 'verified',
				},
			},
		},
		organizations: {
			valueKey       : 'id',
			lableKey       : 'business_name',
			asyncKey       : 'list_organizations',
			defaultOptions : true,
			defaultParams  : {
				filters: {
					status: 'active',
				},
			},
		},
		'bpr-list': {
			valueKey       : 'value',
			lableKey       : 'bpr_name',
			asyncKey       : 'search_bpr_number',
			defaultOptions : true,
		},
		'dunning-templates': {
			valueKey       : 'id',
			lableKey       : 'name',
			asyncKey       : 'list_dunning_templates',
			defaultOptions : true,
		},
		'local-agents': {
			valueKey       : 'value',
			lableKey       : 'label',
			asyncKey       : 'list_organization_services',
			defaultOptions : true,
			defaultParams  : {
				filters: {
					status     : 'active',
					service    : ['fcl_freight_local_agent', 'lcl_freight_local_agent', 'air_freight_local_agent'],
					page_limit : 20,
				},
			},
		},
		'partner-users': {
			valueKey       : 'id',
			lableKey       : 'name',
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
			lableKey       : 'label',
			asyncKey       : 'list_partners',
			defaultOptions : true,
			defaultParams  : {
				filters: {
					status: 'active',
				},
				page_limit: 100,
			},
		},
		'partner-roles': {
			valueKey       : 'id',
			lableKey       : 'name',
			asyncKey       : 'list_auth_roles',
			defaultOptions : true,
			defaultParams  : {
				filters: {
					status: 'active',
				},
				page_limit: 200,
			},
		},
		lcl_pudo_locations: {
			valueKey      : 'id',
			lableKey      : 'name',
			asyncKey      : 'list_lcl_pudo_locations',
			defaultParams : {
				filters: {
					status: 'active',
				},
				page_limit: 10,
			},
		},
		'purchase-invoice-line-items': {
			valueKey       : 'code',
			lableKey       : 'item_name',
			asyncKey       : 'search_products_v2',
			defaultOptions : true,
			defaultParams  : {},
		},
		shipment_container_details: {
			valueKey       : 'container_number',
			lableKey       : 'container_number',
			asyncKey       : 'list_shipment_container_details',
			defaultOptions : true,
			defaultParams  : {},
		},
		'invoice-line-items': {
			valueKey       : 'product_code',
			lableKey       : 'name',
			asyncKey       : 'search_products_v2',
			defaultOptions : true,
			defaultParams  : {},
		},
		'lead-users': {
			valueKey      : 'id',
			lableKey      : 'name',
			asyncKey      : 'list_lead_users',
			defaultParams : {
				defaultOptions : true,
				isSearchable   : true,
			},
		},
		'lead-organizations': {
			valueKey      : 'id',
			lableKey      : 'business_name',
			asyncKey      : 'list_lead_organizations',
			defaultParams : {
				defaultOptions : true,
				isSearchable   : true,
			},
		},
		'organization-branches': {
			valueKey       : 'id',
			lableKey       : 'branch_name',
			asyncKey       : 'list_organization_branches',
			defaultOptions : true,
			defaultParams  : {
				filters: {
					status: 'active',
				},
				page_limit: 10,
			},
		},
		'lead-segments': {
			valueKey      : 'id',
			lableKey      : 'name',
			asyncKey      : 'list_lead_segments',
			defaultParams : {
				defaultOptions : true,
				isSearchable   : true,
			},
		},
		list_unique_events: {
			valueKey      : 'name',
			lableKey      : 'name',
			asyncKey      : 'get_unique_event_names',
			defaultParams : {
				defaultOptions : true,
				isSearchable   : true,
			},
		},
		list_org_doc: {
			valueKey : 'value',
			lableKey : 'label',
			asyncKey : 'list_organization_documents',
		},
		bank_documents: {
			valueKey      : 'id',
			lableKey      : 'name',
			asyncKey      : 'list_organization_documents',
			defaultParams : {
				filters: {
					document_type  : ['bank_account_details'],
					defaultOptions : true,
					isSearchable   : true,
				},
			},
			'communication-templates': {
				valueKey      : 'id',
				lableKey      : 'label',
				asyncKey      : 'list_communication_templates',
				defaultParams : {
					defaultOptions : true,
					isSearchable   : true,
				},
			},
			'event-data': {
				valueKey      : 'name',
				lableKey      : 'name',
				asyncKey      : 'get_unique_event_data',
				defaultParams : {
					defaultOptions : true,
					isSearchable   : true,
				},
			},
			'campaign-tags': {
				valueKey      : 'name',
				lableKey      : 'name',
				asyncKey      : 'get_campaign_tags',
				defaultParams : {
					defaultOptions : true,
					isSearchable   : true,
				},
			},
			'template-tags': {
				valueKey      : 'name',
				lableKey      : 'name',
				asyncKey      : 'get_template_tags',
				defaultParams : {
					defaultOptions : true,
					isSearchable   : true,
				},
			},
			'event-mappings': {
				valueKey      : 'name',
				lableKey      : 'name',
				asyncKey      : 'list_event_mappings',
				defaultParams : {
					defaultOptions : true,
					isSearchable   : true,
				},
			},
			'promotion-tags': {
				valueKey      : 'name',
				lableKey      : 'name',
				asyncKey      : 'list_promotion_tags',
				defaultParams : {
					defaultOptions : true,
					isSearchable   : true,
				},
			},
			trade_parties: {
				asyncKey      : 'list_organization_trade_parties',
				valueKey      : 'id',
				lableKey      : 'business_name',
				defaultParams : {
					defaultOptions : true,
					isSearchable   : true,
				},
			},
			'item-taxes': {
				valueKey       : 'id',
				lableKey       : 'code',
				authkey        : 'get_common_item',
				asyncKey       : 'common/item',
				defaultOptions : true,
				defaultParams  : {
					pageSize: 50,
				},
			},
			'item-tax-rule': {
				valueKey       : 'id',
				lableKey       : 'name',
				authkey        : 'get_common_tax_rule',
				asyncKey       : 'common/tax-rule',
				defaultOptions : true,
				defaultParams  : {
					pageSize: 50,
				},
			},
			'item-tax-level': {
				valueKey       : 'id',
				lableKey       : 'name',
				authkey        : 'get_common_tax_level',
				asyncKey       : 'common/tax-level',
				defaultOptions : true,
				defaultParams  : {
					pageSize: 50,
				},
			},
			'campaign-sender-email': {
				valueKey       : 'email',
				lableKey       : 'email',
				asyncKey       : 'list_campaign_email_configuration',
				defaultOptions : true,
				defaultParams  : {
					status     : 'active',
					sort_by    : 'updated_at',
					page_limit : 50,
				},
			},
			'charge-codes': {
				valueKey       : 'code',
				lableKey       : 'label',
				asyncKey       : 'list_air_freight_charge_codes',
				defaultOptions : true,
				defaultParams  : {
					service_type: 'air_freight',
				},
			},
			'charge-codes-domestic': {
				valueKey       : 'code',
				lableKey       : 'label',
				asyncKey       : 'list_domestic_air_freight_charge_codes',
				defaultOptions : true,
				defaultParams  : {
					service_type: 'domestic_air_freight',
				},
			},
			utm_data: {
				valueKey       : 'value',
				lableKey       : 'label',
				asyncKey       : 'get_utm_campaign_audience_data',
				defaultOptions : true,
			},
		},
		fcl_freight_contracts: {
			valueKey      : 'value',
			lableKey      : 'label',
			asyncKey      : 'list_contract_fcl_freight_services',
			defaultParams : {
				page_limit: 50,
			},
		},
		lcl_freight_contracts: {
			valueKey      : 'value',
			lableKey      : 'label',
			asyncKey      : 'list_contract_lcl_freight_services',
			defaultParams : {
				page_limit: 50,
			},
		},
		air_freight_contracts: {
			valueKey      : 'value',
			lableKey      : 'label',
			asyncKey      : 'list_contract_air_freight_services',
			defaultParams : {
				page_limit: 50,
			},
		},
		'location-clusters': {
			valueKey      : 'id',
			asyncKey      : 'list_location_clusters',
			lableKey      : 'cluster_name',
			defaultParams : {
				filters: {
					status: 'active',
				},
				page_limit: 50,
			},
		},
		'global-segments': {
			valueKey      : 'id',
			asyncKey      : 'list_segmentations',
			lableKey      : 'name',
			defaultParams : {
				segment_type         : 'global',
				page_limit           : 50,
				status               : ['active'],
				is_lead_user_segment : false,
			},
		},
		segment_tags: {
			valueKey      : 'name',
			asyncKey      : 'get_segment_tags',
			lableKey      : 'name',
			defaultParams : {
				page_limit: 50,
			},
		},
		'list-segments': {
			valueKey      : 'id',
			lableKey      : 'name',
			asyncKey      : 'list_segments',
			defaultParams : {
				defaultOptions : true,
				isSearchable   : true,
			},
		},
		'commodity-clusters': {
			valueKey      : 'id',
			lableKey      : 'name',
			asyncKey      : 'list_fcl_freight_commodity_clusters',
			defaultParams : {
				page_limit : 50,
				filters    : {
					status: 'active',
				},
				defaultOptions : true,
				isSearchable   : true,
			},
		},
		'list-shipments-lr-number': {
			valueKey      : 'lr_number',
			lableKey      : 'lr_number',
			asyncKey      : 'list_shipments',
			defaultParams : {
				page_limit     : 100,
				defaultOptions : true,
				searchKey      : 'lr_number',
				isSearchable   : true,
			},
		},
		'list-shipments-prs-number': {
			valueKey      : 'prs_number',
			lableKey      : 'prs_number',
			asyncKey      : 'list_shipments',
			defaultParams : {
				page_limit : 100,
				filters    : {
					defaultOptions : true,
					searchKey      : 'prs_number',
					isSearchable   : true,
				},
			},
		},
		'list-shipments-drs-number': {
			valueKey      : 'drs_number',
			lableKey      : 'drs_number',
			asyncKey      : 'list_shipments',
			defaultParams : {
				page_limit : 100,
				filters    : {
					defaultOptions : true,
					searchKey      : 'drs_number',
					isSearchable   : true,
				},
			},
		},
		'list-shipments-thc-number': {
			valueKey      : 'thc_number',
			lableKey      : 'thc_number',
			asyncKey      : 'list_shipments',
			defaultParams : {
				page_limit : 100,
				filters    : {
					defaultOptions : true,
					searchKey      : 'thc_number',
					isSearchable   : true,
				},
			},
			'analytics-dashboard': {
				valueKey       : 'id',
				lableKey       : 'name',
				asyncKey       : 'list_analytics_dashboards',
				defaultOptions : true,
				defaultParams  : {
					isSearchable: true,
				},
			},
			'list-ltl-warehouses': {
				valueKey      : 'id',
				lableKey      : 'name',
				asyncKey      : 'list_ltl_freight_warehouses',
				defaultParams : {
					page_limit : 100,
					filters    : {
						status: 'active',
					},
					defaultOptions : true,
					isSearchable   : true,
				},
			},
			'list-pickup-requests': {
				valueKey      : 'pickup_request_number',
				lableKey      : 'pickup_request_number',
				asyncKey      : 'list_ltl_booking_requests',
				defaultParams : {
					page_limit : 100,
					filters    : {
						request_type   : 'pickup_request',
						defaultOptions : true,
						isSearchable   : true,
					},
				},
				'list-overseas-trade-parties': {
					valueKey      : 'organizationId',
					lableKey      : 'description',
					asyncKey      : 'purchase/bills/list-overseas-trade-parties',
					defaultParams : {
						defaultOptions : true,
						isSearchable   : true,
						authkey        : 'get_purchase_bills_list_overseas_trade_parties',
					},
				},
				'unloading-dockets': {
					valueKey      : 'lr_number',
					lableKey      : 'lr_number',
					asyncKey      : 'list_ltl_booking_requests',
					defaultParams : {
						page_limit     : 100,
						searchKey      : 'docket',
						defaultOptions : true,
						isSearchable   : true,
					},
				},
				'invoice-filter': {
					valueKey      : 'id',
					lableKey      : 'invoice_number',
					asyncKey      : 'list_shipment_consolidated_sell_invoices',
					defaultParams : {
						page_limit : 100,
						filters    : {
							status: 'active',
						},
						searchKey      : 'query',
						defaultOptions : true,
						isSearchable   : true,
					},
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
					valueKey      : 'id',
					lableKey      : 'label',
					asyncKey      : 'list_exchange_rate_currencies',
					defaultParams : {
						filters: {
							status: 'active',
						},
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
			},
		},
	};

	return OPTIONS[key];
};

export default getAsyncFields;
