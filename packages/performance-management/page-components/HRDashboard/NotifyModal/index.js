import { Checkbox, Button } from '@cogoport/components';

import styles from './styles.module.css';
import useNotifyManagers from './useNotifyManagers';

function NotifyModal({ setNotifyModal = () => {} }) {
	const { notify = () => {}, loading = false, setSendToAll, sendToAll } = useNotifyManagers({ setNotifyModal });

	return (
		<div className={styles.container}>
			<div className={styles.notify_header}>Are you sure you wish to send notifications to the following?</div>

			<div className={styles.checkbox}>
				<Checkbox
					checked={sendToAll}
					onChange={(e) => setSendToAll(e.target.checked)}
					style={{ paddingLeft: '0px' }}

				/>
				<div className={styles.checkbox_label}>
					Send to All Cogoport Managers
					{' '}
					<span>(Including CEOs)</span>
				</div>
			</div>

			<div className={styles.button_container}>
				<Button themeType="tertiary" onClick={() => setNotifyModal(false)}>Cancel</Button>
				<Button themeType="primary" onClick={() => notify()} loading={loading}>Notify</Button>
			</div>
		</div>
	);
}
export default NotifyModal;
