import React from 'react';

import styles from './styles.module.css';

function DiscountRect({
	heading = '',
	statlabel = '',
	statvalue = '',
}) {
	return (
		<div
			className={styles.discountcontainer}
		>
			<div
				className={styles.label}
			>
				{heading}
			</div>
			<div className={styles.stat}>{statvalue}</div>
			<div className={styles.stat}>
				{statlabel}
				{' '}
			</div>
		</div>
	);
}

export default DiscountRect;
