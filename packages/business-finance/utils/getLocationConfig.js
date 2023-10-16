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
	return {};
};

export default getPortConfigs;
