/* eslint-disable max-len */
import { Marker, L, Tooltip } from '@cogoport/maps';
import React from 'react';

import styles from './styles.module.css';

const ZERO = 0;
const FIFTEEN = 15;
const TWELVE = 12;
const THIRTY = 30;
const EIGHTY = 80;
const FIFTY_FIVE = 45;
const FOURTY = 40;
const ONE = 1;

export const getIcon = ({ className, size = [TWELVE, TWELVE] }) => L.divIcon({
	className,
	iconSize    : L.point(...size),
	popupAnchor : [ZERO, -FIFTEEN],
});

const black_location_icon = 	L.icon({
	iconUrl    : 'https://cogoport-production.sgp1.digitaloceanspaces.com/75240e56fccaa75827d6eaa7b58074e7/location-sign-svgrepo-com.svg',
	iconSize   : [THIRTY, THIRTY],
	iconAnchor : [FIFTEEN, THIRTY],
});
const red_location_icon = 	L.icon({
	iconUrl    : 'https://cogoport-production.sgp1.digitaloceanspaces.com/d61cf829358d7d826eda647636d66f91/Mediamodifier-Design.svg',
	iconSize   : [EIGHTY, EIGHTY],
	iconAnchor : [FOURTY, FIFTY_FIVE],
});
const yellow_location_icon = 	L.icon({
	iconUrl    : 'https://cogoport-production.sgp1.digitaloceanspaces.com/af5dcf467b54929d7aa71af6a5bcdfd9/Mediamodifier-Design%20%281%29.svg',
	iconSize   : [ZERO, ZERO],
	iconAnchor : [FOURTY, FIFTY_FIVE],
});

const Point = React.forwardRef(({
	position, tooltipText = '', isActive = false, service_name = 'default', size = [TWELVE, TWELVE], index, points, showPointer = false, tooltipRefArray, isTooltipVisible, ...rest
}, ref) => (
	<>

		<Marker
			position={position}
			icon={getIcon({
				className: `${styles.point_animation}
			${styles[service_name]} ${!isActive ? styles.hide_animation : ''}`,
				size,
			})}
			{...rest}
			ref={ref}
		>
			{tooltipText && (
				<Tooltip>
					{tooltipText}
				</Tooltip>
			)}
		</Marker>
		{showPointer
			? (
				<Marker
					position={position}
						// eslint-disable-next-line no-nested-ternary
					icon={index === ZERO ? red_location_icon : (index === points.length - ONE) ? black_location_icon : yellow_location_icon}
					{...rest}
					ref={ref}
				>
					{tooltipText && (
						<Tooltip>
							{tooltipText}
						</Tooltip>
					)}
				</Marker>
			) : null}

	</>

));

export default Point;
