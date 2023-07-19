const FIRST_ELEMENT = 0;

const splitByBrackets = (name) => name?.split('(')[FIRST_ELEMENT] || '';

const popLastName = (name) => name?.split(' ').pop() || '';

const getAppendedString = ({ code, name, country }) => `${code ? `${code},` : ''} 
${name} ${country ? `(${country})` : ''}`;

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
		name: originName,
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
		name: destinationName,
		display_name: destinationDisplayName,
	} = destinationLocationData;

	const { origin_main_port, destination_main_port } = item;

	const {
		port_code: originMainPortCode = '',
		name: originMainPortName = '',
		display_name: originMainPortDisplayName,
	} = origin_main_port || {};

	const {
		port_code: destinationMainPortCode = '',
		name: destinationMainPortName = '',
		display_name: destinationMainPortDisplayName,
	} = destination_main_port || {};

	return {
		originDisplay: getAppendedString({
			code    : originCode,
			country : popLastName(originDisplayName),
			name    : splitByBrackets(originName),
		}),
		destinationDisplay: getAppendedString({
			code    : destinationCode,
			country : popLastName(destinationDisplayName),
			name    : splitByBrackets(destinationName),
		}),
		originMainDisplay: getAppendedString({
			code    : originMainPortCode,
			country : popLastName(originMainPortDisplayName),
			name    : splitByBrackets(originMainPortName),
		}),
		destinationMainDisplay: getAppendedString({
			code    : destinationMainPortCode,
			country : popLastName(destinationMainPortDisplayName),
			name    : splitByBrackets(destinationMainPortName),
		}),
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
