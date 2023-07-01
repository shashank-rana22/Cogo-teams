import { Modal, Button } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';

import styles from './styles.module.css';

function WarningModal({ setShowModal, setShowExpenseModal, showWarning, setShowWarning }) {
	const handleClose = () => {
		setShowWarning(false);
	};

	const handleQuit = () => {
		setShowModal(false);
		setShowExpenseModal(false);
		setShowWarning(false);
	};
	return (
		<div>
			<Modal size="md" show={showWarning} onClose={handleClose} placement="center">
				<Modal.Body>
					<div className={styles.container}>
						<IcMInfo className={styles.warning} height={20} width={20} />
						<div className={styles.text}>
							<div>This action will delete all the progress that you have made.</div>
							<div> Are you sure you want to quit ?</div>
						</div>
						<div className={styles.buttons}>
							<div>
								<Button onClick={handleClose} themeType="secondary">No</Button>
							</div>
							<div>
								<Button onClick={handleQuit}>Yes</Button>
							</div>
						</div>
					</div>
				</Modal.Body>

			</Modal>
		</div>
	);
}

export default WarningModal;
