import { Polyline } from '@cogoport/maps';

function Route({ positions, map, pathOptions }) {
	// useEffect(() => {
	//     const bounds = new L.LatLngBounds(positions);
	//     setBounds(bounds);
	// }, [JSON.stringify(positions)]);
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
