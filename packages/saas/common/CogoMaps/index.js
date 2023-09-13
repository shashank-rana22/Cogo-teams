import { CogoMaps, L } from '@cogoport/maps';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import AnimatedRoute from './AnimatedRoute';
import Pointer from './Pointer';
import Route from './Route';

const LAYER = [
	{
		name        : 'Cogo Maps',
		url         : `${process.env.NEXT_PUBLIC_MAPS_BASE_URL}/cogo-tiles/{z}/{x}/{y}.png`,
		attribution : '',
	},
];

const corner1 = L.latLng(-90, -250);
const corner2 = L.latLng(90, 250);
const bounds = L.latLngBounds(corner1, corner2);

const center = { lat: '28.679079', lng: '77.069710' };
function MapComp({
	plotPoints = [],
	isMobile = false,
	lengthDependency = '',
	height = '600px',
	zoom = '3.6',
	style,
	transportMode,
}) {
	const [map, setMap] = useState();

	const pointLength = plotPoints.length;

	const heightVariable = isMobile ? '350px' : height;

	useEffect(() => {
		const timeout = setTimeout(() => {
			if (map) map.invalidateSize(true);
		}, 200);
		return () => {
			clearTimeout(timeout);
		};
	}, [map, lengthDependency]);

	useEffect(() => {
		if (map) {
			map.setMaxBounds(bounds);
			map?.attributionControl?.setPrefix(
				// eslint-disable-next-line max-len
				'<a href="https://www.cogoport.com/en/terms-and-conditions/" target="_blank">&copy; Cogoport T&C</a> | <a href="https://www.cogoport.com/en/privacy-policy/" target="_blank">Privacy & data protection</a> | <a href="https://leafletjs.com/" target="_blank" >Leaflet</a>',
			);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [map]);

	return (
		<CogoMaps
			key={JSON.stringify(plotPoints)}
			style={{ height: `${heightVariable}`, width: '100%', ...style }}
			baseLayer={LAYER}
			zoom={zoom}
			center={center}
			setMap={setMap}
			zoomControl={false}
			maxBoundsViscosity={1}
			maxZoom={12}
		>
			{pointLength > 0 && (
				<Pointer lat={plotPoints[0]?.lat} lng={plotPoints[0]?.lng} iconSvg="map_origin" />
			)}
			<Route positions={plotPoints} map={map} transportMode={transportMode} />
			{!isEmpty(plotPoints) && <AnimatedRoute map={map} path={plotPoints} transportMode={transportMode} />}
			{pointLength > 0 && (
				<Pointer
					lat={plotPoints[pointLength - 1]?.lat}
					lng={plotPoints[pointLength - 1]?.lng}
					iconSvg="map_destination"
				/>
			)}
		</CogoMaps>
	);
}

export default MapComp;
