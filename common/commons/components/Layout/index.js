import { AdminLayout } from '@cogoport/components';
import React from 'react';

import LogoSvg from './logo.svg';
import { nav } from './nav';
import styles from './styles.module.css';

function Layout({ children }) {
	return (
		<AdminLayout
			showTopbar
			showNavbar
			topbar={{
				logo: <LogoSvg height={20} />,
			}}
			navbar={{ nav }}
		>
			<div className={styles.overall_container}>{children}</div>
		</AdminLayout>
	);
}

export default Layout;
