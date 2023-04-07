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

function asyncListHsCodes() {
	return {
		labelKey    : 'name',
		valueKey    : 'id',
		endpoint    : 'list_hs_codes',
		initialCall : false,
		params      : {
			page_limit: 20,
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
	listVendors,
	asyncListCogoEntity,
	asyncListHsCodes,
};
