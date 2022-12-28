/* eslint-disable prefer-destructuring */
import { getByKey } from '@cogoport/utils';

const routeInfo = {

	fcl_customs: {
		origin_pickup         : 'location',
		origin_drop           : '',
		origin_port           : 'port',
		origin_main_port      : 'port_id',
		destination_main_port : '',
		destination_port      : '',
		destination_pickup    : '',
		destination_drop      : '',
	},
	fcl_cfs: {
		origin_pickup         : 'location',
		origin_drop           : '',
		origin_port           : 'port',
		origin_main_port      : 'port_id',
		destination_main_port : '',
		destination_port      : '',
		destination_pickup    : '',
		destination_drop      : '',
	},

	fcl_freight: {
		origin_pickup         : 'origin_pickup',
		origin_drop           : 'origin_drop',
		origin_port           : 'origin_port',
		origin_main_port      : 'origin_main_port',
		destination_main_port : 'destination_main_port',
		destination_port      : 'destination_port',
		destination_pickup    : 'destination_pickup',
		destination_drop      : 'destination_drop',
	},

	fcl_cfs_service: {
		origin_pickup         : '',
		origin_port           : 'port',
		origin_main_port      : '',
		destination_main_port : '',
		destination_port      : '',
		destination_drop      : '',
	},
	fcl_customs_service: {
		origin_pickup         : '',
		origin_port           : 'port',
		origin_main_port      : '',
		destination_main_port : '',
		destination_port      : '',
		destination_drop      : '',
	},
	fcl_freight_service: {
		origin_pickup         : 'origin_location',
		origin_port           : 'origin_port',
		origin_main_port      : 'origin_main_port',
		destination_main_port : 'destination_main_port',
		destination_port      : 'destination_port',
		destination_drop      : 'destination_location',
	},
	fcl_freight_local_service: {
		origin_pickup         : '',
		origin_port           : 'port',
		origin_main_port      : '',
		destination_main_port : '',
		destination_port      : '',
		destination_drop      : '',
		port_of_loading       : 'port_of_loading',
	},
	ftl_freight_service: {
		origin_pickup         : 'origin_location',
		origin_port           : 'origin_port',
		origin_main_port      : '',
		destination_main_port : '',
		destination_port      : 'destination_drop',
		destination_drop      : 'destination_location',
	},
};

const getLocationInfo = (
	service_key,
	data,
	keys = { origin: null, destination: null },
) => {
	if (keys?.destination || keys?.origin) {
		const origin =	getByKey(data, keys?.origin) || getByKey(data, keys?.alternateOrigin);

		const destination =	getByKey(data, keys?.destination) || getByKey(data, keys?.alternateDestination);

		return { origin, destination };
	}

	let service_type = data[service_key] || '';
	if (service_type.includes('origin')) {
		service_type = service_type.split('origin_')[1];
	}

	if (service_type.includes('destination')) {
		service_type = service_type.split('destination_')[1];
	}

	const serviceRoute = routeInfo[service_type];
	if (serviceRoute) {
		const origin = data[serviceRoute?.port_of_loading]
			|| data[serviceRoute?.origin_pickup]
			|| data[serviceRoute?.origin_port]
			|| data[serviceRoute?.origin_main_port]
			|| data[serviceRoute?.origin_location];

		let destination = data[serviceRoute?.destination_drop]
			|| data[serviceRoute?.destination_port]
			|| data[serviceRoute?.destination_main_port]
			|| data[serviceRoute?.destination_location];

		if (data[serviceRoute?.port_of_loading]) {
			destination = data[serviceRoute?.origin_port];
		}

		return { origin, destination };
	}

	return { origin: null, destination: null };
};

export default getLocationInfo;
