const popLastName = (name) => name?.split(' ').pop() || '';

export function formatRouteData({ item = {} }) {
	const originlocationData = (
		item.origin_port
		|| item.origin_airport
		|| item.port
		|| item.origin_location
		|| item.location
		|| item.airport
		|| item.pickup
		|| {}
	);

	const {
		port_code: originCode,
		display_name: originDisplayName,
	} = originlocationData;

	const destinationLocationData = (
		item.destination_port
		|| item.destination_airport
		|| item.port
		|| item.destination_location
		|| item.location
		|| item.airport
		|| item.drop
		|| {}
	);

	const {
		port_code: destinationCode,
		display_name: destinationDisplayName,
	} = destinationLocationData;

	const { origin_main_port, destination_main_port } = item;

	const {
		port_code: originMainPortCode = '',
		display_name: originMainPortDisplayName,
	} = origin_main_port || {};

	const {
		port_code: destinationMainPortCode = '',
		display_name: destinationMainPortDisplayName,
	} = destination_main_port || {};

	return {
		originDetails: {
			code    : originCode,
			country : popLastName(originDisplayName),
			name    : originDisplayName,
		},
		destinationDetails: {
			code    : destinationCode,
			country : popLastName(destinationDisplayName),
			name    : destinationDisplayName,
		},
		singleOriginDisplay: {
			code    : originMainPortCode || originCode,
			country : popLastName(originMainPortDisplayName || originDisplayName),
			name    : originMainPortDisplayName || originDisplayName,
		},
		singleDestinationDisplay: {
			code    : destinationMainPortCode || destinationCode,
			country : popLastName(destinationMainPortDisplayName || destinationDisplayName),
			name    : destinationMainPortDisplayName || destinationDisplayName,
		},
	};
}
