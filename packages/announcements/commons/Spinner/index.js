import React from 'react';

import styles from './styles.module.css';

function Spinner({
	borderWidth = '8px',
	outerBorderColor = '#FEF1DF',
	spinBorderColor = '#FBD69F',
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
