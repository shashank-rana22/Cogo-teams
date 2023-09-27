const getShipmentCreateRuleData = (values) => {
	const { shipment_price_slab_config = [], ...restValues } = values;
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
		...restValues,
		applicable_at: [
			'promotion_creation',
			'negative_margin_applicability',
			'promotion_consumption',
		],
		category     : ['business'],
		slab_details : NEW_ARRAY,
		scope        : values?.scope,
	};
};

export default getShipmentCreateRuleData;
