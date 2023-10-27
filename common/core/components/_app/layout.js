import navigationMapping from '@cogoport/navigation-configs/navigation-mapping-admin';
import { dynamic } from '@cogoport/next';
import { useSelector } from '@cogoport/store';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React from 'react';

import AdminLayout from '../AdminLayout';

import useGetFaqNotifications from './useGetFaqNotifications';

const ChatFAQs = dynamic(() => import('../AdminLayout/FAQs'), { ssr: true });

const FAQ_BUBBLE_EXCLUSION_LIST = ['external'];

const NO_PADDING_LAYOUT_MAPPING = [
	'/[partner_id]/performance-and-incentives/public-leaderboard',
];

const HIDE_FAQ_CHAT = [
	'/[partner_id]/performance-and-incentives/public-leaderboard',
];

function Layout({ children, layout }) {
	const router = useRouter();

	const { t } = useTranslation(['common']);

	const hideLayout = layout === 'hidden';

	const { general, profile } = useSelector((state) => state);

	const { auth_role_data = [] } = profile;

	const { pathname } = general;

	const { role_functions = [] } = auth_role_data || {};

	const navigationMappingAdmin = navigationMapping({ t });

	const {
		faqNotificationApiLoading,
		fetchFaqNotification,
		faqNotificationApi,
		faqData,
		trigger,
	} = useGetFaqNotifications();

	if (hideLayout || ['/404', '/_error'].includes(router.route)) {
		return <div>{children}</div>;
	}

	return (
		<AdminLayout
			showNavbar
			showTopbar
			navbar={navigationMappingAdmin}
		>
			<div style={NO_PADDING_LAYOUT_MAPPING.includes(pathname)
				? { margin: 0, padding: 0 } : { margin: 0, padding: '24px 20px' }}
			>
				{!role_functions.some((r) => FAQ_BUBBLE_EXCLUSION_LIST.includes(r))
				&& !HIDE_FAQ_CHAT.includes(pathname) && (
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
