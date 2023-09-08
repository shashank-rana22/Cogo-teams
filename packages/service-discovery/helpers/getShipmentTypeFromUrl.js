export default function getShipmentTypeFromUrl() {
	let shipmentType;

	if (typeof window !== 'undefined') {
		shipmentType = new URLSearchParams(window?.location?.search)?.get(
			'shipment_type',
		);
	}
	return shipmentType || undefined;
}
