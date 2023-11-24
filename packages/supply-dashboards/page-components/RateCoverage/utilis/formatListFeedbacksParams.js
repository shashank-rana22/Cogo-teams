const paramsFeedbacksMapping = ({ payload, filter }) => {
	const parmas = {
		port_id             : payload?.port_id,
		trade_type          : payload?.trade_type,
		container_size      : payload?.container_size,
		container_type      : payload?.container_type,
		commodity           : payload?.commodity,
		rate_type           : payload?.rate_type,
		cargo_handling_type : payload?.cargo_handling_type,
	};

	const fcl_local_paramas = {
		port_id             : payload?.port_id,
		trade_type          : payload?.trade_type,
		shipping_line_id    : payload?.shipping_line_id,
		container_size      : payload?.container_size,
		container_type      : payload?.container_type,
		commodity           : payload?.commodity,
		service_provider_id : payload?.service_provider_id,
	};

	const air_local_paramas = {
		airport_id          : payload?.airport_id,
		trade_type          : payload?.trade_type,
		airline_id          : payload?.airline_id,
		commodity           : payload?.commodity,
		service_provider_id : payload?.service_provider_id,
	};

	const haulage_params = {
		shipping_line_id        : payload?.shipping_line_id,
		origin_location_id      : payload?.origin_location_id,
		destination_location_id : payload?.destination_location_id,
		container_size          : payload?.container_size,
		container_type          : payload?.container_type,
		commodity               : payload?.commodity,
		haulage_type            : payload?.haulage_type,
		transport_modes         : payload?.transport_modes,
	};

	const air_customs = {
		airport_id          : payload?.airport_id,
		trade_type          : payload?.trade_type,
		commodity           : payload?.commodity,
		service_provider_id : payload?.service_provider_id,
	};

	if (['fcl_freight_local'].includes(filter?.service)) {
		return fcl_local_paramas;
	}
	if (['air_freight_local'].includes(filter?.service)) {
		return air_local_paramas;
	}
	if (['haulage'].includes(filter?.service)) {
		return haulage_params;
	}
	if (['air_customs'].includes(filter?.service)) {
		return air_customs;
	}
	if (['fcl_customs', 'fcl_cfs'].includes(filter?.service)) {
		return parmas;
	}
	return fcl_local_paramas;
};

export default paramsFeedbacksMapping;
