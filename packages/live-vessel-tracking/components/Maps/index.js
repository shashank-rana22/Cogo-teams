import { CogoMaps, L } from '@cogoport/maps';
import { useState, useEffect, useCallback } from 'react';

import { LAYER_URL, MAP_ATTRIBUTE, MAP_CENTER, YELLOW_VESSEL_INDEX, RED_VESSEL_INDEX } from '../../constant';
import {
	DEFAULT_NORTHEAST_LAT,
	DEFAULT_NORTHEAST_LNG,
	DEFAULT_SOUTHWEST_LAT,
	DEFAULT_SOUTHWEST_LNG,
} from '../../constant/defaultLatLng';
import { ZOOM, MIN_ZOOM, MAX_ZOOM } from '../../constant/zoom';
import Pointer from '../Pointer';

const LAYER = [
	{
		name        : 'Cogo Maps',
		url         : LAYER_URL,
		attribution : '',
	},
];

const getIcon = (index) => {
	if (index % YELLOW_VESSEL_INDEX === 0) return 'yellow';
	if (index % RED_VESSEL_INDEX === 0) return 'red';
	return 'black';
};

const corner1 = L.latLng(DEFAULT_SOUTHWEST_LAT, DEFAULT_SOUTHWEST_LNG);
const corner2 = L.latLng(DEFAULT_NORTHEAST_LAT, DEFAULT_NORTHEAST_LNG);
const bounds = L.latLngBounds(corner1, corner2);

function Maps({ vesselInfo = [], setCurrentBound }) {
	const [map, setMap] = useState();

	useEffect(() => {
		if (map) {
			map.setMaxBounds(bounds);
			map?.attributionControl?.setPrefix(MAP_ATTRIBUTE);
		}
	}, [map]);

	const getCurrentBound = useCallback(() => {
		if (map) {
			const bound = map.getBounds();
			setCurrentBound(bound);
		}
	}, [map, setCurrentBound]);

	useEffect(() => {
		if (map) {
			map.on('moveend', () => {
				getCurrentBound();
			});
		}
	}, [getCurrentBound, map]);

	return (
		<CogoMaps
			style={{ height: '81vh', width: '100%' }}
			baseLayer={LAYER}
			zoom={ZOOM}
			minZoom={MIN_ZOOM}
			center={MAP_CENTER}
			setMap={setMap}
			maxZoom={MAX_ZOOM}
		>
			{(vesselInfo || []).map((info, index) => (
				<Pointer key={info?.mmsi} map={map} arrow={getIcon(index)} {...info} />
			))}
		</CogoMaps>
	);
}

export default Maps;
