import { Button } from '@cogoport/components';
import React, { useState } from 'react';

import { Delete } from '../../../ListAction';

function DeleteModal({ item = {}, refetch = () => {}, setVisible = () => {} }) {
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const onSubmit = () => {
		setShowDeleteModal(true); setVisible(false);
	};
	return (
		<div>
			<hr />
			<Button themeType="tertiary" onClick={onSubmit}>Delete</Button>
			<Delete show={showDeleteModal} setShow={setShowDeleteModal} item={item} refetch={refetch} />
		</div>
	);
}

export default DeleteModal;
