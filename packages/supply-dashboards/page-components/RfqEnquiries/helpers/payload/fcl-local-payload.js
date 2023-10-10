const fclPayload = ({ service, value }) => {
	const LINE_ITEMS = [];
	value?.freights.forEach((item) => {
		const val = {
			code     : item?.code,
			unit     : item?.unit,
			currency : item?.currency,
			price    : Number(item?.price),
		};
		LINE_ITEMS.push(val);
	});

	const payload = {
		service_provider_id            : value?.service_provider_id,
		rate_reference_number          : value?.rate_reference_number || undefined,
		booking_rate_procurement_proof : value?.booking_rate_procurement_proof,
		sourced_by_id                  : value?.sourced_by_id,
		spot_negotiation_id            : service?.id,
		data                           : {
			shipping_line_id : value?.shipping_line_id,
			main_port_id     : value?.main_port_id || undefined,
			line_items       : LINE_ITEMS,
		},
	};

	return payload;
};

export default fclPayload;
