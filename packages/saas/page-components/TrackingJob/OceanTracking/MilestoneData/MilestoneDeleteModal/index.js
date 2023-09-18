import { Modal, Button } from '@cogoport/front/components/admin';
import React from 'react';
import useDeleteContainerMilestones from '../../../../../hooks/useDeleteContainerMilestones';
import { H3, ButtonContainer } from './styles';

const DeleteModal = ({
	deleteModal,
	setDeleteModal,
	deleteId,
	getMilestones,
}) => {
	const { deleteMileStones = () => {}, loading = false } =
		useDeleteContainerMilestones();
	return (
		<Modal
			show={deleteModal}
			closable={false}
			onClose={() => setDeleteModal()}
			onOuterClick={() => setDeleteModal()}
		>
			<>
				<H3>Are you sure you want to delete ?</H3>
				<ButtonContainer>
					<Button onClick={() => setDeleteModal()}>CANCEL</Button>
					<Button
						disabled={loading}
						onClick={() => deleteMileStones(deleteId, getMilestones)}
					>
						Confirm
					</Button>
				</ButtonContainer>
			</>
		</Modal>
	);
};

export default DeleteModal;
