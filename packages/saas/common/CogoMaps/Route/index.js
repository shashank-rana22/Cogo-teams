import { Polyline, L } from '@cogoport/maps';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useRef } from 'react';

export const PATH_OPTION = {
	ocean : { color: '#1867D2', weight: 2 },
	air   : { color: '#f37166', weight: 2 },

};

function Route({ positions = [], map = {}, transportMode = null }) {
	const ref = useRef(null);
	useEffect(() => {
		const line = ref.current;
		if (map && line) {
			const bounds = line.getBounds();
			if (!isEmpty(bounds) && bounds instanceof L.LatLngBounds) {
				map?.flyToBounds(bounds);
			}
		}
	}, [ref, map]);
	return (

		<Polyline
			ref={ref}
			positions={positions}
			pathOptions={PATH_OPTION[transportMode]}
		/>
	);
}
export default Route;
