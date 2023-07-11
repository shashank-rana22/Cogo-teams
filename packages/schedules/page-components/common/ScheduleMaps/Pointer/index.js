import { getIconUrl } from '@cogoport/icons';
import svg from '@cogoport/icons/svgs/ic-m-location.svg';
import { IcMLocation } from '@cogoport/icons-react';
import { CircleMarker, L, Marker, Popup } from '@cogoport/maps';
import { useEffect } from 'react';

const ICON_SIZE = 24;
const ICON_ANCHOR = 12.75;
function Pointer({ points, iconSvg = 'location', map, setBounds = () => {}, displayNameArray }) {
	// const show_location = true;
	// const X_CENTER = 19.1176;
	// const Y_CENTER = 72.8714;
	// const center = [X_CENTER, Y_CENTER];
	// const black_location_url = getIconUrl('ic-m-location-black');
	// const red_location_url = getIconUrl('ic-m-location-red');
	// const yellow_location_url = getIconUrl('ic-m-location');

	const icon = L.icon({
		iconUrl    : `https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/${iconSvg}.svg`,
		iconSize   : [ICON_SIZE, ICON_SIZE],
		iconAnchor : [ICON_ANCHOR, ICON_ANCHOR],
	});
	const black_location_icon = 	L.icon({
		iconUrl    : 'https://cogoport-production.sgp1.digitaloceanspaces.com/75240e56fccaa75827d6eaa7b58074e7/location-sign-svgrepo-com.svg',
		iconSize   : [38, 38],
		iconAnchor : [20, 40],
	});
	const red_location_icon = 	L.icon({
		iconUrl    : 'https://cogoport-production.sgp1.digitaloceanspaces.com/d61cf829358d7d826eda647636d66f91/Mediamodifier-Design.svg',
		iconSize   : [100, 100],
		iconAnchor : [50, 70],
	});
	const yellow_location_icon = 	L.icon({
		iconUrl    : 'https://cogoport-production.sgp1.digitaloceanspaces.com/af5dcf467b54929d7aa71af6a5bcdfd9/Mediamodifier-Design%20%281%29.svg',
		iconSize   : [100, 100],
		iconAnchor : [50, 70],
	});
	useEffect(() => {
		const bounds = new L.LatLngBounds(points);
		setBounds(bounds);
	}, [JSON.stringify(points)]);

	return points?.map((coordinates, index) => (
		<>
			<Marker position={coordinates} icon={icon}>
				<Popup>{displayNameArray[index]}</Popup>
			</Marker>
			{/* {(index !== 0 && index + 1 !== points.length) ? (
					<Marker position={coordinates} icon={yellow_location_icon} />
				): null} */}
			{(index === 0) ? (
				<Marker position={coordinates} icon={red_location_icon} />
			) : null}
			{points.length - 1 === index ? (
				<Marker position={coordinates} icon={black_location_icon} />) : null}
		</>
	));
}

export default Pointer;
