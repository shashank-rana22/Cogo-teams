const getCreateUpdateWeightSlabPayload = ({ values, item, isCogoAssured }) => {
	const {
		origin_location_id,
		destination_location_id,
		origin_location_type,
		destination_location_type,
		organization_category,
		shipping_line_id,
		service_provider_id,
		importer_exporter_id,
		container_size,
		commodity,
		max_weight,
		currency,
		trade_type,
		slabs,
	} = values || {};

	const SLABS = [];
	(slabs || []).forEach((slab) => {
		const val = {
			lower_limit : Number(slab?.lower_limit) || undefined,
			upper_limit : Number(slab?.upper_limit) || undefined,
			currency    : slab?.currency,
			price       : Number(slab?.price) || undefined,
		};
		SLABS.push(val);
	});

	const payload = {
		id                        : item?.id || undefined,
		origin_location_id        : origin_location_id || undefined,
		destination_location_id   : destination_location_id || undefined,
		origin_location_type      : origin_location_type || undefined,
		destination_location_type : destination_location_type || undefined,
		organization_category     : organization_category || undefined,
		shipping_line_id          : shipping_line_id || undefined,
		service_provider_id       : service_provider_id || undefined,
		importer_exporter_id      : importer_exporter_id || undefined,
		is_cogo_assured           : !!isCogoAssured,
		container_size            : container_size || undefined,
		commodity                 : commodity || undefined,
		max_weight                : Number(max_weight) || undefined,
		currency,
		trade_type                : trade_type || undefined,
		slabs                     : SLABS?.length ? SLABS : undefined,
	};

	return payload;
};

export default getCreateUpdateWeightSlabPayload;
