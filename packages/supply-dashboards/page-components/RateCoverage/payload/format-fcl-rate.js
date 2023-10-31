const formatFclRate = (data, user_id) => {
	const isEmpty = data?.weight_slabs.every((slab) => (
		slab.lower_limit === '' && slab.upper_limit === '' && slab.currency === '' && slab.price === ''
	));
	const weightSlabs = isEmpty ? [] : data?.weight_slabs?.map((slab) => ({
		...slab,
		lower_limit : Number(slab.lower_limit),
		upper_limit : Number(slab.upper_limit),
		price       : Number(slab.price),
	}));

	const payload = {
		origin_port_id           : data?.origin_location_id,
		destination_port_id      : data?.destination_location_id,
		origin_main_port_id      : data?.origin_main_port_id || undefined,
		destination_main_port_id : data?.destination_main_port_id || undefined,
		container_size           : data?.container_size,
		container_type           : data?.container_type,
		commodity                : data?.commodity,
		service_provider_id      : data?.service_provider_id,
		validity_start           : data?.validity_start,
		validity_end             : data?.validity_end,
		sourced_by_id            : data?.sourced_by_id,
		procured_by_id           : data?.procured_by_id || user_id,
		shipping_line_id         : data?.shipping_line_id,
		payment_term             : data?.payment_term,
		schedule_type            : data?.schedule_type,
		rate_type                : data?.rate_type,
		line_items               : data?.line_items?.map((charge) => ({
			...charge,
			price: Number(charge.price),
			slabs:
				data?.container_slabs.length && charge.code === 'BAS'
					? (data?.container_slabs || [])?.map((slab) => ({
						...slab,
						price       : Number(slab.price),
						lower_limit : Number(slab.lower_limit),
						upper_limit : Number(slab.upper_limit),
					}))
					: undefined,
			remarks: charge.remarks ? [charge.remarks] : undefined,
		})),
		weight_limit: data?.free_weight ? {
			free_limit : Number(data?.free_weight),
			slabs      : weightSlabs,
		} : undefined,
		destination_local: data?.detention_free_days
			? {
				detention: { free_limit: Number(data?.detention_free_days) },
			}
			: undefined,
	};
	return payload;
};

export default formatFclRate;
