/* eslint-disable react-hooks/exhaustive-deps */
import getGeoConstants from '@cogoport/globalization/constants/geo';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRouter } from '@cogoport/next';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useTranslation } from 'next-i18next';
import React, { useState, useEffect } from 'react';

import NotificationsPopover from '../../components/NotificationPopover';
import useRpa from '../../hooks/useRPA';
import showErrorsInToast from '../../utils/showErrorsInToast';

function NewNotifications() {
	const { zeroth_index } = GLOBAL_CONSTANTS;
	const { push } = useRouter();
	const { t } = useTranslation(['notifications', 'common']); // ??
	const { general } = useSelector((state) => state);
	const { unPrefixedPath } = general;
	const geo = getGeoConstants();

	const {
		notifications: rpaNotifications,
		loading: rpaLoading,
		handleRpaNotificationClick,
	} = useRpa();

	const [dataRequired, setDataRequired] = useState(false); // ??

	const [{ loading, data }, trigger] = useRequest({
		url    : '/list_communications',
		method : 'get',
	}, { manual: true });

	const [, triggerBulkCommunication] = useRequest({
		url    : '/bulk_update_communications',
		method : 'POST',
	}, { manual: true });

	const [, triggerCommunication] = useRequest({
		url    : '/update_communication',
		method : 'POST',
	}, { manual: true });

	const formattedData = {
		not_seen_count : data?.is_not_seen_count || zeroth_index,
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

			const updateRes = await triggerBulkCommunication({
				data: payload,
			});

			if (updateRes.hasError) {
				showErrorsInToast(updateRes.messages, t);
			}
		} catch (err) {
			showErrorsInToast(err.data, t);
		}
	};

	const onShowToggle = (show) => {
		if (show) {
			setDataRequired(true);
			trigger({
				params: {
					data_required                  : true,
					communication_content_required : true,
					not_seen_count_required        : true,
					filters                        : { type: 'platform_notification' },
				},
			});
		} else {
			setDataRequired(false);
			if (data?.is_not_seen_count >= zeroth_index) {
				updateAction('seen');
			}
		}
	};

	const onMarkAllAsRead = () => {
		updateAction('clicked');
	};

	const onSeeAll = () => {
		push('/notifications');
		setDataRequired(false);
	};

	const handleNotificationClick = async (item) => {
		try {
			if (item?.content?.link) {
				push(item?.content?.link);
			}
			if (!item?.is_clicked) {
				const updateRes = await triggerCommunication({
					data: { id: item?.id, is_clicked: true },
				});
				if (updateRes.hasError) {
					showErrorsInToast(updateRes.messages);
				} else {
					trigger({
						params: {
							data_required                  : dataRequired,
							not_seen_count_required        : true,
							filters                        : { type: 'platform_notification' },
							communication_content_required : dataRequired,
						},
					});
				}
			}
		} catch (err) {
			showErrorsInToast(err.data);
		}
	};

	let interval = null;

	useEffect(() => {
		if (!loading && (unPrefixedPath !== '/notifications' || dataRequired)) {
			interval = setInterval(() => {
				try {
					trigger({
						params: {
							data_required                  : dataRequired,
							not_seen_count_required        : true,
							filters                        : { type: 'platform_notification' },
							communication_content_required : dataRequired,
						},
					});
				} catch (err) {
					Promise.reject(err);
				}
			}, geo.notification_polling_interval);
		}
		return () => {
			clearInterval(interval);
		};
	}, [loading, dataRequired]);

	return (
		<NotificationsPopover
			onShowToggle={onShowToggle}
			formattedData={formattedData}
			handleNotificationClick={handleNotificationClick}
			onMarkAllAsRead={onMarkAllAsRead}
			onSeeAll={onSeeAll}
			rpaNotifications={rpaNotifications}
			rpaLoading={rpaLoading}
			handleRpaNotificationClick={handleRpaNotificationClick}
		/>
	);
}
export default NewNotifications;
