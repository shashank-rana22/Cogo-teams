import { NewNotifications } from '@cogoport/notifications';

import styles from './styles.module.css';

function AdminNotification(props) {
	const {
		notificationLoading = false,
		notificationData = {},
		trigger = () => {},
		setOpenNotificationPopover = () => {},
	} = props || {};

	return (
		<div className={styles.container}>
			<NewNotifications
				notificationData={notificationData}
				notificationLoading={notificationLoading}
				trigger={trigger}
				setOpenNotificationPopover={setOpenNotificationPopover}
			/>
		</div>
	);
}

export default AdminNotification;
