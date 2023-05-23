import React from 'react';

import styles from './styles.module.css';

function Header() {
	return (
		<div className={styles.header}>
			<div className={styles.customer_name}>Customer Name</div>
			<div className={styles.customer_id}>Customer ID</div>
			<div className={styles.entity}>Entity</div>
			<div className={styles.cogo_bank}>Cogo Bank</div>
			<div className={styles.doc_value}>Doc. Value</div>
			<div className={styles.amount}>Amount</div>
			<div className={styles.upload}>Uploaded by and on</div>
			<div className={styles.utr}>UTR</div>
			<div className={styles.status}>Status</div>
			<div className={styles.accord} />
		</div>
	);
}

export default Header;
