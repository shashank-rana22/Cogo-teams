import { cl } from '@cogoport/components';
import React from 'react';

import { HUNDRED, VALUE_TWO } from '../../../../../configurations/helpers/constants';

import styles from './styles.module.css';

function CircularProgressBar({
	sqSize = 80,
	percentage = 0,
	strokeWidth = 8,
	color = 'green_color',
}) {
	const radius = (sqSize - strokeWidth) / VALUE_TWO;
	const viewBox = `0 0 ${sqSize} ${sqSize}`;
	const dashArray = radius * Math.PI * VALUE_TWO;
	const dashOffset = dashArray - (dashArray * percentage) / HUNDRED;

	return (
		<svg width={sqSize} height={sqSize} viewBox={viewBox}>
			<circle
				className={styles.circle_background}
				cx={sqSize / VALUE_TWO}
				cy={sqSize / VALUE_TWO}
				r={radius}
				strokeWidth={`${strokeWidth}px`}
			/>
			<circle
				className={cl`${styles.circle_progress} ${styles[color]}`}
				cx={sqSize / VALUE_TWO}
				cy={sqSize / VALUE_TWO}
				r={radius}
				strokeWidth={`${strokeWidth}px`}
				transform={`rotate(-90 ${sqSize / VALUE_TWO} ${sqSize / VALUE_TWO})`}
				style={{ strokeDasharray: dashArray, strokeDashoffset: dashOffset }}
			/>
			<text
				className={styles.circle_text}
				x="50%"
				y="45%"
				dy=".3em"
				textAnchor="middle"
			>
				{`${percentage}%`}
			</text>
			<text
				className={styles.text}
				x="50%"
				y="60%"
				dy=".3em"
				textAnchor="middle"
			>
				completed
			</text>
		</svg>
	);
}
export default CircularProgressBar;
