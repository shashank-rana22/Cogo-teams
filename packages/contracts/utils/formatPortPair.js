const formatPortPair = ({ item }) => {
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
		item[`${val}_services`]?.forEach((data) => {
			serviceData.push(
				{
					...data.service_details?.filter((v) => v.service_type === val)[0],
					id               : data?.id,
					status           : data?.status,
					containers_count : data?.max_containers_count,
					weight           : data?.max_weight,
					volume           : data?.max_volume,
				},
			);
		});
	});

	const formattedData = serviceData.map((val) => 	({
		id     : val.id,
		origin : val?.origin_port?.display_name || val?.origin_airport?.display_name,
		destination:
      val?.destination_port?.display_name
      || val?.destination_airport?.display_name,
		origin_code: val?.origin_port?.port_code || val?.origin_airport?.port_code,
		destination_code:
      val?.destination_port?.port_code || val?.destination_airport?.port_code,
		service_type           : val?.service_type,
		trade_type             : val?.trade_type || incoTermMapping[val?.inco_term],
		commodity              : val?.commodity || undefined,
		container_size         : val?.container_size,
		container_type         : val?.container_type,
		status                 : val?.status,
		inco_term              : val?.inco_term,
		shipping_line_id       : val?.shipping_line_id,
		origin_port_id         : val?.origin_port_id,
		destination_port_id    : val?.destination_port_id,
		airline_id             : val?.airline_id,
		destination_airport_id : val?.destination_airport_id,
		origin_airport_id      : val?.origin_airport_id,
		containers_count       : val?.containers_count,
		weight                 : val?.weight,
		volume                 : val?.volume,
	}));

	return formattedData;
};

export default formatPortPair;
