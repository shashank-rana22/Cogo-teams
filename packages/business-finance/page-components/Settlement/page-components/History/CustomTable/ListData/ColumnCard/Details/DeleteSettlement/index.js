import { Modal, Button } from '@cogoport/components';
import { IcMCross } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function DeleteSettlement({
	showDeleteConfirmationModal = false,
	setShowDeleteConfirmationModal = () => {},
	deleteHistoryLoading = false,
	deleteHistory = () => {},
	item = {},
}) {
	const onClose = () => {
		setShowDeleteConfirmationModal(false);
	};
	return (
		<Modal
			size="md"
			show={showDeleteConfirmationModal}
			onClose={onClose}
			placement="top"
		>

			<Modal.Body>
				<div className={styles.cross_icon}>
					<IcMCross width={20} height={20} onClick={onClose} />
				</div>
				<div className={styles.boddy_text_style}>
					<div className={styles.text}>Are you sure you want to do delete this?</div>
					<div className={styles.text_style}>
						You can’t undo this step & the deleted data can’t be recovered later.
					</div>
				</div>
			</Modal.Body>
			<Modal.Footer>

				<Button
					disabled={deleteHistoryLoading}
					onClick={() => deleteHistory({ item })}
					style={{ marginTop: '6px' }}
				>
					Confirm

				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default DeleteSettlement;
