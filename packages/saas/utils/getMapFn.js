import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMFship, IcMAirport } from '@cogoport/icons-react';

const getLatLng = ({ route, src }) => {
	const routeLength = route?.length;
	const latLngMapping = {
		origin: {
			lat : route[GLOBAL_CONSTANTS.zeroth_index]?.lat,
			lng : route[GLOBAL_CONSTANTS.zeroth_index]?.lng,
		},
		destination: {
			lat : route[routeLength - GLOBAL_CONSTANTS.one]?.lat,
			lng : route[routeLength - GLOBAL_CONSTANTS.one]?.lng,
		},
		icon: {
			lat    : route[Math.floor(routeLength / GLOBAL_CONSTANTS.two)]?.lat,
			lng    : route[Math.floor(routeLength / GLOBAL_CONSTANTS.two)]?.lng,
			origin : route[GLOBAL_CONSTANTS.zeroth_index]?.lng,
			dest   : route[routeLength - GLOBAL_CONSTANTS.one]?.lng,
		},
	};
	return latLngMapping[src];
};

const getIcon = ({ type }) => {
	const iconMapping = {
		ocean : IcMFship,
		air   : IcMAirport,
	};

	return iconMapping[type] || '';
};

export { getIcon, getLatLng };
