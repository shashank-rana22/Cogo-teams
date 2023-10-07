const formatFclFreightLocal = ({ payload, trade_type }) => {
	let main_port_id;
	if (trade_type === 'export' && payload?.origin_main_port_id) {
		main_port_id = payload?.origin_main_port_id || undefined;
	}
	if (trade_type === 'import' && payload?.destination_main_port_id) {
		main_port_id = payload?.destination_main_port_id || undefined;
	}
	const commodity =		payload?.commodity === 'general' ? 'null' : payload?.commodity;
	const newPayload = {
		service_provider_id: payload?.service_provider_id,
		port_id:
			trade_type === 'export'
				? payload?.origin_port_id
				: payload?.destination_port_id,
		main_port_id,
		trade_type,
		container_size   : payload?.container_size,
		commodity,
		container_type   : payload?.container_type,
		shipping_line_id : payload?.shipping_line_id,
	};
	return newPayload;
};
export default formatFclFreightLocal;
