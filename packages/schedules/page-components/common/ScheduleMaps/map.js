import Point from '@cogoport/map-components/ui/Point';
import { CogoMaps, L } from '@cogoport/maps';
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
            // eslint-disable-next-line max-len
            '<a href="https://www.cogoport.com/en/terms-and-conditions/">&copy;Cogoport T&C</a>| <a href="https://www.cogoport.com/en/privacy-policy/">Privacy & data protection</a>',
		minZoom : 0,
		maxZoom : 15,
	},
];

function MapComp({
	path, points, bounds, displayNameArray, tooltipRefArray, isTooltipVisible,
}) {
	const [map, setMap] = useState();
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
			{points?.map((coordinates, index) => (
				<Point
					key={coordinates?.route}
					position={coordinates}
					tooltipText={displayNameArray[index]}
					index={index}
					points={points}
					tooltipProps={{ permanent: true }}
					showPointer
					tooltipRefArray={tooltipRefArray}
					isTooltipVisible={isTooltipVisible}
				/>
			))}
			{(path || []).length ? <Route positions={path} map={map} pathOptions={LINE_OPTIONS} /> : null}
		</CogoMaps>
	);
}

export default MapComp;
