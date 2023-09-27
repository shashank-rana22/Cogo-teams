import { NotificationsPopover } from '@cogoport/notifications';

import styles from './styles.module.css';

function Notification(props) {
	return (
		<div className={styles.container}>
			<NotificationsPopover {...props} />
		</div>
	);
}

export default Notification;
