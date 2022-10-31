import { AdminLayout } from '@cogoport/components';
import React from 'react';

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
			{children}
		</AdminLayout>
	);
}

export default Layout;
