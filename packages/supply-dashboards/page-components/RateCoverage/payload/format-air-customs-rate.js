const INCREMETN_VALUE = 1;

const formatAirCustomsRate = (data, user_id) => {
	const CUSTOMS_LINE_ITEM = [];
	const customCharges = data?.line_items;
	for (let i = 0; i < customCharges?.length; i += INCREMETN_VALUE) {
		const obj = {
			code     : customCharges[i].code,
			currency : customCharges[i].currency,
			price    : Number(customCharges[i].price),
			unit     : customCharges[i].unit,
			remarks  : customCharges[i].remarks ? [customCharges[i].remarks] : [],
		};
		CUSTOMS_LINE_ITEM.push(obj);
	}

	const commodity = data.commodity === 'all_commodity' ? 'all_commodities' : data.commodity;

	const payload = {
		airport_id          : data.location_id,
		trade_type          : data.trade_type,
		container_size      : data.container_size,
		container_type      : data.container_type,
		commodity,
		service_provider_id : data.service_provider_id,
		sourced_by_id       : data.sourced_by_id,
		procured_by_id      : data.procured_by_id || user_id,
		line_items          : CUSTOMS_LINE_ITEM,
	};
	return payload;
};

export default formatAirCustomsRate;
