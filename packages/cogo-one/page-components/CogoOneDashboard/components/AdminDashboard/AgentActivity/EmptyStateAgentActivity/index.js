import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';
import React from 'react';

import styles from './styles.module.css';

function EmptyStateAgentActivity() {
	return (
		<div className={styles.empty_state}>
			<div className={styles.empty_image_container}>
				<Image
					src={GLOBAL_CONSTANTS.image_url.empty_chart}
					alt="Empty State"
					className={styles.empty_state_icon}
					width={100}
					height={100}
				/>
			</div>
			<div className={styles.horizontal_line} />
			<div className={styles.horizontal_line} />
			<div className={styles.horizontal_line} />
			<div className={styles.horizontal_line} />
			<div className={styles.horizontal_line} />

		</div>
	);
}

export default EmptyStateAgentActivity;
