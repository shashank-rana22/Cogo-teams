import { L, FeatureGroup, Marker } from '@cogoport/maps';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const ICON_MAPPING = {
	origin      : GLOBAL_CONSTANTS.image_url.origin_map_pointer,
	destination : GLOBAL_CONSTANTS.image_url.destination_map_pointer,
};

function Pointer({ lat = 0, lng = 0, type = '' }) {
	const icon = L.icon({
		iconUrl    : ICON_MAPPING[type],
		iconSize   : [24, 24],
		iconAnchor : [12.75, 12.75],
	});

	return (
		<FeatureGroup key={lat}>
			<Marker position={[lat, lng]} icon={icon} />
		</FeatureGroup>
	);
}

export default Pointer;
