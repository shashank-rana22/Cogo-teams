import React from 'react';

import styles from './styles.module.css';

function Spinner({
	borderWidth = '4px',
	outerBorderColor = '#FEF1DF',
	spinBorderColor = '#FBD69F',
	width = '60px',
	height = '60px',
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
