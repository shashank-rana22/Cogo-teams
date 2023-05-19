import { CogoMaps, L, Marker, Popup } from '@cogoport/maps';
import { useEffect, useState } from 'react';

const center = [19.1176, 72.8714];
const icon = new L.Icon({
	iconUrl  : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/destination-icon.svg',
	iconSize : [50, 50],
});

function Map() {
	const baseLayer = [
		{
			name : 'Cogo Maps',
			url  : `${process.env.NEXT_PUBLIC_MAPS_BASE_URL}/{z}/{x}/{y}.png`,
			attribution:
			// eslint-disable-next-line max-len
			'<a href="https://www.cogoport.com/en/terms-and-conditions/" >& copy; Cogoport T&C </a > | < a href="https://www.cogoport.com/en/privacy-policy/" > Privacy & data protection</>',
			minZoom : 0,
			maxZoom : 15,
		},
	];

	const [map, setMap] = useState();

	useEffect(() => {
		if (map) {
			map.flyTo(center, 10);
		}
	}, [map]);

	return (
		<CogoMaps
			center={center}
			style={{ height: '700px', width: '100%' }}
			zoom={4}
			baseLayer={baseLayer}
			setMap={setMap}
		>
			<Marker position={center} icon={icon}>
				<Popup>
					This is a popup
				</Popup>
			</Marker>
		</CogoMaps>
	);
}

export default Map;
