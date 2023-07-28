/* eslint-disable max-len */
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { CogoMaps, L, Tooltip, Marker } from '@cogoport/maps';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import Route from './Route';

const CENTER_COORDINATES_X = 20.5937;
const CENTER_COORDINATES_Y = 78.9629;

const center = [CENTER_COORDINATES_X, CENTER_COORDINATES_Y];

const baseLayer = [
	{
		name : 'Cogo Maps',
		url  : `${process.env.NEXT_PUBLIC_MAPS_BASE_URL}/{z}/{x}/{y}.png`,
		attribution:
            '<a href="https://www.cogoport.com/en/terms-and-conditions/">&copy;Cogoport T&C</a>| <a href="https://www.cogoport.com/en/privacy-policy/">Privacy & data protection</a>',
		minZoom : 0,
		maxZoom : 15,
	},
];

const THIRTY = 30;
const EIGHTY = 80;
const FIFTY_FIVE = 45;
const FOURTY = 40;
const ONE = 1;
const ZERO = 0;
const FIFTEEN = 15;

const black_location_icon = 	L.icon({
	iconUrl    : 'https://cogoport-production.sgp1.digitaloceanspaces.com/75240e56fccaa75827d6eaa7b58074e7/location-sign-svgrepo-com.svg',
	iconSize   : [THIRTY, THIRTY],
	iconAnchor : [FIFTEEN, THIRTY],
});
const red_location_icon = 	L.icon({
	iconUrl    : 'https://cogoport-production.sgp1.digitaloceanspaces.com/d61cf829358d7d826eda647636d66f91/Mediamodifier-Design.svg',
	iconSize   : [EIGHTY, EIGHTY],
	iconAnchor : [FOURTY, FIFTY_FIVE],
});
const yellow_location_icon = 	L.icon({
	iconUrl    : 'https://cogoport-production.sgp1.digitaloceanspaces.com/af5dcf467b54929d7aa71af6a5bcdfd9/Mediamodifier-Design%20%281%29.svg',
	iconSize   : [EIGHTY, EIGHTY],
	iconAnchor : [FOURTY, FIFTY_FIVE],
});

function MapComp({
	bounds = null, displayNameArray = [], points = [], path = [],
}) {
	const [map, setMap] = useState(null);
	useEffect(() => {
		if (!isEmpty(bounds) && map && bounds instanceof L.LatLngBounds) {
			map?.fitBounds(bounds);
		}
	}, [bounds, map]);
	const LINE_OPTIONS = { color: '#007FFF' };
	return (
		<CogoMaps
			center={center}
			style={{ height: '700px', width: '100%' }}
			zoom={4}
			baseLayer={baseLayer}
			setMap={setMap}
		>
			{points.map((coordinates, index) => (
				<Marker
					position={coordinates}
					key={JSON.stringify(coordinates[GLOBAL_CONSTANTS.zeroth_index])}
					// eslint-disable-next-line no-nested-ternary
					icon={index === ZERO ? red_location_icon : (index === points.length - ONE) ? black_location_icon : yellow_location_icon}
				>

					<Tooltip>
						{displayNameArray[index]}
					</Tooltip>
				</Marker>
			))}
			{(path || []).length ? <Route positions={path} map={map} pathOptions={LINE_OPTIONS} /> : null}
		</CogoMaps>
	);
}

export default MapComp;
