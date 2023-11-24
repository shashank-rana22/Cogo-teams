const paramsMapping = ({ filter, cardData, formValues }) => {
	const Params = {
		origin_port_id      : cardData?.origin_port_id,
		destination_port_id : cardData?.destination_port_id,
		shipping_line_id    : formValues?.shipping_line_id || undefined,
		service_provider_id : formValues?.service_provider_id,
		payment_term        : formValues?.payment_term,
		validity_end        : formValues?.validity_end,
		validity_start      : formValues?.validity_start,

	};

	const customsParams = {
		service_provider_id : cardData?.service_provider_id,
		location_id         : cardData?.location_id || undefined,
		trade_type          : cardData?.trade_type || formValues?.trade_type,
		commodity           : cardData?.commodity || formValues?.commodity || undefined,
		airport_id          : cardData?.airport_id || undefined,
		rate_type           : cardData?.rate_type || formValues?.rate_type || 'market_place',
	};

	const haulageParams = {
		service_provider_id     : cardData?.service_provider_id,
		origin_location_id      : cardData?.origin_location_id,
		destination_location_id : cardData?.destination_location_id,
		haulage_type            : cardData?.haulage_type || formValues?.haulage_type,
		transport_modes         : cardData?.transport_modes || formValues?.transport_modes || ['rail'],
	};

	const fclCfsParams = {
		service_provider_id : cardData?.service_provider_id,
		location_id         : cardData?.location_id || undefined,
		trade_type          : cardData?.trade_type,
		cargo_handling_type : cardData?.cargo_handling_type || formValues?.cargo_handling_type,
	};

	const fclLocalParams = {
		port_id             : cardData?.port_id,
		trade_type          : cardData?.trade_type,
		shipping_line_id    : cardData?.shipping_line_id,
		service_provider_id : cardData?.service_provider_id,
		rate_type           : cardData?.rate_type || formValues?.rate_type || 'market_place',
		commodity           : cardData?.commodity || formValues?.commodity || undefined,
	};

	const airLocalParmas = {
		airport_id          : cardData?.airport_id,
		airline_id          : cardData?.airline_id,
		trade_type          : cardData?.trade_type,
		commodity           : cardData?.commodity,
		service_provider_id : cardData?.service_provider_id,
	};
	if (['fcl_freight', 'lcl_freight'].includes(filter?.service)) {
		return Params;
	}
	if (filter?.service === 'haulage') {
		return haulageParams;
	}
	if (filter?.service === 'fcl_cfs') {
		return fclCfsParams;
	}
	if (['fcl_customs', 'lcl_customs', 'air_customs'].includes(filter?.service)) {
		return customsParams;
	}
	if (filter?.service === 'fcl_freight_local') {
		return fclLocalParams;
	}
	if (filter?.service === 'air_freight_local') {
		return airLocalParmas;
	}
	return Params;
};

export default paramsMapping;
