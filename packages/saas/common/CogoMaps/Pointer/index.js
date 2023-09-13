import { L, FeatureGroup, Marker } from '@cogoport/maps';

function Pointer({ lat = '', lng = '', iconSvg = 'location', map }) {
	const TWENTY_FOUR = 24;
	const TWELVE = 12.75;
	const icon = L.icon({
		iconUrl    : `https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/${iconSvg}.svg`,
		iconSize   : [TWENTY_FOUR, TWENTY_FOUR],
		iconAnchor : [TWELVE, TWELVE],
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
