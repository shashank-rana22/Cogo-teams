import { Polyline } from '@cogoport/maps';

const pathOptions = { color: '#00008B' };

function Route({ positions, map }) {
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
