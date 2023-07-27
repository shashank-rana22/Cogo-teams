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
		NAV_LINKS.push(item.href);

		if (item?.options) {
			item?.options.forEach((option) => NAV_LINKS.push(option?.href));
		}
	});

	return NAV_LINKS.filter((item) => item);
};

const NAVIGATION_LINKS = extractNavLinks(navigationMappingAdmin);

const notificationRedirect = ({ link, push, partner_id }) => {
	let isVersionTwo = false;
	let redirectLink = null;

	const splittedLink = link.split('/');

	NAVIGATION_LINKS.forEach((href) => {
		if (redirectLink) return;

		isVersionTwo = href.includes('/v2/');

		let tempHref = href;
		if (isVersionTwo) {
			tempHref = tempHref.replace('/v2/', '/');
		}

		const splittedHref = tempHref.split('/');

		const isLinkMatched = splittedHref.every((hrefItem, index) => {
			if (hrefItem.startsWith('[')) return true;

			return hrefItem === splittedLink[index];
		});

		if (!isLinkMatched) return;

		redirectLink = link;
	});

	if (!redirectLink) {
		window.location.href = `https://admin.cogoport.com/${partner_id}${link}`;
		return;
	}

	if (isVersionTwo) {
		push(redirectLink);
	} else {
		window.location.href = `https://admin.cogoport.com/${partner_id}${redirectLink}`;
	}
};

function Notifications() {
	const { push } = useRouter();
	const { general } = useSelector((state) => state);
	const [page, setPage] = useState(INITIAL_PAGE);

	const { scope, query: { partner_id } = {} } = general;

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
			const payload = {
				filters     : { type: 'platform_notification' },
				action_name : action,
			};

			const updateRes = await triggerBulkComm({
				data: payload,
			});

			if (updateRes.hasError) {
				showErrorsInToast(updateRes.messages);
				return;
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

			return;
		}

		try {
			const payload = {
				id         : item?.id,
				is_clicked : true,
			};

			const updateRes = await triggerComm({
				data: payload,
			});

			if (updateRes.hasError) {
				showErrorsInToast(updateRes.messages);
				return;
			}

			if (item?.content?.link) {
				notificationRedirect({ link: item?.content?.link, push, partner_id });
				return;
			}

			trigger();
		} catch (err) {
			showErrorsInToast(err.data);
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
