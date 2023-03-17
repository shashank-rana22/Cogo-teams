import { L, FeatureGroup, Marker } from '@cogoport/utils';

function Pointer({ lat = '', lng = '', iconSvg = 'location', map }) {
	const icon = L.icon({
		iconUrl: `/mapIcon/${iconSvg}.svg`,
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
