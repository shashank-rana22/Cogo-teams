// import { useRouter } from 'next/router';
import cl from '@cogoport/components/src/utils/classname-processor';
import React, { useState } from 'react';

import Navbar from './Navbar/index';
import styles from './styles.module.css';
import Topbar from './Topbar';

function AdminLayout({
	children = null,
	showTopbar = true,
	topbar = {},
	showNavbar = false,
	navbar = {},
}) {
	const [showMobileNavbar, setShowMobileNavbar] = useState(false);

	return (
		<div
			className={cl`
				${styles.container}
				${showTopbar ? styles.has_topbar : ''}
				${showNavbar ? styles.has_navbar : ''}
			`}
		>
			<main className={styles.children_container}>
				{children}
			</main>
			{showTopbar ? (
				<Topbar
					className={topbar.className}
					style={topbar.style}
					logo={topbar.logo}
					socials={topbar.socials}
					onClickMobileNav={() => setShowMobileNavbar((s) => !s)}
					showMobileNav={showNavbar}
				/>
			) : null}
			{showNavbar ? (
				<Navbar
					className={navbar.className}
					style={navbar.style}
					nav={navbar.nav}
					mobileShow={showMobileNavbar}
				/>
			) : null}
		</div>

	);
}

export default AdminLayout;
