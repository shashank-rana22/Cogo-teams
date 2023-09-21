/* eslint-disable max-len */
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
// import { IcMNotifications } from '@cogoport/icons-react';
import { NewNotifications } from '@cogoport/notifications';
import { useRequest } from '@cogoport/request';
import { useEffect, useState } from 'react';

import styles from './styles.module.css';

function AdminNotification(props) {
	const {
		notificationLoading = false,
		notificationData = {},
		trigger = () => {},
		setOpenNotificationPopover = () => {},
		openNotificationPopover,
		setUnseenNotificationCount = () => {},
		unseenNotificationCount,
	} = props || {};

	const { zeroth_index } = GLOBAL_CONSTANTS;

	const { is_not_seen_count = 0 } = notificationData;

	const [dataRequired, setDataRequired] = useState(false);

	const [, triggerBulkCommunication] = useRequest({
		url    : '/bulk_update_communications',
		method : 'POST',
	}, { manual: true });

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
			// Todo
			// showErrorsInToast(err.data, t);
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
				updateAction('seen');
			}
		}
	};

	const onMarkAllAsRead = () => {
		updateAction('clicked');
	};

	useEffect(() => {
		onShowToggle(openNotificationPopover);
		if (!openNotificationPopover && unseenNotificationCount > zeroth_index) {
			setUnseenNotificationCount(zeroth_index);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [openNotificationPopover, setOpenNotificationPopover]);

	return openNotificationPopover ? (
		<div className={styles.container}>
			<NewNotifications
				notificationData={notificationData}
				notificationLoading={notificationLoading}
				trigger={trigger}
				setOpenNotificationPopover={setOpenNotificationPopover}
				openNotificationPopover={openNotificationPopover}
				dataRequired={dataRequired}
				setDataRequired={setDataRequired}
				onMarkAllAsRead={onMarkAllAsRead}
			/>
		</div>
	) : null;
}

export default AdminNotification;
