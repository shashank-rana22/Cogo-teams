import { Toast, Button } from '@cogoport/components';

import styles from './styles.module.css';
import useNotifyManagers from './useNotifyManagers';

function NotifyModal({ setNotifyModal = () => {} }) {
	const { getNotifiableManagersData = () => {}, notify = () => {} } = useNotifyManagers;

	// const { data: notifyData = {}, loading = false } = getNotifiableManagersData();

	const notifyManagers = () => {
		try {
			notify();
			setNotifyModal(false);
			Toast.success('20 Managers Notifed...');
		} catch (e) {
			Toast.error(e.toString());
		}
	};

	return (
		<div>
			<div className={styles.notify_header}>Are you sure you wish to send notifications to the following?</div>

			<div className={styles.notify_card}>
				<div style={{ flex: 1 }}>
					<p className={styles.label}>Total Managers Notified:</p>
					<div className={styles.value}>{20}</div>
				</div>
				<div style={{ flex: 1 }}>
					<p className={styles.label}>Total Feedbacks Pending:</p>
					<div className={styles.value}>{50}</div>
				</div>
			</div>

			<div>
				<Button themeType="tertiary" onClick={() => setNotifyModal(false)}>Cancel</Button>
				<Button themeType="accent" onClick={() => notifyManagers()}>Notify</Button>
			</div>
		</div>
	);
}
export default NotifyModal;
