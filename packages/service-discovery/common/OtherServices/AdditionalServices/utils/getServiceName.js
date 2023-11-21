const OTHER_SERVICES = ['warehouse', 'cargo_insurance'];

const getServiceName = (service, primaryService) => {
	const { trade_type = '', service_type = '' } = service || {};

	if (primaryService === service_type || OTHER_SERVICES.includes(service_type)) return service_type;

	return trade_type ? `${trade_type}_${service_type}` : service_type;
};

export default getServiceName;
