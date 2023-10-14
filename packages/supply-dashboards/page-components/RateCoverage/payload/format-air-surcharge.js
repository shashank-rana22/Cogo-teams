const formatAirSurcharge = (payload, values) => {
	const payloadRequired = {
		...payload,
		validity_start              : undefined,
		validity_end                : undefined,
		weight_slabs                : undefined,
		stacking_type               : undefined,
		shipment_type               : undefined,
		min_price                   : undefined,
		air_freight_rate_request_id : undefined,
		...values,
		line_items_label            : undefined,
	};
	return payloadRequired;
};

export default formatAirSurcharge;
