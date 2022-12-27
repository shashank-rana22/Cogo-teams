import navigationMappings from '@cogoport/layout/navigation-mappings';

const getAllNavigations = () => {
	const allNavs = [];
	Object.values(navigationMappings || {}).forEach((navigation) => {
		if (navigation?.options?.length > 0) {
			navigation.options.forEach((navOpt) => {
				allNavs.push({ label: navOpt?.title, value: navOpt?.key });
			});
		} else {
			allNavs.push({
				label : navigation?.title,
				value : navigation?.key,
			});
		}
	});
	return allNavs;
};

const FUNCTION_SUB_FUNCTION_MAPPING = {
	sales: [
		{ label: 'Customer Success', value: 'customer_success' },
		{ label: 'Field Sales', value: 'field_sales' },
		{ label: 'Strategic Sales', value: 'strategic_sales' },
		{ label: 'CP Sales', value: 'cp_sales' },
		{ label: 'Acquisition', value: 'acquisition' },
		{ label: 'CP Portfolio', value: 'cp_portfolio' },
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
	],
	finance: [{ label: 'Credit Controller', value: 'credit_controller' }],
};

const get_all_sub_functions = (role_functions) => {
	const role_sub_functions = [];
	if (role_functions?.length > 0) {
		role_functions?.forEach((item) => {
			FUNCTION_SUB_FUNCTION_MAPPING[item].forEach((sub_function) => {
				role_sub_functions.push(sub_function);
			});
		});
	} else {
		Object.values(FUNCTION_SUB_FUNCTION_MAPPING).forEach((sub_functions) => {
			sub_functions?.forEach((sub_function) => {
				role_sub_functions.push(sub_function);
			});
		});
	}
	return role_sub_functions;
};

export const controls = (role_functions) => [
	{
		name           : 'stakeholder_id',
		placeholder    : 'Select partner',
		size           : 'lg',
		scope          : 'partner',
		type           : 'select',
		defaultOptions : true,
		caret          : true,
		isClearable    : true,
		optionsListKey : 'partners',
		params         : { filters: { status: 'active' } },
	},
	{
		name           : 'navigation',
		placeholder    : 'Select module',
		size           : 'lg',
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
		size           : 'lg',
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
		],
		params: { filters: { status: 'active' } },
	},
	{
		name           : 'role_sub_functions',
		placeholder    : 'Select Sub-function',
		size           : 'lg',
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
		size           : 'lg',
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
