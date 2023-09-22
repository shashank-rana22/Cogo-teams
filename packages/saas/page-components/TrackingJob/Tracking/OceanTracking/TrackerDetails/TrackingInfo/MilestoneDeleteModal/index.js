import { Modal, Button } from '@cogoport/components';
import React from 'react';

// import useDeleteContainerMilestones from '../../../../../hooks/useDeleteContainerMilestones';

import useDeleteContainerMilestones from '../../../../../hooks/useDeleteContainerMilestones';

// import { H3, ButtonContainer } from './styles';

function DeleteModal({
	deleteModal,
	setDeleteModal,
	deleteId,
}) {
	const { deleteMileStones = () => {}, loading = false } = useDeleteContainerMilestones({
		refetch: () => {
			setDeleteModal();
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
				<Button onClick={() => setDeleteModal()}>CANCEL</Button>
				<Button
					disabled={loading}
					onClick={() => deleteMileStones(deleteId)}
				>
					Confirm
				</Button>
			</Modal.Footer>

		</Modal>
	);
}

export default DeleteModal;
