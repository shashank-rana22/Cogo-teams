import { Button } from '@cogoport/components';
import React, { useState } from 'react';

import { Update } from '../../../ListAction';

function EditModal() {
	const [showEditModal, setShowEditModal] = useState(null);
	// const onCloseEditModal = () => {
	// 	setShowEditModal(false);
	// };
	return (
		<div>
			<Button themeType="tertiary" onClick={() => setShowEditModal(true)}>Edit</Button>

			<Update show={showEditModal} setShow={setShowEditModal} />
		</div>
	);
}

export default EditModal;
