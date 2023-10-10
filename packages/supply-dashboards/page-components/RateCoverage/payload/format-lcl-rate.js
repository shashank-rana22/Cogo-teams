const formatLclRate = (data, user_id) => {
	const payload = {
		procured_by_id : data?.procured_by_id || user_id,
		sourced_by_id  : data?.sourced_by_id,
		origin_port_id : data?.origin_location_id,
		destination_port_id:
			data?.destination_location_id,
		service_provider_id : data?.service_provider_id,
		commodity           : data?.commodity,
		validity_start      : data?.validity_start,
		validity_end        : data?.validity_end,
		number_of_stops     : Number(data?.number_of_stops),
		transit_time        : Number(data?.transit_time),
		departure_dates     : data?.departure_dates,
		line_items          : data.line_items.map((charge) => ({
			...charge,
			code      : charge.code,
			price     : Number(charge.price),
			min_price : Number(charge.min_price),
		})),
	};
	return payload;
};

export default formatLclRate;
