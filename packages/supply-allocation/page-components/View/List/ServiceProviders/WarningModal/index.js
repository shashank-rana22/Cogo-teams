import { Button, Modal } from '@cogoport/components';

import styles from './styles.module.css';

function WarningModal({ show = false, setShowWarning = () => {}, setBulkEditMode = () => {} }) {
	return (
		<Modal show={show} size="sm" onClose={() => setShowWarning(false)}>
			<Modal.Header title="Edit Allocation" />

			<div className={styles.body}>
				<div className={styles.heading}>Do you want to change allocation?</div>
				<div className={styles.sub_heading}>The manual allocation will affect the cluster level allocation</div>
			</div>

			<div className={styles.button_container}>
				<Button
					onClick={() => setShowWarning(false)}
					style={{ marginRight: '10px' }}
					themeType="secondary"
				>
					No
				</Button>

				<Button
					onClick={() => { setShowWarning(false); setBulkEditMode(true); }}
					themeType="accent"
				>
					Yes
				</Button>
			</div>
		</Modal>

	);
}

export default WarningModal;
