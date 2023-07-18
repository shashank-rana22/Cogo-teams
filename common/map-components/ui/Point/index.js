import { Marker, L, Tooltip } from '@cogoport/maps';
import React from 'react';

import styles from './styles.module.css';

export const getIcon = ({ className, size = [12, 12] }) => L.divIcon({
	className,
	iconSize    : L.point(...size),
	popupAnchor : [0, -15],
});

const black_location_icon = 	L.icon({
	iconUrl    : 'https://cogoport-production.sgp1.digitaloceanspaces.com/75240e56fccaa75827d6eaa7b58074e7/location-sign-svgrepo-com.svg',
	iconSize   : [30, 30],
	iconAnchor : [15, 30],
});
const red_location_icon = 	L.icon({
	iconUrl    : 'https://cogoport-production.sgp1.digitaloceanspaces.com/d61cf829358d7d826eda647636d66f91/Mediamodifier-Design.svg',
	iconSize   : [80, 80],
	iconAnchor : [40, 55],
});
const yellow_location_icon = 	L.icon({
	iconUrl    : 'https://cogoport-production.sgp1.digitaloceanspaces.com/af5dcf467b54929d7aa71af6a5bcdfd9/Mediamodifier-Design%20%281%29.svg',
	iconSize   : [0, 0],
	iconAnchor : [40, 55],
});

const Point = React.forwardRef(({
	position, tooltipText = '', tooltipProps = {}, isActive = false, service_name = 'default', size = [12, 12], index, points, showPointer = false, tooltipRefArray, isTooltipVisible, ...rest
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
				<>

					<Marker
						position={position}
						icon={index === 0 ? red_location_icon : (index === points.length - 1) ? black_location_icon : yellow_location_icon}
						{...rest}
						ref={ref}
					>
						{tooltipText && (
							<Tooltip>
								{tooltipText}
							</Tooltip>
						)}
					</Marker>
					{/* <Tooltip
						{...tooltipProps}
						ref={tooltipRefArray[index]}
						className={styles.tooltip}
					>
						{tooltipText}
					</Tooltip> */}

				</>
			) : null}

	</>

));

export default Point;
