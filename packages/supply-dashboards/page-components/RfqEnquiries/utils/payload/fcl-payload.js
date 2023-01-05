const fclPayload = ({ service, value }) => {
	const key1 = 'origin_local';
	const key2 = 'destination_local';
	const key3 = 'destination_detention';

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
	const origin_line_items = [];
	value?.origin_line_items.forEach((item) => {
		const val = {
			code     : item?.code,
			unit     : item?.unit,
			currency : item?.currency,
			price    : Number(item?.price),
		};
		origin_line_items.push(val);
	});

	const destination_line_items = [];
	value?.destination_line_items.forEach((item) => {
		const val = {
			code     : item?.code,
			unit     : item?.unit,
			currency : item?.currency,
			price    : Number(item?.price),
		};
		destination_line_items.push(val);
	});

	const slabs = [];
	value?.slabs.forEach((item) => {
		const val = {
			lower_limit : Number(item?.lower_limit),
			upper_limit : Number(item?.upper_limit),
			currency    : item?.currency,
			price       : Number(item?.price),
		};
		slabs.push(val);
	});

	const payload = {
		service_provider_id   : value?.service_provider_id,
		rate_reference_number : value?.rate_reference_number,
		sourced_by_id         : value?.sourced_by_id,
		spot_negotiation_id   : service?.id,
		data                  : {
			shipping_line_id : value?.shipping_line_id,
			[key1]           : { line_items: origin_line_items },
			[key2]           : { line_items: destination_line_items },
			[key3]           : { slabs, free_limit: Number(value?.free_days), unit: value?.unit },
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
