const dependentServices = {
	fcl_freight_service: [
		'fcl_freight_local_service',
		'haulage_freight_service',
		'trailer_freight_service',
		'fcl_customs_service',
		'fcl_cfs_service',
	],
	lcl_freight_service           : ['lcl_freight_local_service', 'lcl_customs_service'],
	air_freight_service           : ['air_freight_local_service', 'air_customs_service'],
	rail_domestic_freight_service : ['rail_domestic_freight_service'],
};

const uniqueServices = (filteredServices, currentService) => filteredServices.filter(
	(service) => currentService.container_size === service.container_size
			&& currentService.container_type === service.container_type,
);

function getDependentServices({
	currentService, services,
}) {
	const dependentServicesArr = dependentServices[currentService?.service_type];
	if (dependentServices) {
		const filteredServices = services.filter((service) => dependentServicesArr.includes(service?.service_type));
		if (currentService.service_type === 'fcl_freight_service') {
			return uniqueServices(filteredServices, currentService);
		}
		return filteredServices;
	}
	return null;
}
export default getDependentServices;
