import navigationMapping from '@cogoport/navigation-configs/navigation-mapping-admin';

const resetFilters = {
	hierarchy_level    : undefined,
	navigation         : undefined,
	q                  : undefined,
	role_functions     : undefined,
	role_sub_functions : undefined,
	stakeholder_id     : undefined,
};

const MIN_ARRAY_LENGTH = 0;

const getAllNavigations = (t = () => {}) => {
	const ALL_NAVS = [];
	const navigationMappingAdmin = navigationMapping({ t });
	Object.values(navigationMappingAdmin || {}).forEach((navigation) => {
		if (navigation.isSubNavs) {
			navigation.options.forEach((navOpt) => {
				ALL_NAVS.push({ label: navOpt?.title, value: navOpt?.key });
			});
		} else {
			ALL_NAVS.push({
				label : navigation?.title,
				value : navigation?.key,
			});
		}
	});
	return ALL_NAVS;
};

const getAllSubFunctions = (role_functions, t) => {
	const ROLE_SUB_FUNCTIONS = [];
	const FUNCTION_SUB_FUNCTION_MAPPING = {
		sales: [
			{
				label : t('accessManagement:roles_and_permission_select_sales_customer_success'),
				value : 'customer_success',
			},
			{
				label : t('accessManagement:roles_and_permission_select_sales_field_sales'),
				value : 'field_sales',
			},
			{
				label : t('accessManagement:roles_and_permission_select_sales_strategic_sales'),
				value : 'strategic_sales',
			},
			{
				label : t('accessManagement:roles_and_permission_select_sales_cp_sales'),
				value : 'cp_sales',
			},
			{
				label : t('accessManagement:roles_and_permission_select_sales_acquisition'),
				value : 'acquisition',
			},
			{
				label : t('accessManagement:roles_and_permission_select_cp_portfolio'),
				value : 'cp_portfolio',
			},
			{
				label : t('accessManagement:roles_and_permission_select_customer_operations'),
				value : 'customer_operations',
			},
		],
		supply: [
			{ label: t('accessManagement:roles_and_permission_select_supply_shippling_line'), value: 'shipping_line' },
			{
				label : t('accessManagement:roles_and_permission_select_supply_freight_forwarder'),
				value : 'freight_forwarder',
			},
			{
				label : t('accessManagement:roles_and_permission_select_supply_transportation'),
				value : 'transportation',
			},
			{
				label : t('accessManagement:roles_and_permission_select_supply_cfs'),
				value : 'cfs',
			},
			{
				label : t('accessManagement:roles_and_permission_select_supply_customs'),
				value : 'customs',
			},
			{
				label : t('accessManagement:roles_and_permission_select_supply_nvocc'),
				value : 'nvocc',
			},
			{
				label : t('accessManagement:roles_and_permission_select_supply_overseas'),
				value : 'overseas',
			},
			{
				label : t('accessManagement:roles_and_permission_select_supply_iata_agents'),
				value : 'iata_agents',
			},
		],
		operations: [
			{
				label : t('accessManagement:roles_and_permission_select_operations_booking_desk'),
				value : 'booking_desk',
			},
			{
				label : t('accessManagement:roles_and_permission_select_operations_post_shipment'),
				value : 'post_shipment',
			},
			{
				label : t('accessManagement:roles_and_permission_select_operations_finops'),
				value : 'finops',
			},
			{
				label : t('accessManagement:roles_and_permission_select_operations_common_customer_operations'),
				value : 'common_customer_operations',
			},
			{
				label : t('accessManagement:roles_and_permission_select_operations_cp_customer_operations'),
				value : 'cp_customer_operations',
			},
			{
				label : t('accessManagement:roles_and_permission_select_operations_mid_size_customer_operations'),
				value : 'mid_size_customer_operations',
			},
			{
				label : t('accessManagement:roles_and_permission_select_operations_enterprise_customer_operations'),
				value : 'enterprise_customer_operations',
			},
		],
		finance: [{
			label : t('accessManagement:roles_and_permission_select_finance_credit_controller'),
			value : 'credit_controller',
		}],
		training: [
			{
				label : t('accessManagement:roles_and_permission_select_training_training_general'),
				value : 'training_general',
			},
			{
				label : t('accessManagement:roles_and_permission_select_training_tech'),
				value : 'tech',
			},
			{
				label : t('accessManagement:roles_and_permission_select_training_product'),
				value : 'product',
			},
		],
		hr: [
			{
				label : t('accessManagement:roles_and_permission_select_hr_admin'),
				value : 'hr_admin',
			},
			{
				label : t('accessManagement:roles_and_permission_select_hrbp'),
				value : 'hrbp',
			},
			{
				label : t('accessManagement:roles_and_permission_select_talent_acquisition'),
				value : 'talent_acquisition',
			},
		],
		external: [
			{
				label : t('accessManagement:roles_and_permission_select_enrichment'),
				value : 'enrichment',
			},
		],
		public: [],
	};

	if (role_functions?.length > MIN_ARRAY_LENGTH) {
		role_functions?.forEach((item) => {
			FUNCTION_SUB_FUNCTION_MAPPING[item].forEach((sub_function) => {
				ROLE_SUB_FUNCTIONS.push(sub_function);
			});
		});
	} else {
		Object.values(FUNCTION_SUB_FUNCTION_MAPPING).forEach((sub_functions) => {
			sub_functions?.forEach((sub_function) => {
				ROLE_SUB_FUNCTIONS.push(sub_function);
			});
		});
	}
	return ROLE_SUB_FUNCTIONS;
};

