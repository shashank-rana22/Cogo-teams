const MAIN_SERVICES = ['fcl_freight', 'air_freight', 'lcl_freight'];
const OTHER_SERVICES = ['warehouse', 'cargo_insurance'];

const getServiceName = (service) => {
	const { trade_type = '', service_type = '' } = service || {};

	if (MAIN_SERVICES.includes(service_type) || OTHER_SERVICES.includes(service_type)) return service_type;

	return trade_type ? `${trade_type}_${service_type}` : service_type;
};

export default getServiceName;
