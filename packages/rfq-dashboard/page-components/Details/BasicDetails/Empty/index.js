import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React from 'react';

import styles from './styles.module.css';

function Empty() {
	return (
		<div className={styles.empty_state}>
			<div className={styles.empty_image_container}>
				<img src={GLOBAL_CONSTANTS.image_url.empty_customer_card} alt="Empty State" width="160px" />
			</div>
			<div className={styles.horizontal_line} />
			<div className={styles.horizontal_line} />
			<div className={styles.horizontal_line} />
			<div className={styles.horizontal_line} />
			<div className={styles.horizontal_line} />

		</div>
	);
}

export default Empty;
