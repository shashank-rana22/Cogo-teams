import { Button, Modal } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function ApprovalModal({ showModal = false, onCloseModal = () => {}, task = {}, handleFinalApprove = () => {} }) {
	return (
		<Modal show={showModal} size="md" placement="center" onClose={onCloseModal} className={styles.modal_container}>
			<Modal.Header title="Confirmation" />
			<Modal.Body>
				{`Are u sure you want to ${startCase(task?.task)}?`}
			</Modal.Body>

			<Modal.Footer>
				<Button themeType="secondary" onClick={onCloseModal}>
					No
				</Button>

				<Button themeType="primary" onClick={handleFinalApprove}>
					Yes, approve
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default ApprovalModal;
