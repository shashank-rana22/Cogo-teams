import { Modal, Button, Checkbox } from '@cogoport/components';
import { IcMCross } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function DeleteComfirmationModal({
	deleteInvoice = () => {},
	outWardId = '',
	showDeleteModal = false,
	setShowDeleteModal = () => {},
	setIsModalOnetime = () => {},
	isModalOnetime = false,
}) {
	return (
		<Modal size="md" show={showDeleteModal} onClose={() => setShowDeleteModal(false)} placement="top">

			<Modal.Body>
				<div className={styles.cross_icon}>
					<IcMCross width={20} height={20} onClick={() => setShowDeleteModal(false)} />
				</div>
				<div className={styles.boddy_text_style}>
					<div className={styles.text}>Are you sure you want to do delete this?</div>
					<div className={styles.text_style}>
						You can’t undo this step & the deleted data can’t be recovered later.
					</div>
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Checkbox
					label="Don’t show this again"
					checked={isModalOnetime}
					onChange={() => {
						setIsModalOnetime(!isModalOnetime);
					}}
					style={{ marginRight: '285px' }}
				/>
				<Button
					onClick={() => deleteInvoice(outWardId)}
					style={{ marginTop: '6px' }}
				>
					Confirm

				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default DeleteComfirmationModal;
