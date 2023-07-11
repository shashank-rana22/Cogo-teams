import Point from '@cogoport/map-components/ui/Point';
import { CogoMaps, L, Marker, Popup } from '@cogoport/maps';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect, useContext } from 'react';

import Pointer from './Pointer';
import Route from './Route';

const center = [20.5937, 78.9629];
const icon = new L.Icon({
	iconUrl  : '/images/default-red.svg',
	iconSize : [20, 20],
});
const baseLayer = [
	{
		name : 'Cogo Maps',
		url  : `${process.env.NEXT_PUBLIC_MAPS_BASE_URL}/{z}/{x}/{y}.png`,
		attribution:
            '<a href="https://www.cogoport.com/en/terms-and-conditions/">&copy;Cogoport T&C</a> | <a href="https://www.cogoport.com/en/privacy-policy/">Privacy & data protection</a>',
		minZoom : 0,
		maxZoom : 15,
	},
];

function MapComp({ path, points, bounds, setBounds, displayNameArray, data }) {
	const [map, setMap] = useState();
	const coordinates = data?.[0]?.route?.coordinates || data?.route?.coordinates || [];
	const curvePointLength = path?.length;

	useEffect(() => {
		if (!isEmpty(bounds) && map && bounds instanceof L.LatLngBounds) {
			map?.fitBounds(bounds);
		}
	}, [bounds, map]);

	const lineOptions = { color: '#007FFF' };
	return (
		<CogoMaps
			center={center}
			style={{ height: '700px', width: '100%' }}
			zoom={4}
			baseLayer={baseLayer}
			setMap={setMap}
		>
			<Pointer
				points={points}
				iconSvg="source"
				map={map}
				setBounds={setBounds}
				displayNameArray={displayNameArray}
			/>
			{/* { (data?.[0]?.service_lane_links || data?.vessel_schedule_link || [])?.map(({ coordinates, display_name = '', type, index }, i) => (
				<Point
					key={`${displayNameArray?.[index]}_${type}_${JSON.stringify(coordinates?.[index])}`}
					position={coordinates?.[index]}
					tooltipText={<div className={tooltip}>{displayNameArray[index]?.split(',')[0]}</div>}
					service_name={type}
					pane={!i || (i === data?.vessel_schedule_link?.length - 1) || (data?.[0]?.service_lane_links?.length - 1) ? 'shadowPane' : 'markerPane'}
					size={[13, 13]}
				/>
			))} */}
			<Route positions={path} map={map} pathOptions={lineOptions} />
		</CogoMaps>
	);
}

export default MapComp;
