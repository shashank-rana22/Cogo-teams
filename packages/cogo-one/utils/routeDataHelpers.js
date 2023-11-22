import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import { ROUTES_MAPPING } from '../constants/shipmentConstants';

const splitByBrackets = (name) => name?.split('(')[GLOBAL_CONSTANTS.zeroth_index] || '';

const popLastName = (name) => name?.split(' ').pop() || '';

const getAppendedString = ({ code, name, country }) => `${code ? `${code},` : ''} 
${name} ${country ? `(${country})` : ''}`;

export function formatRouteData({ item = {} }) {
	const originLocationData = (
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
	} = originLocationData;

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
			name    : originDisplayName || originName,
		},
		destinationDetails: {
			code    : destinationCode,
			country : popLastName(destinationDisplayName),
			name    : destinationDisplayName || destinationName,
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

export const handleRouteSupply = ({ e, endPoint = '', partnerId = '', service = '', serialId = '' }) => {
	e.stopPropagation();

	const supplyPage = `${window.location.origin}/${partnerId}/supply/dashboards/${endPoint}
	?service=${service}&serialId=${serialId}`;

	window.open(supplyPage, '_blank');
};

export const handleRouteBooking = ({ e, id = '', service = '', partnerId = '' }) => {
	e.stopPropagation();
	let shipmentDetailsPage;
	if (Object.keys(ROUTES_MAPPING || {}).includes(service)) {
		const route = ROUTES_MAPPING?.[service];

		shipmentDetailsPage = `${window.location.origin}/v2/${partnerId}/booking/${route}/${id}`;
	} else {
		shipmentDetailsPage = `${window.location.origin}/${partnerId}/shipments/${id}`;
	}

	window.open(shipmentDetailsPage, '_blank');
};
