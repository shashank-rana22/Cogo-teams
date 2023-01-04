const airPayload = ({ service, value }) => {
	const localType = service?.data.include_destination_local ? 'destination_local' : 'origin_local';
	const storageType = service?.data.destination_storage_free_days ? 'destination_storage' : 'origin_storage';
	const payload = {
		service_provider_id            : value?.service_provider_id,
		rate_reference_number          : value?.rate_reference_number,
		booking_rate_procurement_proof : value?.booking_rate_procurement_proof,
		sourced_by_id                  : value?.sourced_by_id,
		spot_negotiation_id            : service?.id,
		data                           : {
			airline_id  : value?.airline_id,
			[localType] : {
				line_items: value?.local_line_items.map((charge) => ({
					...charge,
					price     : Number(charge.price),
					min_price : Number(charge.min_price),
				})),
			} || undefined,
			freights: [{
				validity_start : value?.validity_start,
				validity_end   : value?.validity_end,
				line_items     : value?.line_items.map((charge) => ({
					...charge,
					price     : Number(charge.price),
					min_price : Number(charge.min_price),
				})),
			}],
			surcharge     : { line_items: value?.surcharge },
			[storageType] : {
				free_limit : value?.free_days,
				unit       : value?.unit,
				slabs      : value?.days_slab.map((slab) => ({
					...slab,
					price       : Number(slab.price),
					lower_limit : Number(slab.lower_limit),
					upper_limit : Number(slab.upper_limit),

				})),
			} || undefined,
		},
	};

	return payload;
};

export default airPayload;
