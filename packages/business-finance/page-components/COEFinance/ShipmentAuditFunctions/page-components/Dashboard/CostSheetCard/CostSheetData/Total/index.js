import React from 'react';

import styles from './styles.module.css';

function Total({
	billTotal = '',
	invoiceTotal = '',
}) {
	return (
		<div className={styles.container}>
			<div className={styles.sub_container}>
				<span className={styles.row_heading}>
					Total
				</span>
			</div>
			<div className={styles.sub_container}>{billTotal}</div>
			<div className={styles.sub_container}>{invoiceTotal}</div>
		</div>
	);
}

export default Total;
