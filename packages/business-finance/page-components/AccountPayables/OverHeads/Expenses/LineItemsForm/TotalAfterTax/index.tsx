import React from 'react';

import styles from '../styles.module.css';

function TotalAfterTax({ totalPayable }) {
	const getValue = (value) => {
		if (Number.isNaN(value)) {
			return '---';
		}
		return parseFloat(value).toFixed(2);
	};
	return (
		<div className={styles.tat}>
			<span className={styles.label}>Total Payable :</span>
			<span className={styles.value}>{getValue(totalPayable)}</span>
		</div>
	);
}

export default TotalAfterTax;
