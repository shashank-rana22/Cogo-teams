function getServicesStateMapping(servicesList = []) {
	const MAPPING = {};
	servicesList?.forEach((service) => {
		const { service_type = '', state = '', trade_type = '' } = service;
		if (trade_type === 'export') {
			MAPPING[`origin_${service_type}`] = state;
		}
		if (trade_type === 'import') {
			MAPPING[`destination_${service_type}`] = state;
		}
		MAPPING[service_type] = state;
	});
	return MAPPING;
}

export default getServicesStateMapping;
