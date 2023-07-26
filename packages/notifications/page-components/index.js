import navigationMappingAdmin from '@cogoport/navigation-configs/navigation-mapping-admin';
import { useRouter } from '@cogoport/next';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import React, { useState } from 'react';

import NotificationsPage from '../components/NotificationPage';
import showErrorsInToast from '../utils/showErrorsInToast';

const ZERO_COUNT = 0;
const INITIAL_PAGE = 1;

const extractNavLinks = (obj) => {
	const NAV_LINKS = [];

	Object.values(obj).forEach((item) => {
		if (item?.options) {
			item?.options.forEach((option) => NAV_LINKS.push(option?.href));
		}
		NAV_LINKS.push(item.href);
	});

	return NAV_LINKS.filter((item) => item !== undefined);
};

const NAVIGATION_LINKS = extractNavLinks(navigationMappingAdmin);

function Notifications() {
	const { push } = useRouter();
	const { scope } = useSelector(({ general }) => ({ scope: general.scope }));
	const [page, setPage] = useState(INITIAL_PAGE);

	console.log({ NAVIGATION_LINKS });

	const [{ loading, data }, trigger] = useRequest({
		url    : '/list_communications',
		method : 'get',
		params : {
			data_required                  : true,
			not_seen_count_required        : true,
			pagination_data_required       : true,
			page,
			communication_content_required : true,
			filters                        : { type: 'platform_notification' },
		},
		scope,
	}, { manual: false });

	const [, triggerBulkComm] = useRequest({
		url    : '/bulk_update_communications',
		method : 'POST',
		scope,
	}, { manual: false });

	const [, triggerComm] = useRequest({
		url    : '/update_communication',
		method : 'POST',
		scope,
	}, { manual: false });

	const formattedData = {
		...(data || {}),
		not_seen_count : data?.is_not_seen_count || ZERO_COUNT,
		list           : data?.list || [],
		loading,
		trigger,
	};

	const updateAction = async (action) => {
		try {
			const updateRes = await triggerBulkComm({
				data: {
					filters     : { type: 'platform_notification' },
					action_name : action,
				},
			});
			if (updateRes.hasError) {
				showErrorsInToast(updateRes.messages);
			} else {
				trigger();
			}
			trigger();
		} catch (err) {
			showErrorsInToast(err.data);
		}
	};

	const onMarkAllAsRead = () => {
		updateAction('clicked');
	};

	const handleNotificationClick = async (item) => {
		if (item.is_rpa && item.content.redirect_url) {
			window.open(item.content.redirect_url, '_blank');
		} else {
			try {
				const updateRes = await triggerComm({
					data: { id: item?.id, is_clicked: true },
				});
				if (updateRes.hasError) {
					showErrorsInToast(updateRes.messages);
				} else if (item?.content?.link) {
					push(item?.content?.link);
				} else {
					trigger();
				}
			} catch (err) {
				showErrorsInToast(err.data);
			}
		}
	};
	return (
		<NotificationsPage
			formattedData={formattedData}
			onPageChange={setPage}
			onMarkAllAsRead={onMarkAllAsRead}
			handleNotificationClick={handleNotificationClick}
		/>
	);
}
export default Notifications;
