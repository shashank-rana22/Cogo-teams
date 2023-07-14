import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React from 'react';

import styles from './styles.module.css';

function EmptyState({
	height = 250,
	width = 375,
	emptyText = 'Data not found',
	textSize = '20px',
}) {
	return (
		<div className={styles.container}>
			<img
				src={GLOBAL_CONSTANTS.image_url.empty_state}
				width={width}
				height={height}
				alt="empty state"
				className={styles.image}
			/>
			<div>
				<div className={styles.text} style={{ fontSize: textSize }}>{emptyText}</div>
				<p className={styles.text}>We are sorry what you were looking for. Please try another way</p>
			</div>
		</div>
	);
}

export default EmptyState;
