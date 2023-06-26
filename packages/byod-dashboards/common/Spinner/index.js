import React from 'react';

import styles from './styles.module.css';

function Spinner({
	borderWidth = '10px',
	outerBorderColor = '#ffcccb',
	spinBorderColor = '#fc0101',
	width = '100px',
	height = '100px',
}) {
	return (
		<div
			className={styles.spinner}
			style={{
				border    : `${borderWidth} solid ${outerBorderColor}`,
				borderTop : `${borderWidth} solid ${spinBorderColor}`,
				width,
				height,
			}}
		/>
	);
}

export default Spinner;
