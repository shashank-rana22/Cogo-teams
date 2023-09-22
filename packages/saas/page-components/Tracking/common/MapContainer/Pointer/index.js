import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { L, Marker, FeatureGroup } from '@cogoport/maps';

const ICON_SIZE = 24;
const ICON_ANCHOR = 12.75;

const ICON_MAPPING = {
	origin      : GLOBAL_CONSTANTS.image_url.origin_map_pointer,
	destination : GLOBAL_CONSTANTS.image_url.destination_map_pointer,
};

function Pointer({ lat = '', lng = '', map, src = '' }) {
	const icon = L.icon({
		iconUrl    : ICON_MAPPING[src],
		iconSize   : [ICON_SIZE, ICON_SIZE],
		iconAnchor : [ICON_ANCHOR, ICON_ANCHOR],
	});
	return (
		<FeatureGroup
			key={lat}
			eventHandlers={{ add: (e) => map?.panInsideBounds(e.target.getBounds()) }}
		>
			<Marker position={[lat, lng]} icon={icon} />
		</FeatureGroup>
	);
}

export default Pointer;
