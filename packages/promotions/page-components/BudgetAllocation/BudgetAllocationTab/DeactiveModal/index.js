import { Modal, Button } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function DeactiveModal({ onClose = () => {} }) {
	return (
		<Modal
			size="md"
			show
			onClose={onClose}
			placement="center"
		>
			<Modal.Header title="Are you sure you want to DEACTIVE this rule?" />
			<Modal.Footer>
				<Button
					themeType="secondary"
					onClick={onClose}
					className={styles.btn}
				>
					Cancel
				</Button>
				<Button onClick={onClose}>OK</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default DeactiveModal;
