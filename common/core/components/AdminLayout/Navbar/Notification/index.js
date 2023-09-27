import { NotificationsPopover } from '@cogoport/notifications';

import styles from './styles.module.css';

function Notification(props) {
	const {
		setNotificationPopover = () => {},
		notificationPopover = false,
		setResetSubnavs = () => {},
	} = props || {};

	return (
		<div className={styles.container}>
			<NotificationsPopover
				setNotificationPopover={setNotificationPopover}
				notificationPopover={notificationPopover}
				setResetSubnavs={setResetSubnavs}
			/>
		</div>
	);
}

export default Notification;
