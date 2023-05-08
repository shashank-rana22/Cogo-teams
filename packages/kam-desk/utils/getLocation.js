import isSingleLocation from './checkSingleLocation';
import getShipmentLocation from './getShipmentLocation';

export default function getLocation({ data }) {
	const origin = getShipmentLocation({ data, type: 'origin' });
	const destination = !isSingleLocation(data?.shipment_type)
		? getShipmentLocation({ data, type: 'destination' })
		: null;

	return { origin, destination };
}
