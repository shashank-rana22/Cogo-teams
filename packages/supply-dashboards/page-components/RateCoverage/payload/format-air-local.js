const formatAirLocal = (data, user_id, listData) => {
	const payloadRequired = {
		commodity           : listData?.commodity,
		commodity_type      : listData?.commodity_type || 'all',
		airline_id          : listData?.airline_id,
		airport_id          : listData?.airport_id,
		procured_by_id      : user_id,
		service_provider_id : listData?.service_provider_id,
		sourced_by_id       : data?.sourced_by_id,
		trade_type          : listData?.trade_type,
		line_items          : data.line_items.map((charges) => ({
			...charges,
			remarks: charges?.remarks ? [charges.remarks] : undefined,
		})),
		line_items_label: undefined,
	};
	return payloadRequired;
};

export default formatAirLocal;
