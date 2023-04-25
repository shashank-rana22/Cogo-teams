import React from 'react';

import styles from './styles.module.css';

const NoDataImage = 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/noShipmentLeft.svg';

function EmptyState() {
	return (
		<div className={styles.container}>
			<img
				className={styles.img_height}
				src={NoDataImage}
				alt="No Data"
			/>
		</div>
	);
}

export default EmptyState;
