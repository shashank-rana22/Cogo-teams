const formatPortPair = ({ item }) => {
	const serviceDataMapping = {
		fcl_freight : 'fcl_freight_services',
		lcl_freight : 'lcl_freight_services',
		air_freight : 'air_freight_services',
	};

	const incoTermMapping = {
		cif : 'export',
		cfr : 'export',
		cpt : 'export',
		cip : 'export',
		dat : 'export',
		dap : 'export',
		ddp : 'export',
		fob : 'import',
		exw : 'import',
		fca : 'import',
		fas : 'import',
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

	const formattedData = serviceData.map((val, index) => ({
		id                 	: item[serviceDataMapping?.[val?.service_type]][index]?.id,
		origin              : val?.origin_port?.display_name || val?.origin_airport?.display_name,
		destination         : val?.destination_port?.display_name || val?.destination_airport?.display_name,
		origin_code         : val?.origin_port?.port_code || val?.origin_airport?.port_code,
		destination_code    : val?.destination_port?.port_code || val?.destination_airport?.port_code,
		service_type        : val?.service_type,
		trade_type          : val?.trade_type || incoTermMapping[val?.inco_term],
		commodity           : val?.commodity,
		container_size      : val?.container_size,
		container_type      : val?.container_type,
		containers_count    : val?.containers_count,
		status              : item[serviceDataMapping?.[val?.service_type]][index]?.status,
		inco_term           : val?.inco_term,
		shipping_line_id    : val?.shipping_line_id,
		origin_port_id      : val?.origin_port_id,
		destination_port_id : val?.destination_port_id,
	}));

	return formattedData;
};

export default formatPortPair;
