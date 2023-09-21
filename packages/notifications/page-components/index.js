import navigationMapping from '@cogoport/navigation-configs/navigation-mapping-admin';
import { useRouter } from '@cogoport/next';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';

import NotificationsPage from '../components/NotificationPage';
import extractNavLinks from '../helpers/extractNavLinks';
import notificationsRedirectLink from '../helpers/notificationsRedirectLink';
import showErrorsInToast from '../utils/showErrorsInToast';

const ZERO_COUNT = 0;
const INITIAL_PAGE = 1;

function Notifications() {
	const { push } = useRouter();

	const { t } = useTranslation(['notifications', 'common']);

	const { general } = useSelector((state) => state);
	const [page, setPage] = useState(INITIAL_PAGE);
	const [disabled, setDisabled] = useState(false);

	const { scope, query: { partner_id } = {} } = general;

	const navigationMappingAdmin = navigationMapping({ t });

	const NAVIGATION_LINKS = extractNavLinks(navigationMappingAdmin);

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
				showErrorsInToast(updateRes.messages, t);
				return;
			}

			trigger();
		} catch (err) {
			showErrorsInToast(err.data, t);
		}
	};

	const onMarkAllAsRead = () => {
		updateAction('seen');
	};

	const handleNotificationClick = async (item) => {
		if (item.is_rpa && item.content.redirect_url) {
			notificationsRedirectLink({ link: item.content.redirect_url, push, partner_id, NAVIGATION_LINKS });

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
				showErrorsInToast(updateRes.messages, t);
				return;
			}

			if (item?.content?.link) {
				notificationsRedirectLink({ link: item?.content?.link, push, partner_id, NAVIGATION_LINKS });
				return;
			}

			trigger();
		} catch (err) {
			showErrorsInToast(err.data, t);
		} finally {
			setDisabled(false);
		}
	};

	return (

		<NotificationsPage
			formattedData={formattedData}
			onPageChange={setPage}
			onMarkAllAsRead={onMarkAllAsRead}
			handleNotificationClick={handleNotificationClick}
			loading={loading}
			disabled={disabled}
			setDisabled={setDisabled}
		/>

	);
}
export default Notifications;
