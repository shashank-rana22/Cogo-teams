import { NewNotifications } from '@cogoport/notifications';

import styles from './styles.module.css';

function AdminNotification(props) {
	const {
		setNotificationPopover = () => {},
		notificationPopover,
		setResetSubnavs = () => {},
	} = props || {};

	return notificationPopover ? (
		<div className={styles.container}>
			<NewNotifications
				setNotificationPopover={setNotificationPopover}
				notificationPopover={notificationPopover}
				setResetSubnavs={setResetSubnavs}
			/>
		</div>
	) : null;
}

export default AdminNotification;
