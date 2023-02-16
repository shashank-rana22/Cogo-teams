import React from 'react';

import styles from './styles.module.css';

function Header({
	onBack = () => {},
}) {
	return (
		<div className={styles.header}>
			<div className={styles.title}>
				Vendor Services
			</div>
			<div
				role="presentation"
				className={styles.back_link}
				onClick={onBack}
			>
				Back to Vendor Contact
			</div>
		</div>
	);
}

export default Header;
