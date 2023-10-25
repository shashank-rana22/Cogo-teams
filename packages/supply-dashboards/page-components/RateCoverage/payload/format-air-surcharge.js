const formatAirSurcharge = (payload, values) => {
	const payloadRequired = {
		...payload,
		commodity_type              : payload?.commodity_type || 'all',
		validity_start              : undefined,
		validity_end                : undefined,
		weight_slabs                : undefined,
		stacking_type               : undefined,
		shipment_type               : undefined,
		min_price                   : undefined,
		air_freight_rate_request_id : undefined,
		operation_type              : payload?.flight_operation_type,
		...values,
		line_items_label            : undefined,
	};
	return payloadRequired;
};

export default formatAirSurcharge;
