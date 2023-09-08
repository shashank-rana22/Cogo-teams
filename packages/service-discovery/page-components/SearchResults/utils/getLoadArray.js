import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const getLoadArray = (search_type, serviceDetails) => {
	const LOAD = [];

	Object.keys(serviceDetails).forEach((serviceId) => {
		const service = serviceDetails[serviceId];

		if (search_type === service.service_type) {
			if (
				service.service_type === 'fcl_freight'
				|| service.service_type === 'fcl_freight_local'
			) {
				LOAD.push({
					cargo_weight_per_container : service.cargo_weight_per_container,
					commodity                  : service.commodity,
					container_size             : service.container_size,
					container_type             : service.container_type,
					containers_count           : service.containers_count,
				});
			} else if (service.service_type === 'lcl_freight') {
				LOAD.push({
					packages_count : service.packages_count,
					commodity      : service.commodity,
					weight         : service.weight,
					volume         : service.volume,
				});
			} else if (service.service_type === 'ftl_freight') {
				LOAD.push({
					volume       : service.volume,
					weight       : service.weight,
					packages     : service.packages,
					trip_type    : service.trip_type,
					truck_type   : service.truck_type,
					trucks_count : service.trucks_count,
				});
			} else if (service.service_type === 'ltl_freight') {
				LOAD.push({
					commodity            : service.commodity,
					cargo_readiness_date : service.cargo_readiness_date,
					volume               : service.volume,
					weight               : service.weight,
					height               : service.packages?.[GLOBAL_CONSTANTS.zeroth_index].height,
					length               : service.packages?.[GLOBAL_CONSTANTS.zeroth_index].length,
					width                : service.packages?.[GLOBAL_CONSTANTS.zeroth_index].width,
					package_type         : service.packages?.[GLOBAL_CONSTANTS.zeroth_index].packing_type,
					packages_count       : service.packages?.[GLOBAL_CONSTANTS.zeroth_index].packages_count,
					stackability         : service.packages?.[GLOBAL_CONSTANTS.zeroth_index].handling_type,
				});
			} else if (service.service_type === 'air_freight') {
				LOAD.push({
					packages             : service?.packages,
					commodity_details    : service?.commodity_details,
					commodity            : service.commodity,
					cargo_clearance_date : service.cargo_clearance_date,
					weight               : service.weight,
					volume               : service.volume,
				});
			} else if (service.service_type === 'trailer_freight') {
				LOAD.push({
					cargo_weight_per_container : service.cargo_weight_per_container,
					commodity                  : service.commodity,
					container_size             : service.container_size,
					container_type             : service.container_type,
					containers_count           : service.containers_count,
					trip_type                  : service.trip_type,
				});
			} else if (service.service_type === 'haulage_freight') {
				LOAD.push({
					cargo_weight_per_container : service.cargo_weight_per_container,
					commodity                  : service.commodity,
					container_size             : service.container_size,
					container_type             : service.container_type,
					containers_count           : service.containers_count,
					trip_type                  : service.trip_type,
				});
			}
		}
	});

	return LOAD;
};

export default getLoadArray;
