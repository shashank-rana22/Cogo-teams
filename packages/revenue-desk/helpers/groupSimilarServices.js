const groupSimilarServices = (servicesData) => {
	const DEFAULT_INDEX = 0;
	const service_type = servicesData?.[DEFAULT_INDEX]?.service_type;

	if (service_type === 'ftl_freight_service') {
		const NEW_GROUPED = [];
		const TAKEN_TRUCKS = {};

		(servicesData || []).forEach((service) => {
			if (!TAKEN_TRUCKS[`${service.truck_type}_${service.trade_type}`]) {
				NEW_GROUPED.push(service);
				TAKEN_TRUCKS[`${service.truck_type}_${service.trade_type}`] = true;
			}
		});
		return NEW_GROUPED;
	}

	return servicesData;
};

export default groupSimilarServices;
