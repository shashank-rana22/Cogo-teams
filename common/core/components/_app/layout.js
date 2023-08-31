import navigationMappingAdmin from '@cogoport/navigation-configs/navigation-mapping-admin';
import { dynamic } from '@cogoport/next';
import { useSelector } from '@cogoport/store';
import React from 'react';

import AdminLayout from '../AdminLayout';

import useGetFaqNotifications from './useGetFaqNotifications';

const ChatFAQs = dynamic(() => import('../AdminLayout/FAQs'), { ssr: true });

const FAQ_BUBBLE_EXCLUSION_LIST = ['external'];

function Layout({ children, layout }) {
	const hideLayout = layout === 'hidden';

	const profile = useSelector((state) => state.profile || {});

	const { auth_role_data = [] } = profile;

	const { role_functions = [] } = auth_role_data || {};

	const {
		faqNotificationApiLoading,
		fetchFaqNotification,
		faqNotificationApi,
		faqData,
		trigger,
	} = useGetFaqNotifications();

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
				{!role_functions.some((r) => FAQ_BUBBLE_EXCLUSION_LIST.includes(r)) && (
					<ChatFAQs
						faqNotificationData={faqData}
						faqNotificationApiLoading={faqNotificationApiLoading}
						fetchFaqNotification={fetchFaqNotification}
						faqNotificationApi={faqNotificationApi}
						refetch={trigger}
					/>
				)}
				{children}
			</div>
		</AdminLayout>
	);
}

export default Layout;
