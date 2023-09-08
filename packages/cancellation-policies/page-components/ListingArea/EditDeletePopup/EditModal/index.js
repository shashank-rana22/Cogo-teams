import { Button } from '@cogoport/components';
import React, { useState } from 'react';

import { Update } from '../../../ListAction';

function EditModal({ item = {}, refetch = () => {}, setVisible = () => {} }) {
	const [showEditModal, setShowEditModal] = useState(null);

	return (
		<div>
			<Button themeType="tertiary" onClick={() => { setShowEditModal(true); setVisible(false); }}>Edit</Button>

			<Update show={showEditModal} setShow={setShowEditModal} item={item} refetch={refetch} />
		</div>
	);
}

export default EditModal;
