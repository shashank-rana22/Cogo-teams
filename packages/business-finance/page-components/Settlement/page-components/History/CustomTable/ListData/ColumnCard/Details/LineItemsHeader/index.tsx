import React from 'react';

import styles from './styles.module.css';

function LineItemsHeader() {
	return (
		<div className={styles.header}>
			<div className={styles.doc_number}>Document No.</div>
			<div className={styles.sid}>SID</div>
			<div className={styles.doc_amount}>Document Amount</div>
			<div className={styles.settled_amount}>Settled Amount</div>
			<div className={styles.tds}>TDS</div>
			<div className={styles.nostro}>NOSTRO</div>
			<div className={styles.current_balance}>Current Balance</div>
			<div className={styles.doc_date}>Document Date</div>
			<div className={styles.status}>Status</div>
			<div className={styles.settlemet_status}>Settlement Status</div>
		</div>
	);
}

export default LineItemsHeader;
