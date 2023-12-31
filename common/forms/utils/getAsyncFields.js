function asyncFieldsLocationsTwo() {
	return {
		valueKey    : 'id',
		labelKey    : 'name',
		endpoint    : 'list_locations_v2',
		initialCall : true,
		params      : {
			filters    : { status: 'active' },
			page_limit : 20,
			includes   : { country: null, default_params_required: true },
		},
	};
}
function asyncFieldsPartnerUsersIds() {
	return {
		labelKey    : 'name',
		valueKey    : 'user_id',
		endpoint    : 'list_partner_users',
		initialCall : true,
		params      : {
			filters: {
				status: 'active',
			},
			page_limit: 100,
		},
	};
}
function asyncFieldsLocations() {
	return {
		valueKey    : 'id',
		labelKey    : 'name',
		endpoint    : 'list_locations',
		initialCall : true,
		params      : {
			filters    : { status: 'active' },
			page_limit : 10,
			sort_by    : 'name',
			sort_type  : 'asc',
			includes   : { country: null, default_params_required: true },
		},
	};
}
function asyncFieldsPartner() {
	return {
		labelKey    : 'business_name',
		valueKey    : 'id',
		endpoint    : 'list_partners',
		initialCall : true,
		params      : {
			filters: {
				status: 'active',
			},
			page_limit: 100,
		},
	};
}
function asyncFieldsOrganization() {
	return {
		labelKey    : 'business_name',
		valueKey    : 'id',
		endpoint    : 'list_organizations',
		initialCall : true,
		params      : {
			filters: { status: 'active' },
		},
	};
}

function asyncFieldsLeadOrganization() {
	return {
		labelKey    : 'business_name',
		valueKey    : 'id',
		endpoint    : 'list_lead_organizations',
		initialCall : true,
		params      : {
			filters: {
				status: 'active',
			},
		},
	};
}

function asyncFieldsOrganizationUsers() {
	return {
		labelKey    : 'name',
		valueKey    : 'id',
		endpoint    : 'list_organization_users',
		initialCall : false,
		params      : {
			filters: {
				status: 'active',
			},
		},
	};
}

function asyncFieldsOperators() {
	return {
		labelKey    : 'short_name',
		valueKey    : 'id',
		endpoint    : 'list_operators',
		initialCall : false,
		params      : {
			filters: {
				status: 'active',
			},
		},
	};
}

function asyncFieldsPartnerUsers() {
	return {
		labelKey    : 'name',
		valueKey    : 'id',
		endpoint    : 'list_partner_users',
		initialCall : true,
		params      : {
			filters: {
				status: 'active',
			},
			page_limit: 100,
		},
	};
}

function asyncFieldsPartnerRoles() {
	return {
		labelKey     : 'name',
		valueKey     : 'id',
		endpoint     : 'list_roles',
		initialCall  : true,
		microService : 'auth',
		params       : {
			filters    : { status: true },
			page_limit : 100,
			sort_by    : 'short_name',
			sort_type  : 'asc',
		},
	};
}

function asyncFieldsOrganizations() {
	return {
		labelKey    : 'business_name',
		valueKey    : 'id',
		endpoint    : 'list_organizations',
		initialCall : true,
		params      : {
			filters    : { status: 'active' },
			page_limit : 100,
		},
	};
}

function asyncFieldsOrganizationUser() {
	return {
		labelKey    : 'name',
		valueKey    : 'id',
		endpoint    : 'list_organization_users',
		initialCall : true,
		params      : {
			filters    : { status: 'active' },
			page_limit : 100,
		},
	};
}

function asyncFieldsCampaignSegments() {
	return {
		labelKey    : 'name',
		valueKey    : 'id',
		endpoint    : 'list_segments',
		initialCall : true,
		params      : {
			filters    : { status: 'active' },
			page_limit : 100,
		},
	};
}
function asyncFieldsListOperators() {
	return {
		labelKey    : 'short_name',
		valueKey    : 'id',
		endpoint    : 'list_operators',
		initialCall : true,
		params      : {
			filters    : { operator_type: 'airline', status: 'active' },
			page_limit : 100,
			sort_by    : 'short_name',
			sort_type  : 'asc',
		},
	};
}

function asyncFieldsListAgents() {
	return {
		labelKey    : 'name',
		valueKey    : 'agent_id',
		endpoint    : 'list_chat_agents',
		initialCall : true,
		params      : {
			page_limit : 20,
			sort_by    : 'chat_assigned_at',
			sort_type  : 'asc',
		},
	};
}

