import { Button, Modal } from '@cogoport/components';
import { IcMError } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function FinanceConfirmModal({ confirmModal = {}, setConfirmModal = () => {}, handleSubmit = () => {} }) {
	const onSubmit = () => {
		setConfirmModal(false);
		console.log('modal submitted..');
	};
	return (
		<div>
			<Modal size="sm" show={confirmModal} onClose={() => setConfirmModal(false)}>
				<Modal.Body>
					<div className={styles.modal_icon_container}>
						<IcMError width="40px" height="40px" color="#C26D1A" />

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
						onClick={() => setConfirmModal(false)}
					>
						Cancel
					</Button>
					<Button
						size="md"
						themeType="primary"
						className={styles.proceed_modal_btn}
						onClick={handleSubmit(onSubmit)}
					>
						Yes, Proceed
					</Button>

				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default FinanceConfirmModal;
