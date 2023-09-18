import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { L, FeatureGroup, Marker } from '@cogoport/maps';

const ICON_SIZE = 24;
const ICON_ANCHOR = 12.75;

const ICON_MAPPING = {
	origin      : GLOBAL_CONSTANTS.image_url.origin_map_pointer,
	destination : GLOBAL_CONSTANTS.image_url.destination_map_pointer,
};

function Pointer({ lat = 0, lng = 0, type = '' }) {
	const icon = L.icon({
		iconUrl    : ICON_MAPPING[type],
		iconSize   : [ICON_SIZE, ICON_SIZE],
		iconAnchor : [ICON_ANCHOR, ICON_ANCHOR],
	});

	return (
		<FeatureGroup key={lat}>
			<Marker position={[lat, lng]} icon={icon} />
		</FeatureGroup>
	);
}

export default Pointer;
