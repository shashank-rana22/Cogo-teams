import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React, { useEffect, useState } from 'react';

import styles from './styles.module.css';

function ProgressCircle({
	radius,
	stroke,
	progress,
	progressColor = 'orange',
	backgroundColor = '#ccc',
}) {
	const [state, setState] = useState({});
	const HUNDRED = 100;
	useEffect(() => {
		const normalizedRadius = radius - stroke * GLOBAL_CONSTANTS.two;
		const circumference = normalizedRadius * GLOBAL_CONSTANTS.two * Math.PI;
		setState({ normalizedRadius, circumference });
	}, [radius, stroke]);

	const { circumference = 0, normalizedRadius = 0 } = state || {};

	const strokeDashoffset = circumference - (progress / HUNDRED) * circumference;

	return (
		<div className={styles.progress_container}>
			<svg height={radius * GLOBAL_CONSTANTS.two} width={radius * GLOBAL_CONSTANTS.two}>
				<circle
					stroke={backgroundColor}
					strokeWidth={stroke}
					fill="transparent"
					r={normalizedRadius}
					cx={radius}
					cy={radius}
				/>
				<circle
					stroke={progressColor}
					fill="transparent"
					strokeWidth={stroke}
					strokeDasharray={`${circumference} ${circumference}`}
					strokeLinecap="round"
					style={{ strokeDashoffset }}
					r={normalizedRadius}
					cx={radius}
					cy={radius}
				/>
			</svg>
		</div>
	);
}

export default ProgressCircle;
