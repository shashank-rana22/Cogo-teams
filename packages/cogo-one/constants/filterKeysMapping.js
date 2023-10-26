const PERSONA_FILTER_MAPPINGS = {
	supply: ['supply', 'supply_nvocc', 'supply_freight_forwarder', 'supply_shipping_line', 'supply_admin',
		'supply_relation'],
	support             : ['internal_support', 'support_admin', 'internal_support_admin', 'support', 'closed_loop'],
	sales               : ['sales', 'sales_admin', 'business_consultant', 'trade_finance', 'cogo_academy'],
	shipment_specialist : ['shipment_specialist', 'shipment_specialist_admin'],
	cp_support          : ['cp_support'],
	marketing           : ['marketing'],
	tech_support        : ['tech_support'],
	finance             : ['finance', 'credit_controller'],
	service_ops         : ['service_ops', 'service_ops_admin'],
	hr                  : ['hr', 'hr_admin'],
	admin               : ['admin'],
};

const COGOVERSE_AGENT_FILTERS_MAPPINGS = {
	sales                     : PERSONA_FILTER_MAPPINGS.sales,
	sales_admin               : PERSONA_FILTER_MAPPINGS.sales,
	support                   : PERSONA_FILTER_MAPPINGS.support,
	support_admin             : PERSONA_FILTER_MAPPINGS.support,
	supply                    : PERSONA_FILTER_MAPPINGS.supply,
	supply_admin              : PERSONA_FILTER_MAPPINGS.supply,
	shipment_specialist       : PERSONA_FILTER_MAPPINGS.shipment_specialist,
	shipment_specialist_admin : PERSONA_FILTER_MAPPINGS.shipment_specialist,
	cp_support                : PERSONA_FILTER_MAPPINGS.cp_support,
	marketing                 : PERSONA_FILTER_MAPPINGS.marketing,
	default                   : PERSONA_FILTER_MAPPINGS.sales,
	finance                   : PERSONA_FILTER_MAPPINGS.finance,
	service_ops               : PERSONA_FILTER_MAPPINGS.service_ops,
};

const HR_TEAM_FILTER = PERSONA_FILTER_MAPPINGS.hr;

export { COGOVERSE_AGENT_FILTERS_MAPPINGS, HR_TEAM_FILTER };
