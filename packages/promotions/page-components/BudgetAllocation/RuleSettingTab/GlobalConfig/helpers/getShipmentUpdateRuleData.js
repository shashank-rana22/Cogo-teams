const getShipmentUpdateRuleData = (values) => {
	const {
		id = '',
		cogo_entity_id = '',
		organization_id = '',
		rate_source = '',
		trade_type = '',
		organization_type = '',
		organization_sub_type = '',
		shipment_price_slab_config = [],
	} = values;
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
		slab_details : NEW_ARRAY,
		id,
		scope        : values?.scope,
		cogo_entity_id,
		organization_id,
		rate_source,
		trade_type,
		organization_type,
		organization_sub_type,
	};
};

export default getShipmentUpdateRuleData;
