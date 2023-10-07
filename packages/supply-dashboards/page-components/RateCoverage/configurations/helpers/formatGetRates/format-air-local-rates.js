const formatAirFreightLocal = ({ payload, trade_type }) => {
	const newPayload = {
		service_provider_id: payload?.service_provider_id,
		airport_id:
			trade_type === 'export'
				? payload?.origin_airport_id
				: payload?.destination_airport_id,
		trade_type,
		commodity  : payload?.commodity,
		airline_id : payload?.airline_id,
	};
	return newPayload;
};
export default formatAirFreightLocal;