function asyncFieldListRateChargeCodes() {
	return {
		labelKey    : 'name',
		valueKey    : 'code',
		endpoint    : 'list_rate_charge_codes',
		initialCall : true,
		params      : {
			filters    : { status: 'active' },
			page_limit : 20,
			sort_by    : 'active_assigned_chats',
			sort_type  : 'asc',
		},
	};
}

function asyncAllotBanks() {
	return {
		labelKey     : 'bankname',
		valueKey     : 'bank_id',
		endpoint     : '/purchase/treasury/live-status',
		authkey      : 'get_purchase_treasury_live_status',
		initialCall  : false,
		microService : 'business_finance',
		params       : {
			entityCode : 301,
			currency   : 'INR',
		},
	};
}
function asyncShippingLines() {
	return {
		labelKey     : 'name',
		valueKey     : 'id',
		endpoint     : 'get_saas_container_shipping_lines',
		initialCall  : false,
		microService : 'saas_traceability',
	};
}

function asyncFieldsExpertiseConfigurations() {
	return {
		labelKey     : 'condition_name',
		valueKey     : 'id',
		endpoint     : '/kam_expertise_event_configuration_name',
		authkey      : 'get_allocation_kam_expertise_event_configuration_name',
		microService : 'allocation',
		initialCall  : false,
	};
}

function asyncFieldsExpertiseBadgeName() {
	return {
		labelKey     : 'badge_name',
		valueKey     : 'id',
		endpoint     : '/kam_expertise_badge_name',
		authkey      : 'get_allocation_kam_expertise_badge_name',
		microService : 'allocation',
		initialCall  : false,
	};
}

function asyncKamExpertiseRuleOptions() {
	return {
		labelKey     : 'option',
		valueKey     : 'option',
		endpoint     : '/kam_expertise_rule_options',
		authkey      : 'get_allocation_kam_expertise_rule_options',
		microService : 'allocation',
		initialCall  : false,
	};
}

function asyncOrganizationTradeParties() {
	return {
		labelKey    : 'display_name',
		valueKey    : 'registration_number',
		endpoint    : '/list_organization_trade_parties',
		initialCall : true,
	};
}

function asyncSearchProducts() {
	return {
		labelKey    : 'item_name',
		valueKey    : 'code',
		endpoint    : '/search_products_v2',
		initialCall : true,
	};
}

function asyncKamExpertiseGroupOptions() {
	return {
		labelKey     : 'name',
		valueKey     : 'group_name',
		endpoint     : '/kam_expertise_event_group_name',
		authkey      : 'get_allocation_kam_expertise_event_group_name',
		microService : 'allocation',
		initialCall  : true,
	};
}

function listVendors() {
	return {
		labelKey    : 'business_name',
		valueKey    : 'q',
		endpoint    : 'list_vendors',
		initialCall : false,
	};
}

function asyncListCogoEntity() {
	return {
		labelKey    : 'business_name',
		valueKey    : 'entity_code',
		endpoint    : 'list_cogo_entities',
		initialCall : true,
		params      : {
			filters: {
				status: 'active',
			},
			page_limit: 100,
		},
	};
}

function asyncAccountEngagementScoringEvents() {
	return {
		labelKey     : 'name',
		valueKey     : 'name',
		endpoint     : '/engagement_scoring_event_names',
		authkey      : 'get_allocation_engagement_scoring_event_names',
		microService : 'allocation',
		initialCall  : true,
	};
}

function asyncShipmentContainerDetails() {
	return {
		valueKey      : 'container_number',
		finalLabelKey : 'container_number',
		endpoint      : 'list_shipment_container_details',
		initialCall   : true,
		defaultParams : {},
	};
}

function asyncFieldsTicketTypes() {
	return {
		labelKey     : 'TicketType',
		valueKey     : 'TicketType',
		endpoint     : 'default_types',
		authkey      : 'get_tickets_default_types',
		microService : 'tickets',
		initialCall  : true,
		qFilterKey   : 'QFilter',
		listKey      : 'items',
		searchByq    : true,
	};
}

function asyncTicketsCategory() {
	return {
		labelKey     : 'category',
		valueKey     : 'category',
		endpoint     : 'configuration_categories',
		authkey      : 'get_tickets_configuration_categories',
		microService : 'tickets',
		initialCall  : true,
		qFilterKey   : 'QFilter',
		listKey      : 'items',
		searchByq    : true,
	};
}

