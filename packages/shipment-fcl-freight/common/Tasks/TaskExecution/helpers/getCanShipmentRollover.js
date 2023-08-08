export function getCanShipmentRollover(getApisData) {
	const isShipmentRolloverable = (
		getApisData?.list_shipment_container_details || []
	).every(
		(container) => container?.service_id
			&& container?.id
			&& container?.container_size
			&& container?.container_type
			&& container?.commodity,
	);

	return isShipmentRolloverable;
}
