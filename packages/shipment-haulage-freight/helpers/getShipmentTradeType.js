const getShipmentTradeType = ({ shipment_data = {} }) => {
	const { all_services = [] } = shipment_data || {};

	const trade_type = all_services?.find((s) => s?.main_service_id === null)?.trade_type;

	return trade_type;
};

export default getShipmentTradeType;
