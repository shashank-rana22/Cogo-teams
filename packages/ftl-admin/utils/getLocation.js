import getShipmentLocation from './getShipmentLocation';

export default function getLocation({ data }) {
	const origin = getShipmentLocation({ data, type: 'origin' });
	const destination = getShipmentLocation({ data, type: 'destination' });
	return { origin, destination };
}
