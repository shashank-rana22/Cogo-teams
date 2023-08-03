import { Button, Modal } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function DeleteModal({
	setShowDeleteModal,
	showDeleteModal,
	loading = false,
	onClickDelete = () => {},
	deleteProps,
	viewType,
}) {
	return (
		<Modal
			show={showDeleteModal}
			scroll={false}
			size="md"
			placement="center"
			onClose={() => setShowDeleteModal(null)}
		>
			<Modal.Header title={`Are you sure you want to Delete this ${viewType}`} />
			<Modal.Footer>
				<div className={styles.delete_buttons}>
					<Button
						type="button"
						themeType="secondary"
						size="md"
						disabled={loading}
						onClick={() => setShowDeleteModal(null)}
						style={{ marginRight: '20px' }}
					>
						Cancel
					</Button>
					<Button
						type="button"
						themeType="primary"
						size="md"
						loading={loading}
						onClick={() => onClickDelete({ ...deleteProps })}
					>
						Delete
					</Button>
				</div>
			</Modal.Footer>
		</Modal>
	);
}

export default DeleteModal;
