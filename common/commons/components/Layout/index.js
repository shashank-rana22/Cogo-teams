import React from 'react';

import AdminLayout from './AdminLayout';
import LogoSvg from './logo.svg';
import { nav } from './nav';

function Layout({ children, layout }) {
	const hideLayout = layout === 'hidden';

	return (
		<AdminLayout
			showTopbar={!hideLayout}
			showNavbar={!hideLayout}
			topbar={{
				logo: <LogoSvg
					height={32}
					width={132}
				/>,
			}}
			navbar={{ nav }}
		>
			<div style={{ margin: 0, padding: 20 }}>{children}</div>
		</AdminLayout>
	);
}

export default Layout;
