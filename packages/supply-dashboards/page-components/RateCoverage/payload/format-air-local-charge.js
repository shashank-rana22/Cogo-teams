const formatAirLocalCharge = (payload, values, charge) => {
	const tradeType = charge === 'export:air_freight_local' ? 'export' : 'import';
	const airportId = charge === 'export:air_freight_local'
		? payload?.origin_airport_id
		: payload?.destination_airport_id;
	const payloadRequired = {
		commodity           : payload?.commodity,
		commodity_type      : payload?.commodity_type || 'all',
		airport_id          : airportId,
		airline_id          : payload.airline_id,
		service_provider_id : payload?.service_provider_id,
		procured_by_id      : payload?.procured_by_id,
		sourced_by_id       : payload?.sourced_by_id,
		trade_type          : tradeType,
		...values,
		line_items          : values.line_items.map((charges) => ({
			...charges,
			remarks: charges?.remarks ? [charges.remarks] : undefined,
		})),
		line_items_label: undefined,
	};
	return payloadRequired;
};

export default formatAirLocalCharge;
