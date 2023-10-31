const formatFclCfs = (value) => {
	const free_days = {
		free_days_type : value.free_days_type,
		free_limit     : value.free_limit_days,
		slabs          : value.add_slabs,
	};
	const commodity =		value.commodity === 'all_commodity' ? null : value.commodity;

	const newPayload = {
		cargo_handling_type : value?.cargo_handling_type,
		commodity,
		container_size      : value?.container_size,
		container_type      : value?.container_type,
		free_days           : [free_days],
		line_items          : value.line_items,
		service_provider_id : value.service_provider_id,
		sourced_by_id       : value.sourced_by_id,
		procured_by_id      : value.procured_by_id,
		location_id         : value?.location_id,
		trade_type          : value?.trade_type,
	};
	return newPayload;
};
export default formatFclCfs;
