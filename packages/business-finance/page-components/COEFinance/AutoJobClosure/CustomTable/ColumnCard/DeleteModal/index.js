import { Modal, Button } from '@cogoport/components';
import { useSelector } from '@cogoport/store';
import React from 'react';

import useDeleteJobClosure from '../../../../hook/useDeleteJobClosure';
import styles from '../styles.module.css';

function DeleteModal({ deleteModal = false, setDeleteModal = () => {}, refetch = () => {}, id = '' }) {
	const { apiTrigger = () => {}, loading = false } = useDeleteJobClosure({
		refetch: () => {
			refetch();
			setDeleteModal(false);
		},
	});

	const { user_data: userData } = useSelector(({ profile }) => ({
		user_data: profile || {},
	}));

	const { user: { id: userId } = {} } = userData || {};

	const confirmDeleteClicked = () => {
		const params = {
			id,
			deletedBy: userId,
		};
		apiTrigger(params);
	};
	return (
		<Modal show={deleteModal} onClose={() => setDeleteModal(false)} placement="center" size="md">
			<Modal.Header title="Delete" />
			<Modal.Body style={{ height: '200px' }} className={styles.deleteBody}>
				<div className={styles.deleteText}>Are you sure you want to delete.</div>
			</Modal.Body>
			<Modal.Footer>
				<Button
					size="md"
					themeType="secondary"
					className={styles.formButton}
					onClick={() => setDeleteModal(false)}
					disabled={loading}
				>
					Cancel

				</Button>
				<Button
					size="md"
					themeType="primary"
					className={styles.formButton}
					onClick={() => confirmDeleteClicked()}
					disabled={loading}
				>
					Confirm

				</Button>

			</Modal.Footer>
		</Modal>
	);
}

export default DeleteModal;
