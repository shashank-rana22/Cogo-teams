import cl from '@cogoport/components/src/utils/classname-processor';
import getSideBarConfigs from '@cogoport/navigation-configs/side-bar';
import { useSelector } from '@cogoport/store';
import React, { useState } from 'react';

import Navbar from './Navbar';
import styles from './styles.module.css';
import Topbar from './Topbar';

function AdminLayout({
	children = null, showTopbar = true, topbar = {}, showNavbar = false, navbar = {},
}) {
	const [showMobileNavbar, setShowMobileNavbar] = useState(false);

	const {
		user_data,
	} = useSelector(({ profile }) => ({
		user_data: profile || {},
	}));
	const configs = getSideBarConfigs(user_data);

	const { nav_items = {} } = configs || {};

	const { partner = [] } = nav_items || {};

	return (
		<div className={cl`
			${styles.container} 
			${showTopbar ? styles.has_topbar : ''} 
			${showNavbar ? styles.has_navbar : ''}`}
		>
			<main className={styles.children_container}>{children}</main>
			{showTopbar ? (
				<Topbar
					className={topbar.className}
					style={topbar.style}
					logo={topbar.logo}
					onClickMobileNav={() => setShowMobileNavbar((s) => !s)}
					showMobileNav={showNavbar}
					showMobileNavbar={showMobileNavbar}
				/>
			) : null}
			{showNavbar ? (
				<Navbar
					className={navbar.className}
					style={navbar.style}
					nav={partner}
					mobileShow={showMobileNavbar}
				/>
			) : null}
		</div>
	);
}

export default AdminLayout;
