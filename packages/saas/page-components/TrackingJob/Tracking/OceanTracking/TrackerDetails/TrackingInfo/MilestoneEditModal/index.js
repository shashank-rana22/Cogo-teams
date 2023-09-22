import { Modal, Button } from '@cogoport/components';
import React, { useState, useRef } from 'react';

import useEditContainerMilestones from '../../../../../hooks/useEditContainerMilestones';

import EditForm from './EditForm';

function EditModal({
	editModal,
	setEditModal,

	refetch,
	showUpdate,
	setShowUpdate,
	isDisabled,
	editDetail,
	getMilestones,
	shipping_line_id = '',
}) {
	const formRef = useRef(null);
	// console.log(showUpdate);
	const onSubmit = () => {
		formRef.current.formSubmit();
	};

	const { apiTrigger, loading = false } = useEditContainerMilestones({
		refetch: () => {
			setEditModal();
		},
	});

	const handleSubmitForm = ({ values }) => {
		console.log(values);
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
			<Modal.Body>

				<EditForm ref={formRef} editDetail={editDetail} handleSubmitForm={handleSubmitForm} />

			</Modal.Body>
			<Modal.Footer>
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
			</Modal.Footer>
		</Modal>
	);
}

export default EditModal;
