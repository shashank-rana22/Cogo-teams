import { Button, Modal } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function DeleteModal({
	setShowDeleteModal,
	showDeleteModal,
	deleteAttachment = () => {},
	index,
}) {
	const deleteFunction = (id) => {
		deleteAttachment(id, index);
		setShowDeleteModal(null);
	};

	return (
		<Modal
			show={showDeleteModal}
			scroll={false}
			size="md"
			placement="center"
			onClose={() => setShowDeleteModal(null)}
		>
			<Modal.Header title="Are you sure you want to Delete this announcement" />
			<Modal.Footer>
				<div className={styles.delete_buttons}>
					<Button
						type="button"
						themeType="secondary"
						size="md"
						onClick={() => setShowDeleteModal(null)}
						style={{ marginRight: '20px' }}
					>
						Cancel
					</Button>
					<Button
						type="button"
						themeType="primary"
						size="md"
						onClick={() => deleteFunction(showDeleteModal?.id)}
					>
						Delete
					</Button>
				</div>
			</Modal.Footer>
		</Modal>
	);
}

export default DeleteModal;
