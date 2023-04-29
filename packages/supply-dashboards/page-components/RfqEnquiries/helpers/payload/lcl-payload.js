const lclPayload = ({ service, value }) => {
	const key1 = 'origin_local';
	const key2 = 'destination_local';

	const line_items = [];
	value?.freights.forEach((item) => {
		const val = {
			code             : item?.code,
			unit             : item?.unit,
			currency         : item?.currency,
			price            : Number(item?.price),
			min_price        : Number(item?.min_price),
			cbm_weight_ratio : Number(item?.cbm_weight_ratio),
		};
		line_items.push(val);
	});
	const origin_line_items = [];
	(value?.origin_local || []).forEach((item) => {
		const val = {
			code             : item?.code,
			unit             : item?.unit,
			currency         : item?.currency,
			price            : Number(item?.price),
			min_price        : Number(item?.min_price),
			cbm_weight_ratio : Number(item?.cbm_weight_ratio),
		};
		origin_line_items.push(val);
	});

	const destination_line_items = [];
	(value?.destination_local || []).forEach((item) => {
		const val = {
			code             : item?.code,
			unit             : item?.unit,
			currency         : item?.currency,
			price            : Number(item?.price),
			min_price        : Number(item?.min_price),
			cbm_weight_ratio : Number(item?.cbm_weight_ratio),
		};
		destination_line_items.push(val);
	});

	const slabs = [];
	(value?.slabs || []).forEach((item) => {
		const val = {
			lower_limit : Number(item?.lower_limit),
			upper_limit : Number(item?.upper_limit),
			currency    : item?.currency,
			price       : Number(item?.price),
		};
		slabs.push(val);
	});

	const payload = {
		service_provider_id            : value?.service_provider_id,
		rate_reference_number          : value?.rate_reference_number || undefined,
		booking_rate_procurement_proof : value?.booking_rate_procurement_proof,
		sourced_by_id                  : value?.sourced_by_id,
		spot_negotiation_id            : service?.id,
		data                           : {
			shipping_line_id    : value?.shipping_line_id,
			[key1]              : { line_items: origin_line_items },
			[key2]              : { line_items: destination_line_items },
			destination_storage : {
				slabs,
				free_limit : Number(value?.free_limit || 0),
				unit       : value?.unit || 'per_kg_per_day',
			},
			freights: [{
				validity_end    : value?.validity_end,
				validity_start  : value?.validity_start,
				departure_dates : value?.departure_dates,
				line_items,
				transit_time    : Number(value?.transit_time),
				number_of_stops : Number(value?.number_of_stops),
			}],
		},
	};

	return payload;
};

export default lclPayload;
