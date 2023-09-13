import { IcMFship, IcMAirport } from '@cogoport/icons-react';

const getLatLng = ({ route, src }) => {
	const routeLength = route?.length;
	const latLngMapping = {
		origin: {
			lat : route[0]?.lat,
			lng : route[0]?.lng,
		},
		destination: {
			lat : route[routeLength - 1]?.lat,
			lng : route[routeLength - 1]?.lng,
		},
		icon: {
			lat    : route[Math.floor(routeLength / 2)]?.lat,
			lng    : route[Math.floor(routeLength / 2)]?.lng,
			origin : route[0]?.lng,
			dest   : route[routeLength - 1]?.lng,
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
