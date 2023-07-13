import { Button } from '@cogoport/components';
import { IcMDelete } from '@cogoport/icons-react';
import React, { useState } from 'react';

import DeletePayrun from './DeletePayrun';

function DeletePayrunInvoice({ itemData = {}, overseasData = '' }) {
	const [showDeleteModal, setShowDeleteModal] = useState(false);

	return (
		<div>
			<Button themeType="tertiary" onClick={() => setShowDeleteModal(true)}>
				<IcMDelete height={20} width={20} color="#EE3425" />
			</Button>
			{showDeleteModal
				? (
					<DeletePayrun
						itemData={itemData}
						showDeleteModal={showDeleteModal}
						setShowDeleteModal={setShowDeleteModal}
						overseasData={overseasData}
					/>
				) : null}
		</div>
	);
}

export default DeletePayrunInvoice;
