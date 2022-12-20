import React from 'react';

import AdminLayout from './AdminLayout';
import LogoSvg from './logo.svg';
import { nav } from './nav';

function Layout({ children, layout }) {
	const hideLayout = layout === 'hidden';

	if (hideLayout) {
		return <div>{children}</div>;
	}

	return (
		<AdminLayout
			showTopbar
			showNavbar
			topbar={{
				logo: <LogoSvg
					height={32}
					width={132}
				/>,
			}}
			navbar={{ nav }}
		>
			<div style={{ margin: 0, padding: '24px 20px' }}>{children}</div>
		</AdminLayout>
	);
}

export default Layout;
