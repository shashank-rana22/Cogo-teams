import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import navigationMapping from '@cogoport/navigation-configs/navigation-mapping-admin';
import { useRouter } from '@cogoport/next';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useTranslation } from 'next-i18next';
import React, { useEffect, useState } from 'react';

import NotificationsPopover from '../../components/NotificationPopover';
import extractNavLinks from '../../helpers/extractNavLinks';
import notificationsRedirectLink from '../../helpers/notificationsRedirectLink';
import showErrorsInToast from '../../utils/showErrorsInToast';

function NewNotifications({
	notificationPopover = true,
	setNotificationPopover = () => {},
	setResetSubnavs = () => {},
}) {
	const { push } = useRouter();
	const { t } = useTranslation(['notifications', 'common']); // ??
	const { general } = useSelector((state) => state);
	const { query: { partner_id } = {} } = general;
	const navigationMappingAdmin = navigationMapping({ t });
	const NAVIGATION_LINKS = extractNavLinks(navigationMappingAdmin);
	const { zeroth_index } = GLOBAL_CONSTANTS;

	const [dataRequired, setDataRequired] = useState(false);

	const [{ data, loading }, trigger] = useRequest({
		url    : '/list_communications',
		method : 'get',
	}, { manual: false });

	const [, triggerBulkCommunication] = useRequest({
		url    : '/bulk_update_communications',
		method : 'POST',
	}, { manual: true });

	const [, triggerCommunication] = useRequest({
		url    : '/update_communication',
		method : 'POST',
	}, { manual: true });

	const { is_not_seen_count = zeroth_index, list = [] } = data || {};

	const formattedData = {
		not_seen_count: is_not_seen_count,
		list,
		loading,
	};

	const updateAction = async (action) => {
		try {
			const payload = {
				filters     : { type: 'platform_notification' },
				action_name : action,
			};

			await triggerBulkCommunication({
				data: payload,
			});
		} catch (err) {
			showErrorsInToast(err.data, t);
		}
	};

	const handleNotificationClick = async (item) => {
		try {
			if (item?.content?.link) {
				notificationsRedirectLink({ link: item?.content?.link, push, partner_id, NAVIGATION_LINKS });
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

			setNotificationPopover(false);
			setResetSubnavs(false);
		} catch (err) {
			showErrorsInToast(err.data);
		}
	};

	const onShowToggle = async (show) => {
		if (show) {
			try {
				setDataRequired(true);
				await trigger({
					params: {
						data_required                  : true,
						communication_content_required : true,
						not_seen_count_required        : true,
						filters                        : { type: 'platform_notification' },
					},
				});
			} catch (err) {
				Promise.reject();
			}
		} else {
			setDataRequired(false);
			if (is_not_seen_count >= zeroth_index) {
				await updateAction('seen');
			}
		}
	};

	const onMarkAllAsRead = async () => {
		await updateAction('seen');
		setNotificationPopover(false);
		setResetSubnavs(false);
	};
	const onSeeAll = () => {
		push('/notifications');
		setNotificationPopover(false);
		setDataRequired(false);
		setResetSubnavs(false);
	};

	useEffect(() => {
		onShowToggle(notificationPopover);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [notificationPopover]);

	return (
		<NotificationsPopover
			formattedData={formattedData}
			handleNotificationClick={handleNotificationClick}
			onMarkAllAsRead={onMarkAllAsRead}
			onSeeAll={onSeeAll}
		/>
	);
}
export default NewNotifications;
