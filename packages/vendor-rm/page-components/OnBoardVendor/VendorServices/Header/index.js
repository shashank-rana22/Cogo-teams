import React from 'react';

import styles from './styles.module.css';

function Header() {
	return (
		<div className={styles.header}>
			<div className={styles.title}>
				Vendor Services
			</div>
			<div role="button" className={styles.back_link}>
				Back to Vendor Contact
			</div>
		</div>
	);
}

export default Header;
