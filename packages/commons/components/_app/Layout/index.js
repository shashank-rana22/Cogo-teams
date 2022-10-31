import { AdminLayout } from '@cogoport/components';
import React from 'react';

import { nav } from '../../../constants/nav';

import LogoSvg from './logo.svg';

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
