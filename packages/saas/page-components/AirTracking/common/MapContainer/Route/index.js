import { Polyline } from '@cogoport/maps';

function Route({ positions, pathOption }) {
	return (
		<Polyline
			key={positions}
			positions={positions}
			pathOptions={pathOption}
			// eventHandlers={{
			// 	add: (e) => {
			// 		if (map) map?.fitBounds(e.target?.getBounds());
			// 	},
			// }}
		/>
	);
}
export default Route;
