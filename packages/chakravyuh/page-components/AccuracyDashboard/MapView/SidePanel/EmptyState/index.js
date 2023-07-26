import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';
import React from 'react';

import styles from './styles.module.css';

function EmptyState({
	height = 250,
	width = 375,
	emptyHeading = 'Data not found',
	emptyText = '',
	textSize = '20px',
}) {
	return (
		<div className={styles.container}>
			<div>
				<div className={styles.text} style={{ fontSize: textSize }}>{emptyHeading}</div>
				<p className={styles.text}>{emptyText}</p>
			</div>
			<Image
				src={GLOBAL_CONSTANTS.image_url.empty_state}
				width={width}
				height={height}
				alt="empty state"
				className={styles.image}
			/>

		</div>
	);
}

export default EmptyState;
