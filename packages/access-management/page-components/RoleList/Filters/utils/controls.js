import navigationMappingAdmin from '@cogoport/navigation-configs/navigation-mapping-admin';

const resetFilters = {
	hierarchy_level    : undefined,
	navigation         : undefined,
	q                  : undefined,
	role_functions     : undefined,
	role_sub_functions : undefined,
	stakeholder_id     : undefined,
};

const MIN_ARRAY_LENGTH = 0;

const getAllNavigations = () => {
	const ALL_NAVS = [];
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

const FUNCTION_SUB_FUNCTION_MAPPING = {
	sales: [
		{ label: 'Customer Success', value: 'customer_success' },
		{ label: 'Field Sales', value: 'field_sales' },
		{ label: 'Strategic Sales', value: 'strategic_sales' },
		{ label: 'CP Sales', value: 'cp_sales' },
		{ label: 'Acquisition', value: 'acquisition' },
		{ label: 'CP Portfolio', value: 'cp_portfolio' },
		{ label: 'Customer Operations', value: 'customer_operations' },
	],
	supply: [
		{ label: 'Shipping Line', value: 'shipping_line' },
		{ label: 'Freight Forwarder', value: 'freight_forwarder' },
		{ label: 'Transportation', value: 'transportation' },
		{ label: 'CFS', value: 'cfs' },
		{ label: 'Customs', value: 'customs' },
		{ label: 'NVOCC', value: 'nvocc' },
		{ label: 'Overseas', value: 'overseas' },
		{ label: 'IATA Agents', value: 'iata_agents' },
	],
	operations: [
		{ label: 'Booking Desk', value: 'booking_desk' },
		{ label: 'Post Shipment', value: 'post_shipment' },
		{ label: 'FINOPS', value: 'finops' },
		{ label: 'Common Customer Operations', value: 'common_customer_operations' },
		{ label: 'CP Customer Operations', value: 'cp_customer_operations' },
		{ label: 'Mid Size Customer Operations', value: 'mid_size_customer_operations' },
		{ label: 'Enterprise Customer Operations', value: 'enterprise_customer_operations' },
	],
	finance  : [{ label: 'Credit Controller', value: 'credit_controller' }],
	training : [
		{ label: 'Training General', value: 'training_general' },
		{ label: 'Tech', value: 'tech' },
		{ label: 'Product', value: 'product' },
	],
	hr: [
		{ label: 'HR Admin', value: 'hr_admin' },
		{ label: 'HRBP', value: 'hrbp' },
		{ label: 'Talent Acquisition', value: 'talent_acquisition' },
	],
	external: [
		{ label: 'Enrichment', value: 'enrichment' },
	],
};

const get_all_sub_functions = (role_functions) => {
	const ROLE_SUB_FUNCTIONS = [];
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

export const controls = (role_functions, partnerOptions) => [
	{
		...partnerOptions,
		name        : 'stakeholder_id',
		placeholder : 'Select partner',
		type        : 'select',
		isClearable : true,
		params      : { filters: { status: 'active' } },
	},
	{
		name           : 'navigation',
		placeholder    : 'Select module',
		scope          : 'partner',
		type           : 'select',
		defaultOptions : true,
		caret          : true,
		isClearable    : true,
		options        : getAllNavigations(),
	},
	{
		name           : 'role_functions',
		placeholder    : 'Select Function',
		scope          : 'partner',
		type           : 'multiSelect',
		defaultOptions : true,
		caret          : true,
		isClearable    : true,
		options        : [
			{
				label : 'Sales',
				value : 'sales',
			},
			{
				label : 'Supply',
				value : 'supply',
			},
			{
				label : 'Operations',
				value : 'operations',
			},
			{
				label : 'Finance',
				value : 'finance',
			},
			{
				label : 'External',
				value : 'external',
			},
		],
		params: { filters: { status: 'active' } },
	},
	{
		name           : 'role_sub_functions',
		placeholder    : 'Select Sub-function',
		scope          : 'partner',
		type           : 'multiSelect',
		defaultOptions : true,
		options        : get_all_sub_functions(role_functions),
		caret          : true,
		isClearable    : true,
		params         : { filters: { status: 'active' } },
	},
	{
		name           : 'hierarchy_level',
		placeholder    : 'Select Level',
		scope          : 'partner',
		type           : 'select',
		defaultOptions : true,
		caret          : true,
		isClearable    : true,
		options        : [
			{
				label : 'Owner',
				value : 'owner',
			},
			{
				label : 'Manager',
				value : 'manager',
			},
			{
				label : 'Function Head',
				value : 'function_head',
			},
			{
				label : 'Head',
				value : 'head',
			},
			{
				label : 'Zone Head',
				value : 'zone_head',
			},
			{
				label : 'Region Head',
				value : 'region_head',
			},
			{
				label : 'Cluster Head',
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
