const getCreateUpdateWeightSlabPayload = ({ values, item, isCogoAssured }) => {
	const SLABS = [];
	(values?.SLABS || []).forEach((slab) => {
		const val = {
			lower_limit : Number(slab?.lower_limit),
			upper_limit : Number(slab?.upper_limit),
			currency    : slab?.currency,
			price       : Number(slab?.price),
		};
		SLABS.push(val);
	});
	const payload = {
		id                        : item?.id || undefined,
		origin_location_id        : values?.origin_location_id || undefined,
		destination_location_id   : values?.destination_location_id || undefined,
		origin_location_type      : values?.origin_location_type || undefined,
		destination_location_type : values?.destination_location_type || undefined,
		organization_category     : values?.organization_category || undefined,
		shipping_line_id          : values?.shipping_line_id || undefined,
		service_provider_id       : values?.service_provider_id || undefined,
		importer_exporter_id      : values?.importer_exporter_id || undefined,
		is_cogo_assured           : isCogoAssured,
		container_size            : values?.container_size || undefined,
		commodity                 : values?.commodity || undefined,
		max_weight                : Number(values?.max_weight),
		currency                  : values?.currency,
		trade_type                : values?.trade_type || undefined,
		slabs                     : SLABS?.length ? SLABS : undefined,
	};

	return payload;
};

export default getCreateUpdateWeightSlabPayload;
