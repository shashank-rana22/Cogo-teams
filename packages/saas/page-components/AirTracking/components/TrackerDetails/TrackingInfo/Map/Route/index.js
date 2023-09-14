import { Polyline, L } from '@cogoport/maps';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useRef } from 'react';

import { COLOR_MAPPING } from '@/ui/commons/constants/mapConstant';

function Route({ positions, map, transportMode }) {
	const pathOptions = { color: COLOR_MAPPING[transportMode], weight: 2 };

	const ref = useRef(null);

	useEffect(() => {
		const line = ref.current;
		if (map && line) {
			const bounds = line.getBounds();
			if (!isEmpty(bounds) && bounds instanceof L.LatLngBounds) {
				map?.flyToBounds(bounds, { maxZoom: 4.5 });
			}
		}
	}, [ref, map]);
	return (

		<Polyline
			ref={ref}
			positions={positions}
			pathOptions={pathOptions}
		/>
	);
}
export default Route;
