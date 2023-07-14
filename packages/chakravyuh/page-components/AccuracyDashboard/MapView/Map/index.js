import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { CogoMaps, L } from '@cogoport/maps';
import React, { useState, useEffect } from 'react';

import { BASE_LAYER, LAYOUT, TIME_LIMIT, MAX_BOUNDS } from '../../../../constants/map_constants';

function Map({ isFull = false, bounds = null }) {
	const [map, setMap] = useState(null);
	const paddingTopLeft = isFull ? GLOBAL_CONSTANTS.zeroth_index : LAYOUT;

	useEffect(() => {
		const timeout = setTimeout(() => { if (map)map.invalidateSize(true); }, TIME_LIMIT);
		return () => {
			clearTimeout(timeout);
		};
	}, [map, isFull]);

	useEffect(() => {
		if (map && bounds instanceof L.LatLngBounds) {
			map.fitBounds(bounds, { paddingTopLeft: [paddingTopLeft, GLOBAL_CONSTANTS.zeroth_index] });
		}
	}, [bounds, map, paddingTopLeft]);

	return (
		<CogoMaps
			style={{ height: '100vh', width: '100%' }}
			setMap={setMap}
			zoom={5}
			baseLayer={BASE_LAYER}
			maxBounds={MAX_BOUNDS}
			maxZoom={7}
			zoomPosition="topright"
			layersPosition="topright"
		/>
	);
}

export default Map;
