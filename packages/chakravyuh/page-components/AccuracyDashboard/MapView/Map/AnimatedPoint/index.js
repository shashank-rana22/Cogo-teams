import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Marker, L } from '@cogoport/maps';
import React from 'react';

import styles from './styles.module.css';

const ANCHOR = -15;
const DEFAULT_SIZE = 12;
const getIcon = ({ className, backgroundColor, size }) => L.divIcon({
	className   : styles.remove_bg,
	iconSize    : L.point(...size),
	popupAnchor : [GLOBAL_CONSTANTS.zeroth_index, ANCHOR],
	html        : `<div class="${className}" 
					style="background: ${backgroundColor}"
					/>`,

});

const Point = React.forwardRef(({
	position, animate = false, className = '', backgroundColor,
	size = [DEFAULT_SIZE, DEFAULT_SIZE], children, ...rest
}, ref) => (
	<Marker
		position={position}
		icon={getIcon({
			className: `${styles.point_animation}
			${!animate ? styles.hide_animation : ''} ${className}`,
			size,
			backgroundColor,
		})}
		{...rest}
		ref={ref}
	>
		{children}
	</Marker>
));

export default Point;
