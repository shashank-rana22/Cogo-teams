import { Polyline } from '@cogoport/maps';

function Route({ positions, pathOption }) {
	return (
		<Polyline
			key={positions}
			positions={positions}
			pathOptions={pathOption}
		/>
	);
}
export default Route;
