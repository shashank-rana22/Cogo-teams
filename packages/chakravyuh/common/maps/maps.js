import WaypointProvider from '@cogoport/map-components/ui/WaypointsProvider';
import { CogoMaps, L } from '@cogoport/maps';
import { useState, useEffect } from 'react';

const LAYER = [
	{
		name        : 'Cogo Maps',
		url         : `${process.env.NEXT_PUBLIC_MAPS_BASE_URL}/cogo-tiles/{z}/{x}/{y}.png`,
		attribution : '',
	},
];

const center = { lat: '28.679079', lng: '77.069710' };

function MapComp() {
	const [map, setMap] = useState();
	const corner1 = L.latLng(-90, -200);
	const corner2 = L.latLng(90, 200);
	const bounds = L.latLngBounds(corner1, corner2);

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
				'<a href="https://www.cogoport.com/en/terms-and-conditions/" target="_blank">&copy; Cogoport T&C</a>|'
				+ '<a href="https://www.cogoport.com/en/privacy-policy/" target="_blank">Privacy & data protection</a>|'
				+ '<a href="https://leafletjs.com/" target="_blank" >Leaflet</a>',
			);
		}
	}, [map, bounds]);

	return (
		<WaypointProvider>
			<CogoMaps
				key="pricing-maps"
				style={{ height: '72vh', width: '100%', zIndex: 0 }}
				baseLayer={LAYER}
				zoom={2.9}
				minZoom={2}
				center={center}
				setMap={setMap}
				maxBoundsViscosity={1}
			/>
		</WaypointProvider>
	);
}

export default MapComp;
