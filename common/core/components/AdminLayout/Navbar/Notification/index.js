import { NewNotifications } from '@cogoport/notifications';

import styles from './styles.module.css';

function Notification(props) {
	const {
		setNotificationPopover = () => {},
		notificationPopover = false,
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

export default Notification;
