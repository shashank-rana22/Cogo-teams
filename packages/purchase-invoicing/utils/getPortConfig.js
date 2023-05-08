import getConfigs from './getConfig';
import getLocationShipmentDetails from './getLocationShipmentDetails';
import isSingleLocation from './isSingleLocation';

const getPortConfigs = (data) => {
	if (data?.search_type) {
		const origin = getLocationShipmentDetails({}, data, 'origin');

		const destination = !isSingleLocation(data?.search_type)
			? getLocationShipmentDetails({}, data, 'destination')
			: null;

		return { origin, destination };
	}

	if (data?.service_type) {
		const { service_type } = data;
		const { routeInfo } = getConfigs(data?.service_type) || {};

		const singleservices = ['customs', 'cfs', 'fcl_freight_local'];

		const isSingleShipmentLocation = singleservices.some((type) => (service_type || '').includes(type));

		const origin = data[routeInfo.origin_pickup] || data[routeInfo.origin_port];
		const destination = data[routeInfo.destination_drop] || data[routeInfo.destination_port];

		return { origin, destination, isSingleShipmentLocation };
	}
	return {};
};

export default getPortConfigs;
