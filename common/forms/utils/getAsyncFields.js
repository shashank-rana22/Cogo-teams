function asyncFieldsLocations2() {
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
		labelKey    : 'name',
		valueKey    : 'id',
		endpoint    : 'list_auth_roles',
		initialCall : true,
		params      : {
			filters    : { status: 'active' },
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
			sort_by    : 'active_assigned_chats',
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

export {
	asyncFieldsLocations,
	asyncFieldsLocations2,
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
	asyncInsuranceCommoditiesList,
	asyncListDunningTemplates,
	asyncListOrganizationStakeholders,
	asyncListShipmentPendingTasks,
	asyncListShipments,
	asyncListShipmentServices,
};
