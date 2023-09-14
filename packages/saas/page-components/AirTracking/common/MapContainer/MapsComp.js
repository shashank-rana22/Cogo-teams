import { CogoMaps } from '@cogoport/maps';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import Pointer from './Pointer';
import Route from './Route';

import { PATH_OPTION, LAYER, CENTER } from '@/ui/commons/constants/mapConstant';

const getLatLng = ({ route = [] }) => {
	const routeLength = route?.length;
	const 	origin = {
		lat : route[0]?.lat,
		lng : route[0]?.lng,
	};
	const	destination = {
		lat : route[routeLength - 1]?.lat,
		lng : route[routeLength - 1]?.lng,
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
				const { origin, destination } = getLatLng({ route });
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
