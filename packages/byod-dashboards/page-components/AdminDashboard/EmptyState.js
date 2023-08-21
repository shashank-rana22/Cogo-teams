import React from 'react';

import styles from './styles.module.css';

function EmptyState({ emptyText = 'no data found' }) {
	return (
		<div className={styles.image_container}>
			<img
				src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/shipmentEmptyState.png"
				alt="Empty"
				className={styles.no_data_found_img}
			/>
			<div className={styles.error}>{emptyText}</div>
		</div>
	);
}
export default EmptyState;
