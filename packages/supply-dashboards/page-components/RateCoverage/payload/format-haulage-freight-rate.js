const INCREMENT_VALUE = 1;

const formatHaulageFreightRate = (data, user_id, listData) => {
	const LINE_ITEMS = [];
	const charges = data?.line_items || [];
	for (let i = 0; i < charges.length; i += INCREMENT_VALUE) {
		const obj = {
			code     : charges[i].customs_code,
			currency : charges[i].currency,
			price    : Number(charges[i].price),
			unit     : charges[i].unit,
			remarks  : charges[i].remarks ? [charges[i].remarks] : [],
			slabs    : ['IHE', 'IHI'].includes(charges[i].code)
				? (data?.weight_slabs || []).map((slab) => ({
					...slab,
					price       : Number(slab.price),
					lower_limit : Number(slab.lower_limit),
					upper_limit : Number(slab.upper_limit),
				}))
				: undefined,
		};

		LINE_ITEMS.push(obj);
	}
	const commodity =		data.commodity === 'all_commodity' ? null : data.commodity;
	const payload = {
		origin_location_id: data?.origin_location_id,
		destination_location_id:
				data?.destination_location_id,
		container_size      : data?.container_size,
		container_type      : data?.container_type,
		commodity,
		service_provider_id : data?.service_provider_id,
		shipping_line_id    : listData?.shipping_line_id || undefined,
		sourced_by_id       : data?.sourced_by_id,
		procured_by_id      : data?.procured_by_id || user_id,
		haulage_type        : data?.haulage_type,
		transport_modes     : data?.transport_modes,
		line_items          : LINE_ITEMS,
	};
	return payload;
};

export default formatHaulageFreightRate;
