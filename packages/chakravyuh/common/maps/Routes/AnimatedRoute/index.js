import { iconMappings } from '@cogoport/map-components/utils/color-options';
import getAnimationOptions from '@cogoport/map-components/utils/getAnimationOptions';
import getMapDivIcon from '@cogoport/map-components/utils/getLeafletDivIcon';
import { L } from '@cogoport/maps';
import { useEffect } from 'react';

import '@cogoport/map-components/utils/motion';

function AnimatedRoute({ map, activeRoute }) {
	const { lineString } = activeRoute.routes[0];
	const main_route = lineString.filter(({ type }) => type === activeRoute?.main_service)[0]?.path;
	const flipIcon = main_route && main_route.slice(-1)[0][1] - main_route[0][1] < 0;

	const sequence = lineString
		.map(({ path = [], type }) => (path.length > 1
			? L.motion.polyline(...getAnimationOptions(
				{
					path,
					isMain : activeRoute?.main_service === type,
					icon   : getMapDivIcon(
						iconMappings[type],
						`marker_label ${type} ${flipIcon && 'flip_icon'}`,
					),
				},
			)) : [])).flat();

	const sqGroup = L.motion.seq(sequence);

	useEffect(() => {
		if (map) {
			sqGroup?.addTo(map);
			sqGroup?.motionStart();
		}
		return () => {
			if (map) {
				map?.removeLayer(sqGroup);
			}
		};
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [map]);

	return (
		null);
}

export default AnimatedRoute;
