function asyncFieldsLocations2() {
	return {
		valueKey    : 'id',
		labelKey    : 'name',
		endpoint    : 'list_locations_v2',
		initialCall : true,
		params      : {
			filters    : { status: 'active' },
			page_limit : 20,
			includes   : { country: null, main_ports: null },
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
			includes   : { country: null, main_ports: null },
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
			filters    : { status: 'active' },
			page_limit : 100,
		},
	};
}
<<<<<<< HEAD
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

function asyncFieldsOrganizationUsers() {
	return {
		labelKey    : 'name',
		valueKey    : 'organization_id',
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
=======

function asyncFieldsPartnerRoles() {
	return {
		labelKey    : 'name',
		valueKey    : 'id',
		endpoint    : 'list_auth_roles',
>>>>>>> 413bdc718f278499d8ed8cd97b0845b086f58185
		initialCall : true,
		params      : {
			filters    : { status: 'active' },
			page_limit : 100,
<<<<<<< HEAD
			sort_by    : 'short_name',
			sort_type  : 'asc',
		},
	};
}

export {
	asyncFieldsLocations,
	asyncFieldsLocations2,
	asyncFieldsPartner,
	asyncFieldsOrganization,
	asyncFieldsOrganizationUsers,
	asyncFieldsOperators,
};
=======
		},
	};
}
export { asyncFieldsLocations, asyncFieldsLocations2, asyncFieldsPartner, asyncFieldsPartnerRoles };
>>>>>>> 413bdc718f278499d8ed8cd97b0845b086f58185
