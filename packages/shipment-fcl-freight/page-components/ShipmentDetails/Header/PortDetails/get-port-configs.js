import getLocationDetails from '@cogoport/app-search/utils/getLocationDetails';
import isSingleLocation from '@cogoport/app-search/utils/isSingleLocation';

const getPortConfigs = (data, shipment_type) => {
	if (shipment_type) {
		const summary = { ...data, search_type: shipment_type };

		const origin = getLocationDetails({}, summary, 'origin');

		const destination = !isSingleLocation(shipment_type)
			? getLocationDetails({}, summary, 'destination')
			: null;

		return { origin, destination };
	}

	return null;
};

export default getPortConfigs;
