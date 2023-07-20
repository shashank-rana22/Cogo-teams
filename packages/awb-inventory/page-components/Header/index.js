import React from 'react';

import styles from './styles.module.css';

function Header() {
	return (
		<header className={styles.header_container}>
			<div className={styles.heading}>Advance Booking Dashboard</div>
		</header>
	);
}

export default Header;
