const getShipmentAgentRuleData = (values) => {
	const { id = '', agent_id = '', shipment_price_slab_config = [] } = values || {};
	const slab_details = shipment_price_slab_config?.map((slab) => ({
		...(slab || {}),
		max_allowed_discount_currency : slab?.slab_unit_currency,
		discount_limit_currency       : slab?.slab_unit_currency,
		slab_unit                     : 'shipment_value',
	}));
	if (id === '') {
		return {
			agent_id,
			slab_details,
		};
	}
	return {
		id,
		slab_details,
	};
};

export default getShipmentAgentRuleData;
