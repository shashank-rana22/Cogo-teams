import { useState, useEffect } from 'react';
import { CogoMaps, L } from '@cogoport/maps';
import Pointer from './Pointer';
import Route from './Route';

const LAYER = [
	{
		name: 'Cogo Maps',
		url: `${process.env.NEXT_PUBLIC_MAPS_BASE_URL}/cogo-tiles/{z}/{x}/{y}.png`,
		attribution: '',
	},
];

const lineOptions = { color: 'green' };
const remainingRoutelineOptions = { color: 'blue' };
const center = { lat: '28.679079', lng: '77.069710' };

function MapComp({
	remainingPoints,
	curvePoints,
	destination = {},
}) {
	const [map, setMap] = useState();
	const corner1 = L.latLng(-90, -200);
	const corner2 = L.latLng(90, 200);
	const bounds = L.latLngBounds(corner1, corner2);
	const curvePointLength = curvePoints?.length;

	const check =
		destination?.latitude !== curvePoints?.[curvePointLength - 1]?.lat &&
		destination?.longitude !== curvePoints?.[curvePointLength - 1]?.lng;

	useEffect(() => {
		const timeout = setTimeout(() => {
			if (map) map.invalidateSize(true);
		}, 200);
		return () => {
			clearTimeout(timeout);
		};
	}, [map]);

	useEffect(() => {
		if (map) {
			map.setMaxBounds(bounds);
			map?.attributionControl?.setPrefix(
				// eslint-disable-next-line max-len
				'<a href="https://www.cogoport.com/en/terms-and-conditions/" target="_blank">&copy; Cogoport T&C</a> | <a href="https://www.cogoport.com/en/privacy-policy/" target="_blank">Privacy & data protection</a> | <a href="https://leafletjs.com/" target="_blank" >Leaflet</a>',
			);
		}
	}, [map]);

	return (
		<CogoMaps
			key={JSON.stringify(curvePoints)}
			style={{ height: '700px', width: '100%' }}
			baseLayer={LAYER}
			zoom={2.9}
			minZoom={2}
			center={center}
			setMap={setMap}
			maxBoundsViscosity={1}
		>
			{curvePoints?.length > 0 && (
				<Pointer
					lat={curvePoints?.[0]?.lat}
					lng={curvePoints?.[0]?.lng}
					iconSvg={
						'source' 
					}
					map={map}
				/>
			)}

			{remainingPoints?.length > 0 && (
				<Route
					positions={remainingPoints}
					map={map}
					pathOptions={remainingRoutelineOptions}
				/>
			)}
			{remainingPoints?.length === 0 && curvePoints?.length > 0 && (
				<Route positions={curvePoints} map={map} pathOptions={lineOptions} />
			)}
			{curvePoints?.length > 0 && (
				<Pointer
					lat={curvePoints?.[curvePointLength - 1]?.lat}
					lng={curvePoints?.[curvePointLength - 1]?.lng}
					iconSvg={check ? 'current-location' : 'destination-icon'}
					map={map}
				/>
			)}
			{check && (
				<Pointer
					lat={destination?.latitude}
					lng={destination?.longitude}
					iconSvg="destination-icon"
					map={map}
				/>
			)}
		</CogoMaps>
	);
}

export default MapComp;
