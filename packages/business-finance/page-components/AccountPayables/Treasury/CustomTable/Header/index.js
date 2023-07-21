import React from 'react';

import styles from './styles.module.css';

function Header() {
	return (
		<div className={styles.header}>
			<div className={styles.date}>
				Date
			</div>
			<div className={styles.alloted}>Alloted</div>
			<div className={styles.utilized}>Utilized</div>
			<div className={styles.prcessing}>Processing</div>
			<div className={styles.settled}>Settled</div>
			<div className={styles.flush}>Flush</div>
			<div className={styles.accord} />
		</div>
	);
}

export default Header;