function asyncListHsCodes() {
	return {
		labelKey    : 'name',
		valueKey    : 'id',
		endpoint    : 'list_hs_codes',
		initialCall : false,
		params      : {
			page_limit: 10,
		},
	};
}

function asyncListCurrency() {
	return {
		labelKey    : 'iso_code',
		valueKey    : 'iso_code',
		endpoint    : 'list_exchange_rate_currencies',
		initialCall : true,
		params      : {
			filters: {
				status: 'active',
			},
		},
	};
}
function asyncListServetelAgents() {
	return {
		labelKey    : 'mobile_number',
		valueKey    : 'id',
		endpoint    : 'list_servetel_agents',
		initialCall : true,
		params      : {
			filters: {
				status: 'active',
			},
		},
	};
}

function asyncJvList() {
	return {
		labelKey     : 'category',
		valueKey     : 'category',
		endpoint     : 'payments/parent-jv/jv-category',
		initialCall  : true,
		authkey      : 'get_payments_parent_jv_jv_category',
		microService : 'business_finance',
		searchByq    : true,
	};
}

function asyncJournalCode() {
	return {
		labelKey     : 'description',
		valueKey     : 'number',
		endpoint     : 'payments/parent-jv/journal-code',
		initialCall  : true,
		authkey      : 'get_payments_parent_jv_journal_code',
		microService : 'business_finance',
		searchByq    : true,
	};
}

function asyncAccMode() {
	return {
		labelKey     : 'label',
		valueKey     : 'label',
		endpoint     : 'payments/parent-jv/acc-mode',
		initialCall  : true,
		authkey      : 'get_payments_parent_jv_acc_mode',
		microService : 'business_finance',
		searchByq    : true,
	};
}

function asyncIncidentSubtypeList() {
	return {
		labelKey     : 'incidentSubtype',
		valueKey     : 'incidentSubtype',
		endpoint     : 'incident-management/incident/incident-sub-type',
		initialCall  : true,
		authkey      : 'get_incident_management_incident_incident_sub_type',
		microService : 'business_finance',
		searchByq    : true,
	};
}

function asyncCodeMaster() {
	return {
		labelKey     : 'accountCode',
		valueKey     : 'accountCode',
		endpoint     : 'payments/parent-jv/gl-code-master',
		initialCall  : true,
		authkey      : 'get_payments_parent_jv_gl_code_master',
		microService : 'business_finance',
		searchByq    : true,
	};
}

function asyncListOrgTradeParties() {
	return {
		labelKey    : 'legal_business_name',
		valueKey    : 'id',
		endpoint    : 'list_organization_trade_party_details',
		initialCall : true,
		params      : {
			sage_organization_id_required : true,
			filters                       : {
				status: 'active',
			},
		},
	};
}

function asyncAllocationRequestRejectionType() {
	return {
		labelKey     : 'reason',
		valueKey     : 'reason',
		endpoint     : '/request_rejection_reasons',
		authkey      : 'get_allocation_request_rejection_reasons',
		microService : 'allocation',
		initialCall  : true,
	};
}

function asyncPlanPricingList() {
	return {
		labelKey    : 'name',
		valueKey    : 'id',
		endpoint    : 'list_saas_plan_pricings',
		initialCall : true,
		params      : {
			filters: { is_active: true },
		},
	};
}

function asyncQuotaList() {
	return {
		labelKey    : 'product_name',
		valueKey    : 'id',
		endpoint    : 'list_saas_products',
		initialCall : true,
	};
}

function asyncCommoditiesList() {
	return {
		labelKey     : 'description',
		valueKey     : 'id',
		endpoint     : 'saas/hs-code/list',
		initialCall  : true,
		authkey      : 'get_saas_hs_code_list',
		microService : 'business_finance',
		searchByq    : true,
	};
}
function asyncFortigoLocations() {
	return {
		labelKey    : 'location_name',
		valueKey    : 'id',
		endpoint    : 'list_shipment_fortigo_trip_locations',
		initialCall : true,
	};
}

function asyncOrganizationBranches() {
	return {
		valueKey      : 'id',
		labelKey      : 'branch_name',
		endpoint      : 'list_organization_branches',
		initialCall   : true,
		defaultParams : {
			filters    : { status: 'active' },
			page_limit : 10,
		},
	};
}

function asyncListFAQTopics() {
	return {
		labelKey    : 'display_name',
		valueKey    : 'id',
		endpoint    : 'list_faq_topics',
		initialCall : true,
		params      : {
			filters: {
				status: 'active',
			},
		},
	};
}

