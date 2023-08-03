import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React from 'react';

import styles from './styles.module.css';

function EmptyState() {
	return (
		<div className={styles.container}>
			<img src={GLOBAL_CONSTANTS.image_url.empty_data_image} alt="No Data found" className={styles.image} />
			<div className={styles.message}>No Data Found !!</div>
		</div>
	);
}

export default EmptyState;
