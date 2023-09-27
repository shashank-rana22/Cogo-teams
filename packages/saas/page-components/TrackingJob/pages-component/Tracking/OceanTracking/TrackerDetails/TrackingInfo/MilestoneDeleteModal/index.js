import { Modal, Button } from '@cogoport/components';
import React from 'react';

// import useDeleteContainerMilestones from '../../../../../hooks/useDeleteContainerMilestones';

import useDeleteContainerMilestones from '../../../../../../hooks/useDeleteContainerMilestones';

// import { H3, ButtonContainer } from './styles';
import styles from './styles.module.css';

function DeleteModal({
	deleteModal,
	setDeleteModal,
	deleteId,
	refetch,
}) {
	const { deleteMileStones = () => {}, loading = false } = useDeleteContainerMilestones({
		refetch: () => {
			setDeleteModal();
			refetch();
		},
	});
	return (
		<Modal
			show={deleteModal}
			closable={false}
			onClose={() => setDeleteModal()}
			onOuterClick={() => setDeleteModal()}
		>
			<Modal.Header title="Are you sure you want to delete ?" />

			<Modal.Footer>
				<div className={styles.btn_align}>
					<Button onClick={() => setDeleteModal()}>CANCEL</Button>
					<Button
						disabled={loading}
						onClick={() => deleteMileStones(deleteId)}
					>
						Confirm
					</Button>
				</div>

			</Modal.Footer>
		</Modal>
	);
}

export default DeleteModal;
