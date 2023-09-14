import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { L, Marker, FeatureGroup } from '@cogoport/maps';

const ICON_MAPPING = {
	origin      : GLOBAL_CONSTANTS.image_url.origin_map_pointer,
	destination : GLOBAL_CONSTANTS.image_url.destination_map_pointer,
};

function Pointer({ lat = '', lng = '', map, src = '' }) {
	const icon = L.icon({
		iconUrl    : ICON_MAPPING[src],
		iconSize   : [24, 24],
		iconAnchor : [12.75, 12.75],
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