function asyncListFAQTags() {
	return {
		labelKey    : 'display_name',
		valueKey    : 'id',
		endpoint    : 'list_faq_tags',
		initialCall : true,
		params      : {
			filters: {
				status: 'active',
			},
		},
	};
}

function asyncListCourseCategories() {
	return {
		labelKey    : 'display_name',
		valueKey    : 'id',
		endpoint    : 'list_course_categories',
		initialCall : true,
		params      : {
			filters: {
				status: 'active',
			},
		},
	};
}

function asyncListTests() {
	return {
		labelKey    : 'name',
		valueKey    : 'id',
		endpoint    : 'list_tests',
		initialCall : true,
		params      : {
			filters: {
				status: 'active',
			},
		},
	};
}

function asyncListEmployees() {
	return {
		labelKey    : 'name',
		valueKey    : 'id',
		endpoint    : 'list_employee_details',
		initialCall : true,
		params      : {
			filters: {
				status: 'active',
			},
		},
	};
}

function asyncListSquad() {
	return {
		labelKey    : 'squad_name',
		valueKey    : 'id',
		endpoint    : 'list_all_squads',
		initialCall : true,
		params      : {
			filters: {
				status: 'active',
			},
		},
	};
}

function asyncListSubChapters() {
	return {
		labelKey    : 'sub_chapter_name',
		valueKey    : 'id',
		endpoint    : 'list_all_sub_chapters',
		initialCall : true,
		params      : {
			filters: {
				status: 'active',
			},
		},
	};
}

function asyncListTribes() {
	return {
		labelKey    : 'tribe_name',
		valueKey    : 'id',
		endpoint    : 'list_all_tribes',
		initialCall : true,
		params      : {
			filters: {
				status: 'active',
			},
		},
	};
}

function asyncListChapter() {
	return {
		labelKey    : 'chapter_name',
		valueKey    : 'id',
		endpoint    : 'list_all_chapters',
		initialCall : true,
		params      : {
			filters: {
				status: 'active',
			},
		},
	};
}

function asyncListRoles() {
	return {
		labelKey    : 'role_name',
		valueKey    : 'id',
		endpoint    : 'list_employee_roles',
		initialCall : true,
		params      : {
			filters: {
				status: 'active',
			},
		},
	};
}
function asyncListDepartment() {
	return {
		labelKey    : 'department_name',
		valueKey    : 'id',
		endpoint    : 'list_employee_departments',
		initialCall : true,
		params      : {
			filters: {
				status: 'active',
			},
		},
	};
}

function asyncListPromotions() {
	return {
		labelKey    : 'name',
		valueKey    : 'id',
		endpoint    : 'list_promotions',
		initialCall : true,
		params      : {
			filters: {
				status: 'published',
			},
			page_limit: 100,
		},
	};
}
function asyncListServiceLanes() {
	return {
		valueKey    : 'id',
		labelKey    : 'name',
		endpoint    : 'list_service_lanes',
		initialCall : true,
		params      : {
			filters    : { status: 'active' },
			page_limit : 20,
		},
	};
}
function asyncListVessels() {
	return {
		valueKey    : 'id',
		labelKey    : 'name',
		endpoint    : 'list_vessels',
		initialCall : true,
		params      : {
			filters    : { status: 'active' },
			page_limit : 20,
		},
	};
}

function asyncInsuranceCommoditiesList() {
	return {
		labelKey     : 'commodity',
		valueKey     : 'id',
		endpoint     : 'saas/insurance/list-commodities',
		initialCall  : true,
		authkey      : 'get_saas_insurance_list_commodities',
		microService : 'business_finance',
	};
}

function asyncListDunningTemplates() {
	return {
		labelKey    : 'name',
		valueKey    : 'id',
		endpoint    : 'list_dunning_templates',
		initialCall : true,
	};
}

function asyncListOrganizationStakeholders() {
	return {
		labelKey    : 'name',
		valueKey    : 'id',
		endpoint    : 'payments/dunning/organization-stakeholders',
		initialCall : true,
	};
}

function asyncListShipmentPendingTasks() {
	return {
		labelKey    : 'document_type',
		valueKey    : 'document_type',
		endpoint    : 'list_shipment_pending_tasks',
		initialCall : true,
		params      : {
			page_limit: 10,
		},
	};
}

function asyncListShipments() {
	return {
		labelKey    : 'serial_id',
		valueKey    : 'id',
		endpoint    : 'list_shipments',
		initialCall : true,
		params      : {
			page_limit: 10,
		},
	};
}

