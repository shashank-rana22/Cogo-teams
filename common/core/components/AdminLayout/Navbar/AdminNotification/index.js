/* eslint-disable max-len */
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { NewNotifications } from '@cogoport/notifications';
import { useRequest } from '@cogoport/request';
import { useEffect, useState } from 'react';

import styles from './styles.module.css';

function AdminNotification(props) {
	const {
		setNotificationPopover = () => {},
		notificationPopover,
	} = props || {};

	const { zeroth_index } = GLOBAL_CONSTANTS;

	const [dataRequired, setDataRequired] = useState(false);

	const [{ data, loading }, trigger] = useRequest({
		url    : '/list_communications',
		method : 'get',
	}, { manual: true });

	const [, triggerBulkCommunication] = useRequest({
		url    : '/bulk_update_communications',
		method : 'POST',
	}, { manual: true });

	const { is_not_seen_count = 0 } = data || {};
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
		onShowToggle(notificationPopover);
		// if (!openNotificationPopover && unseenNotificationCount > zeroth_index) {
		// 	setUnseenNotificationCount(zeroth_index);
		// }
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [notificationPopover, setNotificationPopover]);

	return notificationPopover ? (
		<div className={styles.container}>
			<NewNotifications
				notificationData={data}
				notificationLoading={loading}
				trigger={trigger}
				setNotificationPopover={setNotificationPopover}
				dataRequired={dataRequired}
				setDataRequired={setDataRequired}
				onMarkAllAsRead={onMarkAllAsRead}
			/>
		</div>
	) : null;
}

export default AdminNotification;
