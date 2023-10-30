import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { CogoMaps, L } from '@cogoport/maps';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import {
	CENTER, LAYER, MAP_ATTRIBUTE,
	BOTTOM_LEFT_LAT, BOTTOM_LEFT_LNG, TOP_RIGHT_LAT, TOP_RIGHT_LNG,
} from '../../../../constant/mapConstant';

import Pointer from './Pointer';
import Route from './Route';

const corner1 = L.latLng(BOTTOM_LEFT_LAT, BOTTOM_LEFT_LNG);
const corner2 = L.latLng(TOP_RIGHT_LAT, TOP_RIGHT_LNG);

const bounds = L.latLngBounds(corner1, corner2);

const ONE = 1;

function MapComps({ height = '500px', pointsArr = [], type = 'ocean' }) {
	const [map, setMap] = useState();
	const pointsArrLength = pointsArr.length;

	useEffect(() => {
		if (map) {
			map.setMaxBounds(bounds);
			map?.attributionControl?.setPrefix(MAP_ATTRIBUTE);
		}
	}, [map]);

	return (
		<CogoMaps
			style={{ height: `${height}`, width: '100%' }}
			setMap={setMap}
			center={CENTER}
			baseLayer={LAYER}
			zoom={2.9}
			minZoom={2}
			maxZoom={12}
			maxBoundsViscosity={1}
		>
			{!isEmpty(pointsArr) && (
				<>
					<Pointer
						lat={pointsArr[GLOBAL_CONSTANTS.zeroth_index]?.lat}
						lng={pointsArr[GLOBAL_CONSTANTS.zeroth_index]?.lng}
						type="origin"
					/>
					{pointsArrLength !== ONE && <Route positions={pointsArr} map={map} transportMode={type} />}
					<Pointer
						lat={pointsArr[pointsArrLength - ONE]?.lat}
						lng={pointsArr[pointsArrLength - ONE]?.lng}
						type="destination"
					/>
				</>
			)}

		</CogoMaps>
	);
}

export default MapComps;