function asyncListShipmentServices() {
	return {
		labelKey    : 'shipment_serial_id',
		valueKey    : 'shipment_id',
		endpoint    : 'list_shipment_services',
		initialCall : true,
		params      : {
			page_limit: 10,
		},
	};
}
function asyncFieldsLocationsMapping() {
	return {
		valueKey    : 'id',
		labelKey    : 'name',
		endpoint    : 'list_locations_mapping',
		initialCall : true,
		params      : {
			page_limit: 20,
		},
	};
}

function asyncListAllManagers() {
	return {
		labelKey    : 'name',
		valueKey    : 'id',
		endpoint    : 'list_all_managers',
		initialCall : true,
		params      : {
			filters: {
				status: 'active',
			},
			page_limit: 20,
		},
	};
}

function asyncListAllocationObjectives() {
	return {
		labelKey     : 'name',
		valueKey     : 'id',
		endpoint     : '/objectives',
		authkey      : 'get_allocation_objectives',
		microService : 'allocation',
		initialCall  : false,
	};
}

function asyncListExpenseCategories() {
	return {
		labelKey     : 'categoryName',
		valueKey     : 'id',
		endpoint     : 'purchase/expense/expense-category',
		microService : 'business_finance',
		authkey      : 'get_purchase_expense_expense_category',
		initialCall  : true,
		searchByq    : true,
		params       : { pageSize: 10000 },
	};
}

function asyncListResources() {
	return {
		labelKey     : 'name',
		valueKey     : 'id',
		endpoint     : 'list_resources',
		initialCall  : true,
		microService : 'auth',
		params       : {},
	};
}
function asyncListLeadOrganizationUsers() {
	return {
		labelKey    : 'name',
		valueKey    : 'lead_user_id',
		endpoint    : 'list_lead_organization_users',
		initialCall : true,
		params      : {},
	};
}

function asyncListPricingZones() {
	return {
		valueKey    : 'id',
		labelKey    : 'name',
		endpoint    : 'list_pricing_zones',
		initialCall : true,
		params      : {
			page_limit : 100,
			page       : 1,
		},
	};
}

function asyncListTruckTypes() {
	return {
		labelKey    : 'display_name',
		valueKey    : 'truck_name',
		endpoint    : 'list_trucks',
		initialCall : true,
		params      : {
			filters: {
				status: 'active',
			},
			page_limit: 10,
		},
	};
}

function asyncAllocationEligibleRoles() {
	return {
		labelKey     : 'name',
		valueKey     : 'id',
		endpoint     : '/eligible_roles',
		authkey      : 'get_agent_scoring_eligible_roles',
		microService : 'agent_scoring',
		initialCall  : true,
	};
}

function asyncAgentScoringConfigs() {
	return {
		labelKey     : 'display_name',
		valueKey     : 'id',
		endpoint     : '/configs',
		authkey      : 'get_agent_scoring_configs',
		microService : 'agent_scoring',
		initialCall  : true,
	};
}

function asyncAgentScoringBlocks() {
	return {
		labelKey     : 'name',
		valueKey     : 'id',
		endpoint     : '/blocks',
		authkey      : 'get_agent_scoring_blocks',
		microService : 'agent_scoring',
		initialCall  : true,
	};
}

function asyncAgentScoringParameters() {
	return {
		labelKey     : 'name',
		valueKey     : 'id',
		endpoint     : '/parameters',
		authkey      : 'get_agent_scoring_parameters',
		microService : 'agent_scoring',
		initialCall  : true,
	};
}

function asyncAgentScoringQuests() {
	return {
		labelKey     : 'name',
		valueKey     : 'id',
		endpoint     : '/quests',
		authkey      : 'get_agent_scoring_quests',
		microService : 'agent_scoring',
		initialCall  : true,
	};
}

function asyncListUserShipments() {
	return {
		labelKey    : 'serial_id',
		valueKey    : 'serial_id',
		endpoint    : '/list_shipments_on_feedback',
		initialCall : true,
		params      : {},
	};
}

function asyncFieldsOrganizationOnCall() {
	return {
		labelKey    : 'business_name',
		valueKey    : 'id',
		endpoint    : '/list_organizations_on_call',
		initialCall : true,
		params      : {
			filters: { status: 'active' },
		},
	};
}

function asyncListCompanyLocations() {
	return {
		labelKey    : 'display_name',
		valueKey    : 'id',
		endpoint    : 'list_company_location',
		initialCall : true,
		params      : {},
	};
}

