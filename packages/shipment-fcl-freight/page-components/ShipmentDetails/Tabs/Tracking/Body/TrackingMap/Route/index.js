import { Polyline } from '@cogoport/utils';

function Route({ positions, map, pathOptions }) {
	return (
		<Polyline
			key={JSON.stringify(positions)}
			positions={positions}
			pathOptions={pathOptions}
			eventHandlers={{
				add: (e) => {
					if (map) map?.fitBounds(e.target?.getBounds());
				},
			}}
		/>
	);
}
export default Route;
