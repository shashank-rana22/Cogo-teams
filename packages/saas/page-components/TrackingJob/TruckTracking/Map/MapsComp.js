import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { CogoMaps, L } from '@cogoport/maps';

const Pointer = dynamic(() => import('./Pointer'), { ssr: false });
const Route = dynamic(() => import('./Route'), { ssr: false });

const LAYER = [
	{
		name: 'Cogo Maps',
		url: `${process.env.NEXT_PUBLIC_MAPS_BASE_URL}/cogo-tiles/{z}/{x}/{y}.png`,
		attribution: '',
	},
];

const center = { lat: '28.679079', lng: '77.069710' };
function MapComp({ plotPoints, isMobile = false, ...rest }) {
	const { origin = {}, destination = {} } = rest || {};
	const [map, setMap] = useState();
	const corner1 = L.latLng(-90, -200);
	const corner2 = L.latLng(90, 200);
	const bounds = L.latLngBounds(corner1, corner2);
	const pointLength = plotPoints.length;
	const heightVariable = isMobile ? '350px' : '600px';

	const check =
		destination?.latitude !== plotPoints?.[pointLength - 1]?.lat &&
		destination?.longitude !== plotPoints?.[pointLength - 1]?.lng;

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
			style={{ height: `${heightVariable}`, width: '100%' }}
			baseLayer={LAYER}
			zoom={3.6}
			minZoom={2}
			center={center}
			setMap={setMap}
			maxBoundsViscosity={1}
			maxZoom={12}
		>
			{origin?.latitude && (
				<Pointer
					lat={origin?.latitude}
					lng={origin?.longitude}
					origin={origin}
					map={map}
					iconSvg="destination-icon"
				/>
			)}

			{pointLength > 0 && <Route positions={plotPoints} map={map} />}
			{pointLength > 0 && (
				<Pointer
					lat={plotPoints[pointLength - 1]?.lat}
					lng={plotPoints[pointLength - 1]?.lng}
					map={map}
					iconSvg={check ? 'current-location' : 'destination-icon'}
				/>
			)}
			{check && (
				<Pointer
					lat={destination.latitude}
					lng={destination.longitude}
					destination={destination}
					map={map}
					iconSvg="destination-icon"
				/>
			)}
		</CogoMaps>
	);
}

export default MapComp;
