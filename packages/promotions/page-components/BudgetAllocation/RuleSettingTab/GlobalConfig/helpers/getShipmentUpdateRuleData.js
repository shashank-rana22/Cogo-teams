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
	return {
		slab_details : shipment_price_slab_config,
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
