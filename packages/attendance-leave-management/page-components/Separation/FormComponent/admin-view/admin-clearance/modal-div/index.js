import { Button, Modal } from '@cogoport/components';
import { IcMError } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function OpenModal({ show = false, onClose = () => {}, onSubmit = () => {}, handleSubmit = () => {} }) {
	return (
		<Modal size="sm" show={show} onClose={onClose} placement="center" className={styles.modal_container}>
			<Modal.Body styles={styles.modal_body}>
				<div className={styles.modal_icon_container}>
					<IcMError width="40px" height="40px" color="#C26D1A" />
				</div>

				<div>
					<span className={styles.bold_text}>Are you sure you want to provide clearance?</span>
					{' '}
					You can not make any changes after this point.
				</div>
			</Modal.Body>
			<Modal.Footer className={styles.modal_footer}>
				<Button
					size="md"
					themeType="secondary"
					className={styles.cancel_modal_btn}
					onClick={onClose}
				>
					Cancel
				</Button>

				<Button
					size="md"
					themeType="Accent"
					className={styles.proceed_modal_btn}
					onClick={handleSubmit(onSubmit)}
				>
					Yes, Proceed
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default OpenModal;