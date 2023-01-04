const formatPortPair = ({ item }) => {
	const serviceDataMapping = {
		fcl_freight : 'fcl_freight_services',
		lcl_freight : 'lcl_freight_services',
		air_freight : 'air_freight_services',
	};

	const services = item?.services;

	const serviceData = [];
	services?.forEach((val) => {
		item[serviceDataMapping?.[val]]?.forEach((data) => {
			serviceData.push(
				data.service_details?.filter((v) => v.service_type === val)[0],
			);
		});
	});

	const formattedData = serviceData.map((val) => ({
		origin           : val?.origin_port?.display_name,
		destination      : val?.destination_port?.display_name,
		origin_code      : val?.origin_port?.port_code,
		destination_code : val?.destination_port?.port_code,
		service_type     : val?.service_type,
		trade_type       : val?.trade_type,
	}));

	return formattedData;
};

export default formatPortPair;
