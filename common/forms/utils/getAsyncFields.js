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
	asyncAccountEngagementScoringEvents,
	asyncFieldsTicketTypes,
	asyncFieldsPartnerUsersIds,
	asyncListServetelAgents,
};
