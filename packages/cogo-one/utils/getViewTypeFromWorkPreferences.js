const COGOVERSE_AGENT_MAPPINGS = {
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
		'marketing',
		'trade_finance',
		'cogo_academy',
		'kyc_demo',
	],
	shipment_specialist : ['shipment_specialist'],
	cp_support          : ['cp_support'],
	support_admin       : ['support_admin'],
	supply_admin        : ['supply_admin'],
	sales_admin         : ['sales_admin'],
};

const DEFAULT_VIEW_TYPE = 'sales';

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