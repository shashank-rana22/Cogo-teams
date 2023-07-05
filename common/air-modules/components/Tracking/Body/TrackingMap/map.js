import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { CogoMaps, L } from '@cogoport/maps';
import { useState, useEffect } from 'react';

import Pointer from './Pointer';
import Route from './Route';

const LAYER = [
	{
		name        : 'Cogo Maps',
		url         : `${process.env.NEXT_PUBLIC_MAPS_BASE_URL}/cogo-tiles/{z}/{x}/{y}.png`,
		attribution : '',
	},
];

const LINE_OPTIONS = { color: '#008000' };
const REMAINING_ROUTE_LINE_OPTIONS = { color: '#0000ff' };
const CENTER = { lat: '28.679079', lng: '77.069710' };
const CORNER_1_LAT = -90;
const CORNER_1_LNG = -200;
const CORNER_2_LAT = 90;
const CORNER_2_LNG = 200;
const MAP_TIMEOUT_DELAY = 200;
const CURVE_POINT_LAST_INDEX_CALCULATOR = -1;

function MapComp({
	completedPoints,
	remainingPoints,
	curvePoints,
	currentMilestone,
}) {
	const [map, setMap] = useState();
	const corner1 = L.latLng(CORNER_1_LAT, CORNER_1_LNG);
	const corner2 = L.latLng(CORNER_2_LAT, CORNER_2_LNG);
	const bounds = L.latLngBounds(corner1, corner2);
	const curvePointLength = curvePoints?.length;

	useEffect(() => {
		const timeout = setTimeout(() => {
			if (map) map.invalidateSize(true);
		}, MAP_TIMEOUT_DELAY);
		return () => {
			clearTimeout(timeout);
		};
	}, [map]);

	useEffect(() => {
		if (map) {
			map.setMaxBounds(bounds);
			map?.attributionControl?.setPrefix(
				'<a href="https://www.cogoport.com/en/terms-and-conditions/" target="_blank">&copy; Cogoport T&C</a>|'
				+ '<a href="https://www.cogoport.com/en/privacy-policy/" target="_blank">Privacy & data protection</a>|'
				+ '<a href="https://leafletjs.com/" target="_blank" >Leaflet</a>',
			);
		}
	}, [map, bounds]);

	return (
		<CogoMaps
			key={JSON.stringify(curvePoints)}
			style={{ height: '700px', width: '100%' }}
			baseLayer={LAYER}
			zoom={2.9}
			minZoom={2}
			center={CENTER}
			setMap={setMap}
			maxBoundsViscosity={1}
		>
			{!!curvePoints?.length && (
				<Pointer
					lat={curvePoints?.[GLOBAL_CONSTANTS.zeroth_index]?.lat}
					lng={curvePoints?.[GLOBAL_CONSTANTS.zeroth_index]?.lng}
					iconSvg="source"
					map={map}
				/>
			)}

			{currentMilestone && (
				<Pointer
					lat={currentMilestone?.lat}
					lng={currentMilestone?.lng}
					iconSvg="current-location"
					map={map}
				/>
			)}
			{!!completedPoints?.length && (
				<Route
					positions={completedPoints}
					map={map}
					pathOptions={LINE_OPTIONS}
				/>
			)}
			{!!remainingPoints?.length && (
				<Route
					positions={remainingPoints}
					map={map}
					pathOptions={REMAINING_ROUTE_LINE_OPTIONS}
				/>
			)}
			{!remainingPoints?.length && !!curvePoints?.length && (
				<Route positions={curvePoints} map={map} pathOptions={LINE_OPTIONS} />
			)}
			{!!curvePoints?.length && (
				<Pointer
					lat={curvePoints?.[curvePointLength + CURVE_POINT_LAST_INDEX_CALCULATOR]?.lat}
					lng={curvePoints?.[curvePointLength + CURVE_POINT_LAST_INDEX_CALCULATOR]?.lng}
					iconSvg="destination-icon"
					map={map}
				/>
			)}
		</CogoMaps>
	);
}

export default MapComp;
