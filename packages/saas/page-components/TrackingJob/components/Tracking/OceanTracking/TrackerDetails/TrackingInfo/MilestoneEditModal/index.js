import { Modal, Button } from '@cogoport/components';
import React, { useRef } from 'react';

import useEditContainerMilestones from '../../../../../../hooks/useEditContainerMilestones';

import EditForm from './EditForm';
import styles from './styles.module.css';

function EditModal({
	editModal = false,
	setEditModal = () => {},
	editDetail = {},
	refetch = () => {},
}) {
	const formRef = useRef(null);

	const onSubmit = () => {
		formRef.current.formSubmit();
	};

	const { apiTrigger, loading = false } = useEditContainerMilestones({
		refetch: () => {
			setEditModal();
			refetch();
		},
	});

	const handleSubmitForm = ({ values }) => {
		apiTrigger({ values, id: editDetail.id });
	};
	return (
		<Modal
			show={editModal}
			closable={false}
			onClose={() => setEditModal()}
			onOuterClick={() => setEditModal()}
			width={600}
		>
			<Modal.Header title="Edit Details" />
			<Modal.Body>

				<EditForm ref={formRef} editDetail={editDetail} handleSubmitForm={handleSubmitForm} />

			</Modal.Body>
			<Modal.Footer>
				<div className={styles.btn_align}>
					<Button
						type="button"
						className="secondary"
						onClick={() => setEditModal(false)}
					>
						CANCEL
					</Button>
					<Button
						onClick={onSubmit}
						disabled={loading}
					>
						Submit
					</Button>
				</div>

			</Modal.Footer>
		</Modal>
	);
}

export default EditModal;
