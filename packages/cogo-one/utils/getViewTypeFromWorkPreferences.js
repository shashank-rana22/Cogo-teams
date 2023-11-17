export const COGOVERSE_AGENT_MAPPINGS = {
	supply: [
		'supply',
		'supply_nvocc',
		'supply_freight_forwarder',
		'supply_shipping_line',
		'supply_relation',
	],
	support: [
		'internal_support',
		'internal_support_admin',
		'support',
		'closed_loop',
	],
	sales: [
		'sales',
		'sales_admin',
		'business_consultant',
		'trade_finance',
		'cogo_academy',
		'kyc_demo',
	],
	shipment_specialist       : ['shipment_specialist'],
	marketing                 : ['marketing'],
	cp_support                : ['cp_support'],
	support_admin             : ['support_admin'],
	supply_admin              : ['supply_admin'],
	sales_admin               : ['sales_admin'],
	shipment_specialist_admin : ['shipment_specialist_admin'],
	cogoone_admin             : ['tech_support'],
	finance                   : ['finance', 'credit_controller'],
	service_ops               : ['service_ops', 'service_ops_admin'],
	hr                        : ['hr', 'hr_admin'],
	admin                     : ['admin'],
	support_supply            : ['support_supply'],
};

const DEFAULT_VIEW_TYPE = 'default';

const getViewTypeFromWorkPreferences = ({ viewTypeFromRoleIds = '', agentType = '' }) => {
	if (viewTypeFromRoleIds === 'cogoone_admin') {
		return viewTypeFromRoleIds;
	}

	if (!agentType) {
		return DEFAULT_VIEW_TYPE;
	}

	const viewType = Object.keys(COGOVERSE_AGENT_MAPPINGS).find(
		(eachKey) => COGOVERSE_AGENT_MAPPINGS[eachKey].includes(agentType),
	);
	return viewType || DEFAULT_VIEW_TYPE;
};

export default getViewTypeFromWorkPreferences;
