const INCREMENT_VALUE = 1;

const formatFclCustomsRate = (data, user_id) => {
	const CUSTOMS_LINE_ITEM = [];
	let customCharges = data.line_items;
	for (let i = 0; i < customCharges.length; i += INCREMENT_VALUE) {
		const obj = {
			code     : customCharges[i].code,
			currency : customCharges[i].currency,
			price    : Number(customCharges[i].price),
			unit     : customCharges[i].unit,
			remarks  : customCharges[i].remarks ? [customCharges[i].remarks] : [],
		};
		CUSTOMS_LINE_ITEM.push(obj);
	}
	customCharges = data.fcl_customs_cfs_line_items;
	const CFS_LINE_ITEM = [];
	for (let i = 0; i < customCharges.length; i += INCREMENT_VALUE) {
		const obj = {
			code     : customCharges[i].cfs_line_items,
			currency : customCharges[i].currency,
			price    : Number(customCharges[i].price),
			unit     : customCharges[i].unit,
			remarks  : customCharges[i].remarks ? [customCharges[i].remarks] : [],
		};
		CFS_LINE_ITEM.push(obj);
	}
	const { commodity } = data;

	const payload = {
		location_id         : data?.origin_location_id,
		trade_type          : data?.trade_type,
		container_size      : data?.container_size,
		container_type      : data?.container_type,
		commodity,
		service_provider_id : data?.service_provider_id,
		sourced_by_id       : data?.sourced_by_id,
		procured_by_id      : data?.procured_by_id || user_id,
		cargo_handling_type : data?.cargo_handling_type,
		customs_line_items  : CUSTOMS_LINE_ITEM,
		cfs_line_items      : CFS_LINE_ITEM,
	};
	return payload;
};

export default formatFclCustomsRate;