function asyncListSaasHsCodes() {
	return {
		valueKey       : 'id',
		labelKey       : 'description',
		authkey        : 'get_saas_hs_code_list',
		endpoint       : 'saas/hs-code/list',
		defaultOptions : true,
		searchByq      : true,
		qFilterKey     : 'query',
		microService   : 'business_finance',
		defaultParams  : {},
	};
}

function asyncListSpotSearchRateCardOperators() {
	return {
		labelKey    : 'short_name',
		valueKey    : 'id',
		endpoint    : 'list_spot_search_rate_card_operators',
		initialCall : true,
	};
}

function asyncListLocationClusters() {
	return {
		labelKey    : 'cluster_name',
		valueKey    : 'id',
		endpoint    : 'list_location_clusters',
		initialCall : true,
		params      : {
			filters    : { status: 'active' },
			page_limit : 50,
		},
	};
}

function asyncListFclFreightCommodityClusters() {
	return {
		labelKey    : 'name',
		valueKey    : 'id',
		endpoint    : 'list_fcl_freight_commodity_clusters',
		initialCall : true,
		params      : {
			filters        : { status: 'active' },
			page_limit     : 50,
			defaultOptions : true,
			isSearchable   : true,
		},
	};
}

function asyncListOverSeasTradeParties() {
	return {
		valueKey     : 'organizationId',
		labelKey     : 'organizationName',
		endpoint     : '/purchase/bills/list-overseas-trade-parties',
		authkey      : 'get_purchase_bills_list_overseas_trade_parties',
		initialCall  : false,
		microService : 'business_finance',
		searchByq    : true,
	};
}

function asyncListShippingLineEvents() {
	return {
		labelKey    : 'milestone',
		valueKey    : 'id',
		endpoint    : 'list_shipping_line_events',
		initialCall : true,
		params      : {
			filters: { status: 'active' },
		},
	};
}
function asyncListSaasPlan() {
	return {
		labelKey : 'display_name',
		valueKey : 'id',
		endpoint : '/list_saas_plans',
		params   : {
			filters    : { is_active: true, plan_type: 'P' },
			page_limit : 50,
		},
	};
}

function asyncListEnrichmentSources() {
	return {
		labelKey     : 'name',
		valueKey     : 'id',
		endpoint     : '/list_enrichment_sources',
		authkey      : 'get_enrichment_sources',
		microService : 'athena',
		initialCall  : true,
	};
}

function asyncListIncidentTypes() {
	return {
		labelKey     : 'label',
		valueKey     : 'value',
		endpoint     : '/incident-management/incident/list-incident-types',
		authkey      : 'get_incident_management_incident_list_incident_types',
		microService : 'business_finance',
		initialCall  : true,
		searchByq    : true,
	};
}

function asyncListFclFreightRate() {
	return {
		labelKey    : 'serial_id',
		valueKey    : 'id',
		endpoint    : 'list_fcl_freight_rate_requests',
		initialCall : true,
		params      : {
			page_limit: 10,
		},
	};
}
function asyncListLclFreightRate() {
	return {
		labelKey    : 'serial_id',
		valueKey    : 'id',
		endpoint    : 'list_lcl_freight_rate_requests',
		initialCall : true,
		params      : {
			page_limit: 10,
		},
	};
}
function asyncListAirFreightRate() {
	return {
		labelKey    : 'serial_id',
		valueKey    : 'id',
		endpoint    : 'list_air_freight_rate_requests',
		initialCall : true,
		params      : {
			page_limit: 10,
		},
	};
}
function asyncListFtlFreightRate() {
	return {
		labelKey    : 'serial_id',
		valueKey    : 'id',
		endpoint    : 'list_ftl_freight_rate_requests',
		initialCall : true,
		params      : {
			page_limit: 10,
		},
	};
}
function asyncListLtlFreightRate() {
	return {
		labelKey    : 'serial_id',
		valueKey    : 'id',
		endpoint    : 'list_ltl_freight_rate_requests',
		initialCall : true,
		params      : {
			page_limit: 10,
		},
	};
}
function asyncListFclCfsRate() {
	return {
		labelKey    : 'serial_id',
		valueKey    : 'id',
		endpoint    : 'list_fcl_cfs_rate_requests',
		initialCall : true,
		params      : {
			page_limit: 10,
		},
	};
}
function asyncListHaulageFreightRate() {
	return {
		labelKey    : 'serial_id',
		valueKey    : 'id',
		endpoint    : 'list_haulage_freight_rate_requests',
		initialCall : true,
		params      : {
			page_limit: 10,
		},
	};
}

