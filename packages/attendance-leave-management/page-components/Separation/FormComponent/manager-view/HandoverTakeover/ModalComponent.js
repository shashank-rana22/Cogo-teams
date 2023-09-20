import { Modal, Button } from '@cogoport/components';
import { IcMError } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function ModalComponent({
	showModal = false,
	setShowModal = () => {},
	handleSubmit = () => {},
	onSubmit = () => {},
	loading = false,
}) {
	return (
		<Modal size="sm" show={showModal} onClose={() => setShowModal(false)}>
			<Modal.Body>
				<div className={styles.modal_icon_container}>
					<IcMError width="40px" height="40px" color="#c26d1a" />
				</div>

				<div className={styles.modal_message_container}>
					<div className={styles.modal_message_text}>
						<span className={styles.modal_msg_highlight}>
							Are you sure you want to provide clearance?
						</span>
						{' '}
						You can not make any changes after this point.
					</div>
				</div>
			</Modal.Body>

			<Modal.Footer>
				<Button
					size="md"
					themeType="secondary"
					className={styles.cancel_modal_btn}
					onClick={() => setShowModal(false)}
				>
					Cancel
				</Button>

				<Button
					size="md"
					themeType="primary"
					className={styles.proceed_modal_btn}
					onClick={handleSubmit(onSubmit)}
					disabled={loading}
				>
					Yes, Proceed
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default ModalComponent;
