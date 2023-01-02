import cl from '@cogoport/components/src/utils/classname-processor';
import React from 'react';

import Navbar from './Navbar';
import styles from './styles.module.css';

function AdminLayout({
	children = null,
	showNavbar = false,
	navbar = {},
}) {
	return (
		<div className={cl`${styles.container} ${showNavbar ? styles.has_navbar : ''}`}>
			<main className={styles.children_container}>{children}</main>
			{showNavbar ? (
				<Navbar
					className={navbar.className}
					style={navbar.style}
					nav={navbar}
				/>
			) : null}
		</div>
	);
}

export default AdminLayout;
