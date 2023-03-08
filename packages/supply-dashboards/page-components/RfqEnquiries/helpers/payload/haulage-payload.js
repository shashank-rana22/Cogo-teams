const haulagePayload = ({ service, value }) => {
	const line_items = [];
	value?.freights.forEach((item) => {
		const val = {
			code     : item?.code,
			unit     : item?.unit,
			currency : item?.currency,
			price    : Number(item?.price),
		};
		line_items.push(val);
	});

	const payload = {
		service_provider_id   : value?.service_provider_id,
		rate_reference_number : value?.rate_reference_number,
		sourced_by_id         : value?.sourced_by_id,
		spot_negotiation_id   : service?.id,
		data                  : {
			shipping_line_id        : value?.shipping_line_id,
			line_items,
			transport_mode          : value?.transportation_modes,
			haulage_type            : value?.haulage_type,
			origin_location_id      : value?.destination_main_port_id,
			destination_location_id : value?.origin_main_port_id,
		},
	};

	return payload;
};

export default haulagePayload;
