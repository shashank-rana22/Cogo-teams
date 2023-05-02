import React from 'react';

import { EMPTY_CUSTOMER_CARD } from '../../../../constants';

import styles from './styles.module.css';

function Empty() {
	return (
		<div className={styles.empty_state}>
			<div className={styles.empty_image_container}>
				<img src={EMPTY_CUSTOMER_CARD} alt="Empty State" width="160px" />
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
