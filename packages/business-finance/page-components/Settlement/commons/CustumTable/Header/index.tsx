import React from 'react';

import styles from './styles.module.css';

function Header() {
	return (
		<div className={styles.header}>
			<div className={styles.jvnumb}>JV Number</div>
			<div className={styles.jvtype}>JV Type</div>
			<div className={styles.accdate}>Accounting Date</div>
			<div className={styles.curr}>Currency</div>
			<div className={styles.entity}>Entity</div>
			<div className={styles.journal}>Journal</div>
			<div className={styles.exrate}>Exc. Rate</div>
			<div className={styles.legcurr}>Ledger Currency</div>
			<div className={styles.accord} />
		</div>
	);
}

export default Header;
