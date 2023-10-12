const airPayload = ({ service, value }) => {
	const KEY1 = 'origin_local';
	const KEY2 = 'destination_local';

	const LINE_ITEMS = [];
	value?.freights.forEach((item) => {
		const val = {
			code      : item?.code,
			unit      : item?.unit,
			currency  : item?.currency,
			price     : Number(item?.price),
			min_price : Number(item?.min_price),
		};
		LINE_ITEMS.push(val);
	});
	const ORIGIN_LINE_ITEMS = [];
	(value?.origin_local || []).forEach((item) => {
		const val = {
			code      : item?.code,
			unit      : item?.unit,
			currency  : item?.currency,
			price     : Number(item?.price),
			min_price : Number(item?.min_price),
		};
		ORIGIN_LINE_ITEMS.push(val);
	});

	const DESTINATION_LINE_ITEMS = [];
	(value?.destination_local || []).forEach((item) => {
		const val = {
			code      : item?.code,
			unit      : item?.unit,
			currency  : item?.currency,
			price     : Number(item?.price),
			min_price : Number(item?.min_price),
		};
		DESTINATION_LINE_ITEMS.push(val);
	});

	const SURCHARGE_LINE_ITEMS = [];
	(value?.surcharge || []).forEach((item) => {
		const val = {
			code     : item?.code,
			unit     : item?.unit,
			currency : item?.currency,
			price    : Number(item?.price),
		};
		SURCHARGE_LINE_ITEMS.push(val);
	});

	const ORIGIN_SLABS = [];
	(value?.origin_slabs || []).forEach((item) => {
		const val = {
			lower_limit : Number(item?.lower_limit),
			upper_limit : Number(item?.upper_limit),
			currency    : item?.currency,
			price       : Number(item?.price),
		};
		ORIGIN_SLABS.push(val);
	});
	const DESTINATION_SLABS = [];
	(value?.destination_slabs || []).forEach((item) => {
		const val = {
			lower_limit : Number(item?.lower_limit),
			upper_limit : Number(item?.upper_limit),
			currency    : item?.currency,
			price       : Number(item?.price),
		};
		DESTINATION_SLABS.push(val);
	});

	const payload = {
		service_provider_id            : value?.service_provider_id,
		rate_reference_number          : value?.rate_reference_number || undefined,
		booking_rate_procurement_proof : value?.booking_rate_procurement_proof,
		sourced_by_id                  : value?.sourced_by_id,
		spot_negotiation_id            : service?.id,
		data                           : {
			airline_id          : value?.airline_id,
			operation_type      : value?.operation_type,
			[KEY1]              : { line_items: ORIGIN_LINE_ITEMS },
			[KEY2]              : { line_items: DESTINATION_LINE_ITEMS },
			surcharge           : { line_items: SURCHARGE_LINE_ITEMS },
			destination_storage : {
				slabs      : DESTINATION_SLABS,
				unit       : value?.destination_unit,
				free_limit : Number(value?.destination_free_limit || 0),
			},
			origin_storage: {
				slabs      : ORIGIN_SLABS,
				unit       : value?.origin_unit,
				free_limit : Number(value?.origin_free_limit || 0),
			},
			freights: [{
				validity_end   : value?.validity_end,
				validity_start : value?.validity_start,
				line_items     : LINE_ITEMS,
			}],
			origin_main_port_id      : value?.origin_main_port_id,
			destination_main_port_id : value?.destination_main_port_id,
		},
	};

	return payload;
};

export default airPayload;
