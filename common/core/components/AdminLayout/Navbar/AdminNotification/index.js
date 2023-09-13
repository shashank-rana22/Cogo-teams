/* eslint-disable max-len */
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMNotifications } from '@cogoport/icons-react';
// import { NewNotifications } from '@cogoport/notifications';
import { useRequest } from '@cogoport/request';
import { useEffect, useState } from 'react';

import styles from './styles.module.css';

const MAX_COUNT = 100;

function AdminNotification(props) {
	const {
		// notificationLoading = false,
		notificationData = {},
		trigger = () => {},
		setOpenNotificationPopover = () => {},
		openNotificationPopover,
		showCount,
	} = props || {};

	const { zeroth_index } = GLOBAL_CONSTANTS;
	const [dataRequired, setDataRequired] = useState(false);

	console.log('dataRequired ::', dataRequired);

	const { is_not_seen_count = 0 } = notificationData;

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
			console.log('err updateAction', err);
		//	showErrorsInToast(err.data, t);
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

	useEffect(() => {
		onShowToggle(openNotificationPopover);
		// if (!openNotificationPopover && currentNotSeen > zeroth_index) {
		// 	setCurrentNotSeen(zeroth_index);
		// }
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [openNotificationPopover, setOpenNotificationPopover]);

	// return openNotificationPopover ? (
	// 	<div className={styles.container}>
	// 		<NewNotifications
	// 			notificationData={notificationData}
	// 			notificationLoading={notificationLoading}
	// 			trigger={trigger}
	// 			setOpenNotificationPopover={setOpenNotificationPopover}
	// 			openNotificationPopover={openNotificationPopover}
	// 			dataRequired={dataRequired}
	// 			setDataRequired={setDataRequired}
	// 		/>
	// 	</div>
	// ) : null;

	return (
		<div className={styles.notifications_container}>
			<div className={styles.notifiction_icon}>
				<IcMNotifications width={16} height={16} fill="red" />
				{is_not_seen_count && showCount && !openNotificationPopover ? (
					<div className={styles.new_notifications}>
						{is_not_seen_count >= MAX_COUNT
							? `${MAX_COUNT}+` : is_not_seen_count}
					</div>
				) : null}
			</div>

			<span>Notifications</span>
			<div>
				{/* <Button
					size="md"
					themeType="primary"
					onClick={handleNotificationPopover}
					disabled={loadingState}
					className={styles.button_styles}
					style={showSubNav ? { width: '100%' } : {}}
				>
					{notificationCount ? `
							${t('common:you_have')}
							${' '}
							${notificationCount}
							${' '}
							${t('common:new')}
							${' '}
							${notificationCount > ONE ? t('common:notifications') : t('common:notification')}` : 'You have no new Notifications'}
				</Button> */}
			</div>

		</div>
	);
}

export default AdminNotification;