function asyncListFclCustomsRate() {
	return {
		labelKey    : 'serial_id',
		valueKey    : 'id',
		endpoint    : 'list_fcl_customs_rate_requests',
		initialCall : true,
		params      : {
			page_limit: 10,
		},
	};
}
function asyncListLclCustomsRate() {
	return {
		labelKey    : 'serial_id',
		valueKey    : 'id',
		endpoint    : 'list_lcl_customs_rate_requests',
		initialCall : true,
		params      : {
			page_limit: 10,
		},
	};
}
function asyncListAirCustomsRate() {
	return {
		labelKey    : 'serial_id',
		valueKey    : 'id',
		endpoint    : 'list_air_customs_rate_requests',
		initialCall : true,
		params      : {
			page_limit: 10,
		},
	};
}

function asyncListTrailerFreightRate() {
	return {
		labelKey    : 'serial_id',
		valueKey    : 'id',
		endpoint    : 'list_trailer_freight_rate_requests',
		initialCall : true,
		params      : {
			page_limit: 10,
		},
	};
}

function asyncListFclRateFeedback() {
	return {
		labelKey    : 'serial_id',
		valueKey    : 'id',
		endpoint    : 'list_fcl_freight_rate_feedbacks',
		initialCall : true,
		params      : {
			page_limit: 10,
		},
	};
}

function asyncListLclRateFeedback() {
	return {
		labelKey    : 'serial_id',
		valueKey    : 'id',
		endpoint    : 'list_lcl_freight_rate_feedbacks',
		initialCall : true,
		params      : {
			page_limit: 10,
		},
	};
}

function asyncListAirRateFeedback() {
	return {
		labelKey    : 'serial_id',
		valueKey    : 'id',
		endpoint    : 'list_air_freight_rate_feedbacks',
		initialCall : true,
		params      : {
			page_limit: 10,
		},
	};
}

function asyncListFtlRateFeedback() {
	return {
		labelKey    : 'serial_id',
		valueKey    : 'id',
		endpoint    : 'list_ftl_freight_rate_feedbacks',
		initialCall : true,
		params      : {
			page_limit: 10,
		},
	};
}

function asyncListLtlRateFeedback() {
	return {
		labelKey    : 'serial_id',
		valueKey    : 'id',
		endpoint    : 'list_ltl_freight_rate_feedbacks',
		initialCall : true,
		params      : {
			page_limit: 10,
		},
	};
}

function asyncListFclCustomFeedback() {
	return {
		labelKey    : 'serial_id',
		valueKey    : 'id',
		endpoint    : 'list_fcl_customs_rate_feedbacks',
		initialCall : true,
		params      : {
			page_limit: 10,
		},
	};
}

function asyncListLclCustomFeedback() {
	return {
		labelKey    : 'serial_id',
		valueKey    : 'id',
		endpoint    : 'list_lcl_customs_rate_feedbacks',
		initialCall : true,
		params      : {
			page_limit: 10,
		},
	};
}

function asyncListTrailerRateFeedback() {
	return {
		labelKey    : 'serial_id',
		valueKey    : 'id',
		endpoint    : 'list_trailer_freight_rate_feedbacks',
		initialCall : true,
		params      : {
			page_limit: 10,
		},
	};
}

function asyncListHaulageRateFeedback() {
	return {
		labelKey    : 'serial_id',
		valueKey    : 'id',
		endpoint    : 'list_haulage_freight_rate_feedbacks',
		initialCall : true,
		params      : {
			page_limit: 10,
		},
	};
}

function asyncListAirCustomFeedback() {
	return {
		labelKey    : 'serial_id',
		valueKey    : 'id',
		endpoint    : 'list_air_customs_rate_feedbacks',
		initialCall : true,
		params      : {
			page_limit: 10,
		},
	};
}

function asyncInsuranceHsCode() {
	return {
		labelKey     : 'hsCode',
		valueKey     : 'id',
		endpoint     : '/saas/insurance/v2/hs-code',
		authkey      : 'get_saas_insurance_v2_hs_code',
		microService : 'business_finance',
		searchByq    : true,
		qFilterKey   : 'query',
	};
}

function asyncListSalaryBands() {
	return {
		valueKey    : 'id',
		labelKey    : 'name',
		endpoint    : 'list_salary_bands',
		initialCall : true,
	};
}

