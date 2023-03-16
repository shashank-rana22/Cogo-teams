import navigationMappingAdmin from '@cogoport/navigation-configs/navigation-mapping-admin';
import { dynamic } from '@cogoport/next';
import { useSelector } from '@cogoport/store';
import React from 'react';

import AdminLayout from '../AdminLayout';

const ChatFAQs = dynamic(() => import('../AdminLayout/FAQs'), { ssr: false });

function Layout({ children, layout }) {
	const hideLayout = layout === 'hidden';

	const { profile = {} } = useSelector((state) => state);

	const { auth_role_data = [] } = profile;

	const { role_functions = [] } = auth_role_data || {};

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
