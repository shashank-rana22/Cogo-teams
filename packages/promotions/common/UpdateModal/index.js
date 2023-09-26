import { Modal, Button } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function UpdateModal({
	title = 'Are you sure you want to DEACTIVE this rule?',
	onClose = () => {},
	onClickYes = () => {},
}) {
	return (
		<Modal
			size="md"
			show
			onClose={onClose}
			placement="center"
		>
			<Modal.Header title={title} />
			<Modal.Footer>
				<Button
					themeType="secondary"
					onClick={onClose}
					className={styles.btn}
				>
					Cancel
				</Button>
				<Button onClick={onClickYes}>OK</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default UpdateModal;
