/* eslint-disable max-len */
import { Marker, L, Tooltip } from '@cogoport/maps';
import React from 'react';

import styles from './styles.module.css';

const ZERO = 0;
const FIFTEEN = 15;
const TWELVE = 12;

export const getIcon = ({ className, size = [TWELVE, TWELVE] }) => L.divIcon({
	className,
	iconSize    : L.point(...size),
	popupAnchor : [ZERO, -FIFTEEN],
});

const Point = React.forwardRef(({
	position, tooltipText = '', isActive = false, service_name = 'default', size = [TWELVE, TWELVE], index, points, tooltipRefArray, isTooltipVisible, ...rest
}, ref) => (
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

));

export default Point;
