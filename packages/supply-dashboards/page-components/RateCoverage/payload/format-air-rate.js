const formatAirRate = (data, user_id) => {
	const payload = {
		origin_airport_id: data?.origin_airport_id,
		destination_airport_id:
			data?.destination_airport_id,
		booking_rate_procurement_proof : data?.booking_rate_procurement_proof,
		commodity                      : data?.commodity || 'all',
		commodity_type                 : data?.commodity_type || 'all',
		commodity_sub_type             : data?.commodity_sub_type || 'all',
		container_size                 : data?.container_size,
		container_type                 : data?.container_type,
		service_provider_id            : data?.service_provider_id,
		validity_start                 : data?.validity_start,
		validity_end                   : data?.validity_end,
		sourced_by_id                  : data?.sourced_by_id,
		price_type                     : data?.price_type,
		procured_by_id                 : data?.procured_by_id || user_id,
		airline_id                     : data?.airline_id,
		min_price                      : Number(data?.minimum_price),
		discount_type                  : data?.discount_type,
		operation_type                 : data?.flight_operation_type,
		currency                       : data?.currency,
		weight_slabs                   : (data?.weight_slabs || []).map((item) => ({
			lower_limit  : item?.lower_limit,
			upper_limit  : item?.upper_limit,
			tariff_price : item?.price_per_unit || item?.price,
			currency     : item?.currency || data?.currency,
		})),
	};
	return payload;
};

export default formatAirRate;
