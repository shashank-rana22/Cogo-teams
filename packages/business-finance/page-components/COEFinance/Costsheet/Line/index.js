import React from 'react';

import styles from './styles.module.css';

function Line({
	width = '100%',
	margin = '0px',
	color = '#000000',
	thickness = '1px',
}) {
	return (
		<div
			className={styles.line}
			style={{
				'--width'     : width,
				'--margin'    : margin,
				'--color'     : color,
				'--thickness' : thickness,
			}}
		/>
	);
}

export default Line;
