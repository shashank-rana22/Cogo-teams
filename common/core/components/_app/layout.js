import navigationMappingAdmin from '@cogoport/navigation-configs/navigation-mapping-admin';
import { useSelector } from '@cogoport/store';
import React from 'react';

import AdminLayout from '../AdminLayout';
import ChatFAQs from '../AdminLayout/FAQs';

function Layout({ children, layout }) {
	const hideLayout = layout === 'hidden';

	const { profile = {} } = useSelector((state) => state);

	const { auth_role_data = [] } = profile;

	const { role_functions = [] } = auth_role_data || {};

	console.log('role_functions', role_functions);

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
				{role_functions.includes('sales') && <ChatFAQs />}
				{children}

			</div>
		</AdminLayout>
	);
}

export default Layout;
