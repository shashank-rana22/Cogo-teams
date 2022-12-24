import { AdminLayout, navigationMappings } from '@cogoport/layout';
import React from 'react';

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
				logo: <img
					alt="cogoport-logo"
					height="32px"
					width="132px"
					src="https://cdn.cogoport.io/cms-prod/vault/original/logo-cogoport-1.svg"
				/>,
			}}
			navbar={navigationMappings}
		>
			<div style={{ margin: 0, padding: '24px 20px' }}>{children}</div>
		</AdminLayout>
	);
}

export default Layout;
