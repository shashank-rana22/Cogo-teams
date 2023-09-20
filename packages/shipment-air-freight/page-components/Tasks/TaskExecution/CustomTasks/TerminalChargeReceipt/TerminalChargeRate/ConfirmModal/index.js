import { Button, Modal } from '@cogoport/components';

import styles from './styles.module.css';

function ConfirmModal({
	showConfirm = false,
	setShowConfirm = () => {},
	handleSubmit = () => {},
	handleCreateProforma = () => {},
	loading = false,
	updateLoading = false,
	irnGenerated = false,
}) {
	return (
		<Modal
			show={showConfirm}
			onClose={() => setShowConfirm(false)}
			className={styles.container}
		>
			<Modal.Header title="Final Confirmation !" />
			<div className={styles.text}>
				Are you sure to continue with these entries?
			</div>
			<div className={styles.button_container}>
				<div className={styles.button_head}>
					<Button
						themeType="secondary"
						onClick={() => { setShowConfirm(false); }}
						disabled={updateLoading}
					>
						Cancel
					</Button>
				</div>
				<div className={styles.button_head}>
					<Button
						onClick={handleSubmit(handleCreateProforma)}
						disabled={loading || updateLoading || !irnGenerated}
					>
						Confirm
					</Button>
				</div>
			</div>
		</Modal>
	);
}

export default ConfirmModal;
