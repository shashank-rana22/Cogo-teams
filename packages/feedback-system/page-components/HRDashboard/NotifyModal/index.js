import { Checkbox, Button } from '@cogoport/components';

import styles from './styles.module.css';
import useNotifyManagers from './useNotifyManagers';

function NotifyModal({ setNotifyModal = () => {} }) {
	const { notify = () => {}, loading = false, setSendToAll, sendToAll } = useNotifyManagers({ setNotifyModal });

	const notifyManagers = () => {
		notify();
	};

	return (
		<div className={styles.container}>
			<div className={styles.notify_header}>Are you sure you wish to send notifications to the following?</div>

			<div className={styles.checkbox}>
				<Checkbox
					checked={sendToAll}
					onChange={(e) => setSendToAll(e.target.checked)}

				/>
				<div className={styles.checkbox_label}>
					Send to All Cogoport Users
					{' '}
					<span>(Including CEOs)</span>
				</div>
			</div>

			<div className={styles.button_container}>
				<Button themeType="tertiary" onClick={() => setNotifyModal(false)}>Cancel</Button>
				<Button themeType="accent" onClick={() => notifyManagers()} loading={loading}>Notify</Button>
			</div>
		</div>
	);
}
export default NotifyModal;
