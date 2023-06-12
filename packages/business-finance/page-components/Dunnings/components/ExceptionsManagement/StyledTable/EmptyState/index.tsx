import React from 'react';

import styles from '../styles.module.css';

const EXCEPTIONS_MANAGEMENT = 'https://cogoport-production.sgp1.digitaloceanspaces.com/'
			+ '970a0d72c48e76c4da52963dfc852230/no-data.svg';

function EmptyState() {
	return (
		<div className={styles.container}>
			<img
				className={styles.img_height}
				src={EXCEPTIONS_MANAGEMENT}
				alt="No Data"
			/>
		</div>
	);
}

export default EmptyState;
