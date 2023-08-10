import { L, FeatureGroup, Marker } from '@cogoport/maps';

const ICON_SIZE = 24;
const ICON_ANCHOR = 12.75;
function Pointer({ lat = '', lng = '', iconSvg = 'location', map }) {
	const icon = L.icon({
		iconUrl    : `https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/${iconSvg}.svg`,
		iconSize   : [ICON_SIZE, ICON_SIZE],
		iconAnchor : [ICON_ANCHOR, ICON_ANCHOR],
	});

	return (
		<FeatureGroup
			key={lat}
			eventHandlers={{
				add: (e) => map?.panInsideBounds(e?.target?.getBounds()),
			}}
		>
			<Marker position={[lat, lng]} icon={icon} />
		</FeatureGroup>
	);
}

export default Pointer;
