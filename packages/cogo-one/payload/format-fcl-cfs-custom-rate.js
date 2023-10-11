const formatFclCfs = (data, user_id) => {
	const free_days = {
		free_days_type : data.free_days_type,
		free_limit     : data.free_limit_days,
		slabs          : data.add_slabs,
	};
	const commodity = data.commodity === 'all_commodity' ? null : data.commodity;

	const newPayload = {
		cargo_handling_type : data?.cargo_handling_type,
		commodity,
		container_size      : data?.container_size,
		container_type      : data?.container_type,
		free_days           : [free_days],
		line_items          : data.line_items,
		service_provider_id : data.service_provider_id,
		sourced_by_id       : data.sourced_by_id,
		procured_by_id      : data?.procured_by_id || user_id,
		location_id         : data?.origin_location_id,
		trade_type          : data?.trade_type,
	};
	return newPayload;
};
export default formatFclCfs;
