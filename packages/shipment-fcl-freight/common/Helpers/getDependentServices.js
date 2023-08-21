import dependentServicesArray from '../../configurations/dependent-services-array.json';

export default function getDependentServices({ servicesList = [], serviceData = {} }) {
	let dependentServices = (servicesList || []).filter(
		(service) => dependentServicesArray.includes(service?.service_type),
	);

	dependentServices = dependentServices.filter(
		(service) => serviceData?.container_size === service?.container_size
        && serviceData?.container_type === service?.container_type,
	);

	return dependentServices;
}
