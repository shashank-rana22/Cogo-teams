import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { CogoMaps, L, Marker, Popup } from '@cogoport/maps';
import { useEffect, useState } from 'react';

const X_CENTER = 19.1176;
const Y_CENTER = 72.8714;
const ICON_SIZE = 50;
const center = [X_CENTER, Y_CENTER];
const NUMBER = 10;

const icon = new L.Icon({
	iconUrl  : GLOBAL_CONSTANTS.image_url.destination_icon,
	iconSize : [ICON_SIZE, ICON_SIZE],
});

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

function Map() {
	const [map, setMap] = useState(null);

	useEffect(() => {
		if (map) {
			map.flyTo(center, NUMBER);
		}
	}, [map]);

	return (
		<CogoMaps
			center={center}
			style={{ height: '700px', width: '100%' }}
			zoom={4}
			maxZoom={15}
			baseLayer={baseLayer}
			setMap={setMap}
		>
			<Marker position={center} icon={icon}>
				<Popup>
					Cogoport - Mumbai Location
				</Popup>
			</Marker>
		</CogoMaps>
	);
}

export default Map;
