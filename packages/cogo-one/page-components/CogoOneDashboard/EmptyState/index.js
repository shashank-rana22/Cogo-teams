import React from 'react';

import { emptyImage } from '../constants';

import styles from './styles.module.css';

function EmptyStateAgentActivity() {
	return (
		<div className={styles.empty_state}>
			<div className={styles.empty_image_container}>
				<img
					src={emptyImage}
					alt="Empty State"
					className={styles.empty_state_icon}
					width="135px"
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
