/* eslint-disable no-underscore-dangle */
import { useMapEvents } from '@cogoport/maps';

function MapEvents({ setZoom }) {
	useMapEvents({
		zoomend: (e) => setZoom(e.target._zoom),
	});
	return null;
}

export default MapEvents;
