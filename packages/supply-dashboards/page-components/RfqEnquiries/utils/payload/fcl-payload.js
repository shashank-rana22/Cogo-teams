const fclPayload = ({ service, value }) => {
	const key = service?.data.include_destination_local ? 'destination_local' : 'origin_local';

	const line_items = [];
	value?.line_items.forEach((item) => {
		const val = {
			code     : item?.code,
			unit     : item?.unit,
			currency : item?.currency,
			price    : Number(item?.price),
		};
		line_items.push(val);
	});
	const local_line_items = [];
	value?.local_line_items.forEach((item) => {
		const val = {
			code     : item?.code,
			unit     : item?.unit,
			currency : item?.currency,
			price    : Number(item?.price),
		};
		local_line_items.push(val);
	});
	const payload = {
		service_provider_id   : value?.service_provider_id,
		rate_reference_number : value?.rate_reference_number,
		sourced_by_id         : value?.sourced_by_id,
		spot_negotiation_id   : service?.id,
		data                  : {
			shipping_line_id : value?.shipping_line_id,
			[key]            : { line_items: local_line_items },
			freights         : [{
				validity_end   : value?.validity_end,
				validity_start : value?.validity_start,
				line_items,
			}],
		},
	};

	return payload;
};

export default fclPayload;
