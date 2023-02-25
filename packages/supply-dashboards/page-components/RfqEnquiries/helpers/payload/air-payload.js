const airPayload = ({ service, value }) => {
	const key1 = 'origin_local';
	const key2 = 'destination_local';

	const line_items = [];
	value?.freights.forEach((item) => {
		const val = {
			code      : item?.code,
			unit      : item?.unit,
			currency  : item?.currency,
			price     : Number(item?.price),
			min_price : Number(item?.min_price),
		};
		line_items.push(val);
	});
	const origin_line_items = [];
	(value?.origin_local || []).forEach((item) => {
		const val = {
			code      : item?.code,
			unit      : item?.unit,
			currency  : item?.currency,
			price     : Number(item?.price),
			min_price : Number(item?.min_price),
		};
		origin_line_items.push(val);
	});

	const destination_line_items = [];
	(value?.destination_local || []).forEach((item) => {
		const val = {
			code      : item?.code,
			unit      : item?.unit,
			currency  : item?.currency,
			price     : Number(item?.price),
			min_price : Number(item?.min_price),
		};
		destination_line_items.push(val);
	});

	const surcharge_line_items = [];
	(value?.surcharge || []).forEach((item) => {
		const val = {
			code     : item?.code,
			unit     : item?.unit,
			currency : item?.currency,
			price    : Number(item?.price),
		};
		surcharge_line_items.push(val);
	});

	const origin_slabs = [];
	(value?.origin_slabs || []).forEach((item) => {
		const val = {
			lower_limit : Number(item?.lower_limit),
			upper_limit : Number(item?.upper_limit),
			currency    : item?.currency,
			price       : Number(item?.price),
		};
		origin_slabs.push(val);
	});
	const destination_slabs = [];
	(value?.destination_slabs || []).forEach((item) => {
		const val = {
			lower_limit : Number(item?.lower_limit),
			upper_limit : Number(item?.upper_limit),
			currency    : item?.currency,
			price       : Number(item?.price),
		};
		destination_slabs.push(val);
	});

	const payload = {
		service_provider_id            : value?.service_provider_id,
		rate_reference_number          : value?.rate_reference_number || undefined,
		booking_rate_procurement_proof : value?.booking_rate_procurement_proof,
		sourced_by_id                  : value?.sourced_by_id,
		spot_negotiation_id            : service?.id,
		data                           : {
			airline_id          : value?.airline_id,
			[key1]              : { line_items: origin_line_items },
			[key2]              : { line_items: destination_line_items },
			surcharge           : { line_items: surcharge_line_items },
			destination_storage : {
				slabs      : destination_slabs,
				unit       : value?.destination_unit,
				free_limit : Number(value?.destination_free_limit || 0),
			},
			origin_storage: {
				slabs      : origin_slabs,
				unit       : value?.origin_unit,
				free_limit : Number(value?.origin_free_limit || 0),
			},
			freights: [{
				validity_end   : value?.validity_end,
				validity_start : value?.validity_start,
				line_items,
			}],
			origin_main_port_id      : value?.origin_main_port_id,
			destination_main_port_id : value?.destination_main_port_id,
		},
	};

	return payload;
};

export default airPayload;
