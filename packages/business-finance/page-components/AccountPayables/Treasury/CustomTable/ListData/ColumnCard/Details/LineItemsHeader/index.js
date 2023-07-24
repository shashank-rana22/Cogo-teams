import React from 'react';

import styles from './styles.module.css';

function LineItemsHeader() {
	return (
		<div className={styles.header}>
			<div className={styles.account_number}>Accounts Number</div>
			<div className={styles.currency}>Currency</div>
			<div className={styles.alloted_amount}>Alloted Amount</div>
			<div className={styles.utilized_amount}>Utilized Amount</div>
			<div className={styles.processing}>Processing</div>
			<div className={styles.settled}>Settled</div>
			<div className={styles.flush}>Flush</div>
			<div className={styles.view_more} />

		</div>
	);
}

export default LineItemsHeader;
