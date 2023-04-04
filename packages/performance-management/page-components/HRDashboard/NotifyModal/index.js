import { Modal, Button } from '@cogoport/components';

import styles from './styles.module.css';
import useNotifyManagers from './useNotifyManagers';

function NotifyModal({ modal = '', setModal = () => {} }) {
	const { notify = () => {}, loading = false } = useNotifyManagers({ setModal });

	return (
		<Modal
			show={modal === 'notify'}
			onClose={() => setModal('')}
			onClickOutside={() => setModal('')}
		>
			<Modal.Header title="Notify Managers" />
			<div className={styles.upload_modal}>
				<Modal.Body>
					<div className={styles.container}>
						<div className={styles.notify_header}>
							Are you sure you wish to send notifications to all
							the managers who have not filled the feedbacks? (CEOs wont be notified)
						</div>

						<div className={styles.button_container}>
							<Button themeType="tertiary" onClick={() => setModal('')}>Cancel</Button>
							<Button themeType="primary" onClick={() => notify()} loading={loading}>Notify</Button>
						</div>
					</div>
				</Modal.Body>
			</div>
		</Modal>

	);
}
export default NotifyModal;
