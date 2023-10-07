const ROUTES_MAPPING = {
	fcl_freight : 'fcl',
	air_freight : 'air-freight',
};

export const handleRouteBooking = ({ e, id = '', service = '', partnerId = '' }) => {
	e.stopPropagation();
	let shipmentDetailsPage;
	if (Object.keys(ROUTES_MAPPING).includes(service)) {
		const route = ROUTES_MAPPING[service];

		shipmentDetailsPage = `${window.location.origin}/v2/${partnerId}/booking/${route}/${id}`;
	} else {
		shipmentDetailsPage = `${window.location.origin}/${partnerId}/shipments/${id}`;
	}

	window.open(shipmentDetailsPage, '_blank');
};

export const handleRouteSupply = ({ e, endPoint = '', partnerId = '' }) => {
	e.stopPropagation();

	const shupplyPage = `${window.location.origin}/${partnerId}/supply/dashboards/${endPoint}`;

	window.open(shupplyPage, '_blank');
};
