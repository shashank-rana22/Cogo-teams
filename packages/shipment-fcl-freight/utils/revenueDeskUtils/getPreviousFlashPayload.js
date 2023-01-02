const getPreviousFalshPayload = (shipment_data) => {
	const previousFalshPayload = {
		origin_port_id         : shipment_data?.origin_port?.id,
		origin_country_id      : shipment_data?.origin_port?.country?.id,
		destination_port_id    : shipment_data?.destination_port?.id,
		destination_country_id : shipment_data?.destination_port?.country?.id,
		container_size         : shipment_data?.container_size,
		container_type         : shipment_data?.container_type,
		commodity              : shipment_data?.commodity,
		shipping_line_id       : shipment_data?.shipping_line?.id,
		trade_tyep             : shipment_data?.trade_type,
		origin_airport_id      : shipment_data?.origin_airport?.id,
		destination_airport_id : shipment_data?.destination_airport?.id,
	};

	const filteredData = {};
	Object.keys(previousFalshPayload).forEach((key) => {
		if (previousFalshPayload[key]) {
			filteredData[key] = previousFalshPayload[key];
		}
	});
	return { options: filteredData };
};
export default getPreviousFalshPayload;
