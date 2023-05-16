import React from 'react';

import styles from './styles.module.css';

function LineItemsHeader() {
	return (
		<div className={styles.header}>
			<div className={styles.entity}>Entity</div>
			<div className={styles.jvmode}>JV mode</div>
			<div className={styles.businesss}>Business Partner</div>
			<div className={styles.type}>Type</div>
			<div className={styles.glcode}>GL Code</div>
			<div className={styles.legamount}>Ledger Amount</div>
			<div className={styles.amount}>Amount</div>
		</div>
	);
}

export default LineItemsHeader;
