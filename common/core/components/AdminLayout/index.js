import cl from '@cogoport/components/src/utils/classname-processor';
import getSideBarConfigs from '@cogoport/navigation-configs/side-bar';
import { useSelector } from '@cogoport/store';
import React from 'react';

import Navbar from './Navbar';
import styles from './styles.module.css';

function AdminLayout({
	children = null,
	showNavbar = false,
	navbar = {},
}) {
	const {
		user_data,
	} = useSelector(({ profile }) => ({
		user_data: profile || {},
	}));
	const configs = getSideBarConfigs(user_data);

	const { nav_items = {} } = configs || {};

	const { partner = [] } = nav_items || {};

	return (
		<div className={cl`${styles.container} ${showNavbar ? styles.has_navbar : ''}`}>
			<main className={styles.children_container}>{children}</main>
			{showNavbar ? (
				<Navbar
					className={navbar.className}
					style={navbar.style}
					nav={partner}
				/>
			) : null}
		</div>
	);
}

export default AdminLayout;
