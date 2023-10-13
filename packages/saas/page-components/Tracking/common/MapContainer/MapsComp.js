import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { CogoMaps } from '@cogoport/maps';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import { PATH_OPTION, LAYER, CENTER } from '../../constant/mapConstant';

import Pointer from './Pointer';
import Route from './Route';

const getLatLng = ({ route = [] }) => {
	const routeLength = route?.length;
	const 	origin = {
		lat : route?.[GLOBAL_CONSTANTS.zeroth_index]?.lat,
		lng : route?.[GLOBAL_CONSTANTS.zeroth_index]?.lng,
	};
	const	destination = {
		lat : route[routeLength - GLOBAL_CONSTANTS.one]?.lat,
		lng : route[routeLength - GLOBAL_CONSTANTS.one]?.lng,
	};
	return { origin, destination };
};

function MapComp({ height = '60vh', allPoints = [], type = 'ocean' }) {
	const [map, setMap] = useState();

	return (
		<CogoMaps
			style={{ width: '100%', height }}
			baseLayer={LAYER}
			zoom={3}
			minZoom={2}
			center={CENTER}
			setMap={setMap}
			maxBoundsViscosity={1}
			maxZoom={12}
		>
			{(allPoints || []).map((points) => {
				const { route = [] } = points || {};
				const { origin = {}, destination = {} } = getLatLng({ route });
				if (isEmpty(route)) return null;
				return (
					<>
						<Pointer map={map} lat={origin?.lat} lng={origin?.lng} src="origin" />
						<Route map={map} positions={route} pathOption={PATH_OPTION[type]} />
						<Pointer map={map} lat={destination?.lat} lng={destination?.lng} src="destination" />
					</>
				);
			})}

		</CogoMaps>
	);
}
export default MapComp;
