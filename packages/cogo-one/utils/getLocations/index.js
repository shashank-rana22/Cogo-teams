import { CHECKOUT_PORT_PAIR_MAPPING } from '../../constants/checkoutPortPairMapping';

import getLocationShipmentDetails from './getLocationShipmentDetails';
import isSingleLocation from './isSingleLocation';

const getPortConfigs = ({ data = {} }) => {
	if (data?.search_type) {
		const origin = getLocationShipmentDetails({ summary: data, type: 'origin' });

		const destination = !isSingleLocation({ searchType: data?.search_type })
			? getLocationShipmentDetails({ summary: data, type: 'destination' })
			: null;

		return { origin, destination };
	}

	const routeInfo = CHECKOUT_PORT_PAIR_MAPPING[data?.service_type || data?.shipment_type];

	if (data?.service_type || data?.shipment_type) {
		const origin = data[routeInfo.origin_pickup] || data[routeInfo.origin_port];
		const destination =	data[routeInfo.destination_drop] || data[routeInfo.destination_port];

		return { origin, destination };
	}
	return {};
};

export default getPortConfigs;
