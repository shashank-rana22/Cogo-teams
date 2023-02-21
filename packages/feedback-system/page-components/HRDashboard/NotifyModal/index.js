import { Toast, Button } from '@cogoport/components';

import styles from './styles.module.css';
import useNotifyManagers from './useNotifyManagers';

function NotifyModal({ setNotifyModal = () => {} }) {
	const { notify = () => {} } = useNotifyManagers;

	const notifyManagers = () => {
		try {
			const { data = {} } = notify();
			const { manager_count = '20' } = data;

			setNotifyModal(false);
			Toast.success(`${manager_count} Managers Notified...`);
		} catch (e) {
			Toast.error(e.toString());
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.notify_header}>Are you sure you wish to send notifications to the following?</div>

			<div className={styles.button_container}>
				<Button themeType="tertiary" onClick={() => setNotifyModal(false)}>Cancel</Button>
				<Button themeType="accent" onClick={() => notifyManagers()}>Notify</Button>
			</div>
		</div>
	);
}
export default NotifyModal;