function asyncListTransactionType() {
	return {
		valueKey    : 'name',
		labelKey    : 'name',
		endpoint    : 'list_transaction_type',
		initialCall : true,
	};
}
function asyncListSalaryConfigurations() {
	return {
		initialCall : true,
		valueKey    : 'id',
		labelKey    : 'description',
		endpoint    : 'list_salary_configurations',

	};
}

export {
	asyncFieldsLocations,
	asyncFieldsLocationsTwo as asyncFieldsLocations2,
	asyncFieldsPartner,
	asyncFieldsPartnerRoles,
	asyncFieldsPartnerUsers,
	asyncFieldsOrganizations,
	asyncFieldsLeadOrganization,
	asyncFieldsOrganizationUser,
	asyncFieldsCampaignSegments,
	asyncFieldsOrganization,
	asyncFieldsOrganizationUsers,
	asyncFieldsOperators,
	asyncFieldsListOperators,
	asyncFieldsListAgents,
	asyncFieldListRateChargeCodes,
	asyncAllotBanks,
	asyncShippingLines,
	asyncFieldsExpertiseConfigurations,
	asyncFieldsExpertiseBadgeName,
	asyncKamExpertiseRuleOptions,
	asyncKamExpertiseGroupOptions,
	listVendors,
	asyncListCogoEntity,
	asyncListHsCodes,
	asyncListCurrency,
	asyncJvList,
	asyncAccountEngagementScoringEvents,
	asyncFieldsTicketTypes,
	asyncOrganizationTradeParties,
	asyncSearchProducts,
	asyncShipmentContainerDetails,
	asyncJournalCode,
	asyncAccMode,
	asyncCodeMaster,
	asyncListOrgTradeParties,
	asyncFieldsPartnerUsersIds,
	asyncListServetelAgents,
	asyncListPromotions,
	asyncPlanPricingList,
	asyncQuotaList,
	asyncAllocationRequestRejectionType,
	asyncCommoditiesList,
	asyncFortigoLocations,
	asyncOrganizationBranches,
	asyncListFAQTopics,
	asyncListFAQTags,
	asyncListCourseCategories,
	asyncListTests,
	asyncListServiceLanes,
	asyncListVessels,
	asyncListEmployees,
	asyncListSquad,
	asyncListSubChapters,
	asyncListTribes,
	asyncListChapter,
	asyncListRoles,
	asyncListDepartment,
	asyncTicketsCategory,
	asyncInsuranceCommoditiesList,
	asyncListDunningTemplates,
	asyncListOrganizationStakeholders,
	asyncListExpenseCategories,
	asyncListAllManagers,
	asyncListShipmentPendingTasks,
	asyncListShipments,
	asyncListShipmentServices,
	asyncListAllocationObjectives,
	asyncIncidentSubtypeList,
	asyncListResources,
	asyncFieldsLocationsMapping,
	asyncListCompanyLocations,
	asyncListPricingZones,
	asyncListTruckTypes,
	asyncListLeadOrganizationUsers,
	asyncAllocationEligibleRoles,
	asyncAgentScoringConfigs,
	asyncAgentScoringBlocks,
	asyncAgentScoringParameters,
	asyncAgentScoringQuests,
	asyncListUserShipments,
	asyncFieldsOrganizationOnCall,
	asyncListSaasHsCodes,
	asyncListLocationClusters,
	asyncListFclFreightCommodityClusters,
	asyncListSpotSearchRateCardOperators,
	asyncListOverSeasTradeParties,
	asyncListShippingLineEvents,
	asyncListSaasPlan,
	asyncListEnrichmentSources,
	asyncListIncidentTypes,
	asyncListFclFreightRate,
	asyncListLclFreightRate,
	asyncListAirFreightRate,
	asyncListFtlFreightRate,
	asyncListLtlFreightRate,
	asyncListFclCfsRate,
	asyncListHaulageFreightRate,
	asyncListFclCustomsRate,
	asyncListLclCustomsRate,
	asyncListAirCustomsRate,
	asyncListTrailerFreightRate,
	asyncListFclRateFeedback,
	asyncListLclRateFeedback,
	asyncListAirRateFeedback,
	asyncListFtlRateFeedback,
	asyncListLtlRateFeedback,
	asyncListFclCustomFeedback,
	asyncListLclCustomFeedback,
	asyncListTrailerRateFeedback,
	asyncListHaulageRateFeedback,
	asyncListAirCustomFeedback,
	asyncInsuranceHsCode,
	asyncListSalaryConfigurations,
	asyncListSalaryBands,
	asyncListTransactionType,
};
