import getGeoConstants from '@cogoport/globalization/constants/geo';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import navigationMapping from '@cogoport/navigation-configs/navigation-mapping-admin';
import { useRouter } from '@cogoport/next';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useTranslation } from 'next-i18next';
import React, { useEffect, useRef } from 'react';

import NotificationsPopover from '../../components/NotificationPopover';
import extractNavLinks from '../../helpers/extractNavLinks';
import notificationsRedirectLink from '../../helpers/notificationsRedirectLink';
import showErrorsInToast from '../../utils/showErrorsInToast';

function NewNotifications({
	notificationData = {},
	notificationLoading :loading = false,
	trigger = () => {},
	setOpenNotificationPopover = () => {},
	// openNotificationPopover,
	dataRequired,
	setDataRequired,
	onMarkAllAsRead,
}) {
	const { zeroth_index } = GLOBAL_CONSTANTS;

	const { is_not_seen_count = zeroth_index, list = [] } = notificationData;

	const { push } = useRouter();

	const { t } = useTranslation(['notifications', 'common']); // ??

	const { general } = useSelector((state) => state);

	const { unPrefixedPath } = general;

	const geo = getGeoConstants();

	const intervalRef = useRef(null);

	const { query: { partner_id } = {} } = general;

	// const [dataRequired, setDataRequired] = useState(false);

	// const [{ loading, data }, trigger] = useRequest({
	// 	url    : '/list_communications',
	// 	method : 'get',
	// }, { manual: true });

	// const [, triggerBulkCommunication] = useRequest({
	// 	url    : '/bulk_update_communications',
	// 	method : 'POST',
	// }, { manual: true });

	const [, triggerCommunication] = useRequest({
		url    : '/update_communication',
		method : 'POST',
	}, { manual: true });

	const formattedData = {
		not_seen_count: is_not_seen_count,
		list,
		loading,
		trigger,
	};

	const navigationMappingAdmin = navigationMapping({ t });

	const NAVIGATION_LINKS = extractNavLinks(navigationMappingAdmin);

	// const updateAction = async (action) => {
	// 	try {
	// 		const payload = {
	// 			filters     : { type: 'platform_notification' },
	// 			action_name : action,
	// 		};

	// 		await triggerBulkCommunication({
	// 			data: payload,
	// 		});
	// 	} catch (err) {
	// 		console.log('err updateAction', err);
	// 		showErrorsInToast(err.data, t);
	// 	}
	// };

	// const onShowToggle = async (show) => {
	// 	console.log('show ', show, is_not_seen_count);
	// 	if (show) {
	// 		try {
	// 			setDataRequired(true);
	// 			await trigger({
	// 				params: {
	// 					data_required                  : true,
	// 					communication_content_required : true,
	// 					not_seen_count_required        : true,
	// 					filters                        : { type: 'platform_notification' },
	// 				},
	// 			});
	// 			if (is_not_seen_count >= zeroth_index) {
	// 				await updateAction('seen');
	// 			}
	// 		} catch (err) {
	// 			Promise.reject();
	// 		}
	// 	} else {
	// 		setDataRequired(false);
	// 		if (is_not_seen_count >= zeroth_index) {
	// 			updateAction('seen');
	// 		}
	// 	}
	// };

	// const onMarkAllAsRead = () => {
	// 	updateAction('clicked');
	// };

	const onSeeAll = () => {
		push('/notifications');
		setDataRequired(false);
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

			setOpenNotificationPopover(false);
		} catch (err) {
			showErrorsInToast(err.data);
		}
	};

	// Todo : Not being used to countinuesly fire trigger

	useEffect(() => {
		if (!loading && (unPrefixedPath !== '/notifications' || dataRequired)) {
			intervalRef.current = setInterval(() => {
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
			clearInterval(intervalRef.current);
		};
	}, [loading, dataRequired, unPrefixedPath, geo.notification_polling_interval, trigger]);

	// useEffect(() => {
	// 	onShowToggle(openNotificationPopover);
	// 	// if (!openNotificationPopover && currentNotSeen > zeroth_index) {
	// 	// 	setCurrentNotSeen(zeroth_index);
	// 	// }
	// // eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [openNotificationPopover, setOpenNotificationPopover]);

	return (
		<NotificationsPopover
			// onShowToggle={onShowToggle}
			formattedData={formattedData}
			handleNotificationClick={handleNotificationClick}
			onMarkAllAsRead={onMarkAllAsRead}
			onSeeAll={onSeeAll}
		/>
	);
}
export default NewNotifications;
