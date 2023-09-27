const getShipmentUpdateAgentRuleData = (values) => {
	const { id = '', shipment_price_slab_config = [] } = values;
	const NEW_ARRAY = [];
	shipment_price_slab_config?.forEach((slab) => {
		NEW_ARRAY.push({
			...slab,
			max_allowed_discount_currency : slab.slab_unit_currency,
			discount_limit_currency       : slab.slab_unit_currency,
			slab_unit                     : 'shipment_value',
		});
	});
	return {
		id,
		slab_details: NEW_ARRAY,
	};
};

export default getShipmentUpdateAgentRuleData;
