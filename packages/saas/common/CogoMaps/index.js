import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
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
const NINTY = 90;
const TWO_HUNDRED_FIFTY = 250;
const TWO_HUNDRED = 200;
const corner1 = L.latLng(-NINTY, -TWO_HUNDRED_FIFTY);
const corner2 = L.latLng(NINTY, TWO_HUNDRED_FIFTY);
const bounds = L.latLngBounds(corner1, corner2);

const CENTER = { lat: '28.679079', lng: '77.069710' };
function MapComp({
	plotPoints = [],
	isMobile = false,
	lengthDependency = '',
	height = '600px',
	zoom = '3.6',
	style = {},
	transportMode = 'air',
}) {
	const [map, setMap] = useState();

	const pointLength = plotPoints.length;

	const heightVariable = isMobile ? '350px' : height;

	useEffect(() => {
		const timeout = setTimeout(() => {
			if (map) map.invalidateSize(true);
		}, TWO_HUNDRED);
		return () => {
			clearTimeout(timeout);
		};
	}, [map, lengthDependency]);

	useEffect(() => {
		if (map) {
			map.setMaxBounds(bounds);
			map?.attributionControl?.setPrefix(
				`<a 
					href="https://www.cogoport.com/en/terms-and-conditions/" 
					target="_blank">&copy; 
					Cogoport T&C
					</a> 
					| 
				<a 
					href="https://www.cogoport.com/en/privacy-policy/"
					target="_blank">
					Privacy & data protection
				</a> 
				|
				<a 
					href="https://leafletjs.com/"
					target="_blank" >
					Leaflet
				</a>`,
			);
		}
	}, [map]);

	return (
		<CogoMaps
			key={JSON.stringify(plotPoints)}
			style={{ height: `${heightVariable}`, width: '100%', ...style }}
			baseLayer={LAYER}
			zoom={zoom}
			center={CENTER}
			setMap={setMap}
			zoomControl={false}
			maxBoundsViscosity={1}
			maxZoom={12}
		>
			{pointLength > GLOBAL_CONSTANTS.zeroth_index && (
				<Pointer
					lat={plotPoints[GLOBAL_CONSTANTS.zeroth_index]?.lat}
					lng={plotPoints[GLOBAL_CONSTANTS.zeroth_index]?.lng}
					iconSvg="map_origin"
				/>
			)}
			<Route positions={plotPoints} map={map} transportMode={transportMode} />
			{!isEmpty(plotPoints) && <AnimatedRoute map={map} path={plotPoints} transportMode={transportMode} />}
			{pointLength > GLOBAL_CONSTANTS.zeroth_index && (
				<Pointer
					lat={plotPoints[pointLength - GLOBAL_CONSTANTS.one]?.lat}
					lng={plotPoints[pointLength - GLOBAL_CONSTANTS.one]?.lng}
					iconSvg="map_destination"
				/>
			)}
		</CogoMaps>
	);
}

export default MapComp;
