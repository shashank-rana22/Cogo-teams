const INCREMENT_VALUE = 1;

const formatLclCustomsRate = (data, user_id) => {
	const CUSTOMS_LINE_ITEM = [];
	const customCharges = data.line_items;
	for (let i = 0; i < customCharges.length; i += INCREMENT_VALUE) {
		const obj = {
			code     : customCharges[i].customs_code,
			currency : customCharges[i].currency,
			price    : Number(customCharges[i].price),
			unit     : customCharges[i].unit,
			remarks  : customCharges[i].remarks ? [customCharges[i].remarks] : [],
		};
		CUSTOMS_LINE_ITEM.push(obj);
	}
	const commodity =		data.commodity === 'all_commodity' ? 'general' : data.commodity;
	const payload = {
		location_id         : data.origin_location_id,
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

export default formatLclCustomsRate;
