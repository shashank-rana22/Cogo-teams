import { Polyline } from '@cogoport/maps';
import { isEmpty } from '@cogoport/utils';

function Route({ positions = [], map = {}, pathOptions = {} }) {
	return (
		<Polyline
			positions={positions}
			pathOptions={pathOptions}
			eventHandlers={{
				add: (e) => {
					if (!isEmpty(map)) map?.fitBounds(e.target?.getBounds());
				},
			}}
		/>
	);
}
export default Route;
