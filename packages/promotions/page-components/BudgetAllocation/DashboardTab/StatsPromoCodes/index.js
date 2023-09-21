import React from 'react';

import styles from './styles.module.css';

function StatsPromoCodes({
	title = '',
	number = '',
	amount = '',
	currency = '$',
}) {
	return (
		<div className={styles.card}>
			<div className={styles.title}>{title}</div>
			<div className={styles.mainContainer}>
				<div className={styles.containerColumn}>
					<div className={styles.mainText}>{number}</div>
					<div className={styles.subText}>Number</div>
				</div>
				<div className={styles.divider} />
				<div className={styles.containerColumn}>
					<div className={styles.mainText}>{amount}</div>
					<div className={styles.subText}>
						{currency}
						Amount
					</div>
				</div>
			</div>
		</div>
	);
}

export default StatsPromoCodes;
