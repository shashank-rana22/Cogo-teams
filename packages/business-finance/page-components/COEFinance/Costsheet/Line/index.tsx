import React, { CSSProperties } from 'react';

import styles from './styles.module.css';

interface Props {
	width?: string;
	margin?: string;
	color?: string;
	thickness?: string;
}

function Line({
	width = '100%',
	margin = '0px',
	color = '#000000',
	thickness = '1px',
}: Props) {
	return (
		<div
			className={styles.line}
			style={{
				'--width'     : width,
				'--margin'    : margin,
				'--color'     : color,
				'--thickness' : thickness,
			} as CSSProperties}
		/>
	);
}

export default Line;
