import React from 'react';

import styles from './styles.module.css';

function Total() {
	return (
		<div className={styles.container}>
			<div className={styles.sub_container}>
				<span className={styles.row_heading}>
					Total
				</span>
			</div>
			<div className={styles.sub_container}>Service-1 total</div>
			<div className={styles.sub_container}>Service-2 total</div>
		</div>
	);
}

export default Total;
