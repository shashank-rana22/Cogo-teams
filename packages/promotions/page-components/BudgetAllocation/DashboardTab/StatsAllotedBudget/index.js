import React from 'react';

import styles from './styles.module.css';

function StatsAllotedBudget({ amount = '' }) {
	return (
		<div className={styles.card}>
			<div className={styles.title}>Alloted Budget</div>
			<div className={styles.mainText}>{amount}</div>
			<div className={styles.subText}>Amount</div>
		</div>
	);
}

export default StatsAllotedBudget;
