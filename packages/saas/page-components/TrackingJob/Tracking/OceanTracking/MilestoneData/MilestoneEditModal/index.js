import { Modal } from '@cogoport/front/components';
import React from 'react';

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
	return (
		<Modal
			show={editModal}
			closable={false}
			onClose={() => setEditModal()}
			onOuterClick={() => setEditModal()}
			width={600}
		>
			<EditForm
				getMilestones={getMilestones}
				refetch={refetch}
				showUpdate={showUpdate}
				setShowUpdate={setShowUpdate}
				isDisabled={isDisabled}
				editDetail={editDetail}
				setEditModal={setEditModal}
				shipping_line_id={shipping_line_id}
			/>
		</Modal>
	);
}

export default EditModal;
