import React from 'react';

import styles from '../styles.module.css';

function TotalAfterTax() {
	return (
		<div className={styles.tat}>
			<span className={styles.label}>Total amount after Tax :</span>
			<span className={styles.value}>INR 8,04,800</span>
		</div>
	);
}

export default TotalAfterTax;