export const controls = (role_functions, partnerOptions, t) => [
	{
		...partnerOptions,
		name        : 'stakeholder_id',
		placeholder : t('accessManagement:roles_and_permission_select_stakeholder_id_placeholder'),
		type        : 'select',
		isClearable : true,
		params      : { filters: { status: 'active' } },
	},
	{
		name           : 'navigation',
		placeholder    : t('accessManagement:roles_and_permission_select_navigation_placeholder'),
		scope          : 'partner',
		type           : 'select',
		defaultOptions : true,
		caret          : true,
		isClearable    : true,
		options        : getAllNavigations(t),
	},
	{
		name           : 'role_functions',
		placeholder    : t('accessManagement:roles_and_permission_select_role_functions_placeholder'),
		scope          : 'partner',
		type           : 'multiSelect',
		defaultOptions : true,
		caret          : true,
		isClearable    : true,
		options        : [
			{
				label : t('accessManagement:roles_and_permission_select_role_functions_select_sales'),
				value : 'sales',
			},
			{
				label : t('accessManagement:roles_and_permission_select_role_functions_select_supply'),
				value : 'supply',
			},
			{
				label : t('accessManagement:roles_and_permission_select_role_functions_select_operations'),
				value : 'operations',
			},
			{
				label : t('accessManagement:roles_and_permission_select_role_functions_select_finance'),
				value : 'finance',
			},
			{
				label : t('accessManagement:roles_and_permission_select_role_functions_select_external'),
				value : 'external',
			},
			{
				label : t('accessManagement:roles_and_permission_select_role_functions_select_public'),
				value : 'public',
			},
		],
		params: { filters: { status: 'active' } },
	},
	{
		name           : 'role_sub_functions',
		placeholder    : t('accessManagement:roles_and_permission_select_sub_function_placeholder'),
		scope          : 'partner',
		type           : 'multiSelect',
		defaultOptions : true,
		options        : getAllSubFunctions(role_functions, t),
		caret          : true,
		isClearable    : true,
		params         : { filters: { status: 'active' } },
	},
	{
		name           : 'hierarchy_level',
		placeholder    : t('accessManagement:roles_and_permission_select_hierarchy_level_placeholder'),
		scope          : 'partner',
		type           : 'select',
		defaultOptions : true,
		caret          : true,
		isClearable    : true,
		options        : [
			{
				label : t('accessManagement:roles_and_permission_select_hierarchy_level_owner'),
				value : 'owner',
			},
			{
				label : t('accessManagement:roles_and_permission_select_hierarchy_level_manager'),
				value : 'manager',
			},
			{
				label : t('accessManagement:roles_and_permission_select_hierarchy_level_function_head'),
				value : 'function_head',
			},
			{
				label : t('accessManagement:roles_and_permission_select_hierarchy_level_head'),
				value : 'head',
			},
			{
				label : t('accessManagement:roles_and_permission_select_hierarchy_level_zone_head'),
				value : 'zone_head',
			},
			{
				label : t('accessManagement:roles_and_permission_select_hierarchy_level_region_head'),
				value : 'region_head',
			},
			{
				label : t('accessManagement:roles_and_permission_select_hierarchy_level_cluster_head'),
				value : 'cluster_head',
			},
		],
		params: { filters: { status: 'active' } },
	},
];

export const getFilter = (val) => {
	if (val === 'cogoport') {
		return {
			entity_types            : ['cogoport'],
			stakeholder_type        : 'partner',
			exclude_stakeholder_ids : undefined,
		};
	}
	if (val === 'channel_partner') {
		return {
			entity_types     : ['channel_partner'],
			stakeholder_id   : undefined,
			stakeholder_type : 'partner',
		};
	}
	if (val === 'customer') {
		return {
			stakeholder_type        : 'organization',
			exclude_stakeholder_ids : undefined,
			stakeholder_id          : undefined,
			entity_types            : undefined,
		};
	}
	return {
		stakeholder_type        : undefined,
		exclude_stakeholder_ids : undefined,
		stakeholder_id          : undefined,
		entity_types            : undefined,
	};
};

export const changeFilters = ({ values, setFilters = () => {} }) => {
	setFilters((previousState) => ({
		...getFilter(null),
		...previousState,
		...values,
	}));
};

export const onResetFilters = ({ setFilters = () => {} }) => {
	setFilters((previousState) => ({
		...getFilter(undefined),
		...previousState,
		...resetFilters,
	}));
};
