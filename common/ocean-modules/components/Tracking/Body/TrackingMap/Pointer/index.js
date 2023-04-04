import { L, FeatureGroup, Marker } from '@cogoport/maps';

function Pointer({ lat = '', lng = '', iconSvg = 'location', map }) {
	const icon = L.icon({
		iconUrl: `https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/${iconSvg}.svg`,
		iconSize: [24, 24],
		iconAnchor: [12.75, 12.75],
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
