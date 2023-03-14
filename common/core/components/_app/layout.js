import navigationMappingAdmin from '@cogoport/navigation-configs/navigation-mapping-admin';
import React from 'react';

import AdminLayout from '../AdminLayout';
import ChatFAQs from '../AdminLayout/FAQs';

function Layout({ children, layout }) {
	const hideLayout = layout === 'hidden';

	if (hideLayout) {
		return <div>{children}</div>;
	}

	return (
		<AdminLayout
			showNavbar
			showTopbar
			navbar={navigationMappingAdmin}
		>
			<div style={{ margin: 0, padding: '24px 20px' }}>
				<ChatFAQs />
				{children}

			</div>
		</AdminLayout>
	);
}

export default Layout;
