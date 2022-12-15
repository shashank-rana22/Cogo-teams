import React from 'react';

import AdminLayout from './AdminLayout';
import LogoSvg from './logo.svg';
import { nav } from './nav';

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
			<div style={{ margin: '0 100px' }}>{children}</div>
		</AdminLayout>
	);
}

export default Layout;
