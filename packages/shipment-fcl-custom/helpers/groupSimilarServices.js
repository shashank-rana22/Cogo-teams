const groupedSimilarServicesData = (servicesList, service_type, service_id) => {
	const SERVICE_IDS = [];
	let title = {};

	const task_service = (servicesList || [])
		.find((service) => service?.id === service_id);
	const { trade_type } = task_service;
	(servicesList || []).forEach((service) => {
		if (service?.trade_type === trade_type && service?.service_type === service_type) {
			SERVICE_IDS.push(service?.id);
			const commodity = service?.commodity ? service?.commodity : 'All Commodities';
			title = {
				...title,
				[service?.id]: `${service?.containers_count} *
                 ${service?.container_size} ${service?.container_type} ${commodity}`,
			};
		}
	});

	return { similarServiceIds: SERVICE_IDS, title };
};
export default groupedSimilarServicesData;
