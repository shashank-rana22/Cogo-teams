import React from 'react';

import styles from './styles.module.css';

function CircularProgressBar(props) {
	const { sqSize, strokeWidth, percentage = 25, counter } = props;
	const radius = (sqSize - strokeWidth) / 2;
	const viewBox = `0 0 ${sqSize} ${sqSize}`;
	const dashArray = radius * Math.PI * 2;
	const dashOffset = dashArray - (dashArray * percentage) / 100;

	return (
		<svg
			width={sqSize}
			height={sqSize}
			viewBox={viewBox}
		>
			<circle
				className={styles.circle_background}
				cx={sqSize / 2}
				cy={sqSize / 2}
				r={radius}
				strokeWidth={`${strokeWidth}px`}
			/>
			<circle
				className={styles.circle_progress}
				cx={sqSize / 2}
				cy={sqSize / 2}
				r={radius}
				strokeWidth={`${strokeWidth}px`}
				transform={`rotate(-90 ${sqSize / 2} ${sqSize / 2})`}
				style={{
					strokeDasharray  : dashArray,
					strokeDashoffset : dashOffset,
				}}
			/>
			<text
				className={styles.circle_text}
				x="50%"
				y="50%"
				dy=".3em"
				textAnchor="middle"
			>
				{`${counter}`}
			</text>
		</svg>
	);
}

function Counter(props) {
	const { reloadCounter, nextReloadAt } = props;

	return (
		<div>
			<CircularProgressBar
				strokeWidth={4}
				sqSize={50}
				percentage={(reloadCounter / nextReloadAt) * 100}
				counter={reloadCounter}
			/>
		</div>
	);
}

export default Counter;
