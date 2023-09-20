import { Button, Modal } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function ConfirmationModal({ showModalConfirm = false, setShowModalConfirm = () => {}, cancelRequest = () => {} }) {
	return (
		<Modal size="sm" show={showModalConfirm} onClose={() => setShowModalConfirm(false)}>
			<Modal.Body>
				<div className={styles.modal_icon_container}>
					Cancel this request?
				</div>
				<div className={styles.modal_message_container}>
					<div className={styles.modal_message_text}>
						<span className={styles.modal_msg_highlight}>
							Your Request will be send to HR for approval.
						</span>
					</div>
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button
					size="md"
					themeType="secondary"
					className={styles.cancel_modal_btn}
					onClick={() => setShowModalConfirm(false)}
				>
					Cancel
				</Button>
				<Button
					size="md"
					themeType="primary"
					className={styles.proceed_modal_btn}
					onClick={cancelRequest}
				>
					Yes, Proceed
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default ConfirmationModal;
