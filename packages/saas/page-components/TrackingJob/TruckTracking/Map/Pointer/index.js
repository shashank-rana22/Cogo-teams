import { L, Marker, FeatureGroup, Popup } from '@cogoport/maps';

function Pointer({
	lat = '',
	lng = '',
	map,
	origin = {},
	destination = {},
	iconSvg = 'location',
}) {
	const icon = L.icon({
		iconUrl: `/mapIcon/${iconSvg}.svg`,
		iconSize: [24, 24],
		iconAnchor: [12.75, 12.75],
		popupAnchor: [0, -46],
	});

	return (
		<>
			<FeatureGroup
				key={lat}
				eventHandlers={{
					add: (e) => map?.panInsideBounds(e.target.getBounds()),
				}}
			>
				<Marker position={[lat, lng]} icon={icon}>
					{origin.display_name && (
						<Popup>
							<p>
								<b>Origin : </b>
								{origin.display_name}
							</p>
						</Popup>
					)}
					{destination.display_name && (
						<Popup>
							<p>
								<b>Destination :</b> {destination.display_name}
							</p>
						</Popup>
					)}
				</Marker>
			</FeatureGroup>
		</>
	);
}

export default Pointer;
